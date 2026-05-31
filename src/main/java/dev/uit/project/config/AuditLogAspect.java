package dev.uit.project.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.uit.project.dto.AuditLogDto;
import dev.uit.project.service.AuditLogWriterService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Aspect
@Component
public class AuditLogAspect {

    private final AuditLogWriterService writerService;
    private final ObjectMapper objectMapper;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final List<String> NAME_KEYS = Arrays.asList(
        "productname", "warehousename", "fullname", "name", 
        "customername", "orderid", "invoiceid", "id"
    );

    public AuditLogAspect(AuditLogWriterService writerService) {
        this.writerService = writerService;
        this.objectMapper = new ObjectMapper();
    }

    @AfterReturning(pointcut = "@annotation(auditAction)", returning = "result")
    public void logAudit(JoinPoint joinPoint, AuditAction auditAction, Object result) {
        // 1. Lấy thông tin User từ SecurityContext hoặc Request Header
        String[] userInfo = resolveUserIdentity();
        String employeeName = userInfo[0];
        String role = userInfo[1];

        // 2. Lấy thời gian hiện tại (Asia/Ho_Chi_Minh)
        String timestamp = ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")).format(FORMATTER);
        
        // 3. Trích xuất Target Name từ đối số của method
        Object[] args = joinPoint.getArgs();
        String targetName = args.length > 0 ? extractTargetName(args[0]) : "";

        AuditLogDto logDto = new AuditLogDto(
            timestamp,
            employeeName,
            role,
            auditAction.actionType(),
            auditAction.target(),
            targetName
        );

        writerService.writeLog(logDto);
    }

    private String[] resolveUserIdentity() {
        // Thử lấy từ SecurityContextHolder (Spring Security)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getName())) {
            String name = auth.getName();
            String roles = auth.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .map(r -> r.replace("ROLE_", ""))
                    .collect(Collectors.joining(", "));
            return new String[]{name, roles};
        }

        // Nếu SecurityContext trống, thử đọc từ Authorization Header (JWT)
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String authHeader = request.getHeader("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    // Giả định có class TokenUtils/JwtService để extract (do dự án yêu cầu)
                    // Nếu chưa có, bạn cần tạo class này để parse JWT
                    // return new String[]{TokenUtils.extractUsername(token), TokenUtils.extractRole(token)};
                    
                    // Tạm thời log để debug nếu lọt vào đây
                    log.debug("Found Bearer token but SecurityContext is empty.");
                }
            }
        } catch (Exception e) {
            log.error("Lỗi khi resolve user identity: {}", e.getMessage());
        }

        return new String[]{"Hệ thống", ""};
    }

    private String extractTargetName(Object obj) {
        if (obj == null) return "";
        if (obj instanceof String || obj instanceof Number) return obj.toString();

        try {
            JsonNode node = objectMapper.valueToTree(obj);
            for (String key : NAME_KEYS) {
                JsonNode valueNode = findKeyCaseInsensitive(node, key);
                if (valueNode != null && !valueNode.isNull()) {
                    return valueNode.asText();
                }
            }
        } catch (Exception e) {
            log.error("Lỗi extract target name: {}", e.getMessage());
        }
        return "";
    }

    private JsonNode findKeyCaseInsensitive(JsonNode node, String targetKey) {
        if (node.has(targetKey)) return node.get(targetKey);
        
        java.util.Iterator<String> fieldNames = node.fieldNames();
        while (fieldNames.hasNext()) {
            String fieldName = fieldNames.next();
            if (fieldName.equalsIgnoreCase(targetKey)) {
                return node.get(fieldName);
            }
        }
        return null;
    }
}
