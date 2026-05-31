package dev.uit.project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.uit.project.dto.AuditLogDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
public class AuditLogService {

    private static final String LOG_PATH = "/app/logs/audit.log";
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<AuditLogDto> getAuditLogs(
            String startDate, String endDate, 
            String employeeName, String targetType, String targetName) {
        
        Path path = Paths.get(LOG_PATH);
        if (!Files.exists(path)) return Collections.emptyList();

        try (Stream<String> lines = Files.lines(path)) {
            List<AuditLogDto> logs = lines
                .filter(line -> line != null && !line.trim().isEmpty())
                .map(this::parseJson)
                .filter(log -> log != null)
                .filter(l -> isBetween(l.timestamp(), startDate, endDate))
                .filter(l -> employeeName == null || employeeName.isEmpty() || 
                             l.employeeName().toLowerCase().contains(employeeName.toLowerCase()))
                .filter(l -> targetType == null || targetType.equals("ALL") || 
                             l.targetType().equals(targetType))
                .filter(l -> targetName == null || targetName.isEmpty() || 
                             l.targetName().toLowerCase().contains(targetName.toLowerCase()))
                .toList();
            
            log.info("UC70: Đã tìm thấy {} kết quả lịch sử", logs.size());
            return logs;
        } catch (IOException e) {
            return Collections.emptyList();
        }
    }

    private boolean isBetween(String timestamp, String start, String end) {
        // timestamp format: yyyy-MM-dd HH:mm:ss
        String dateOnly = timestamp.substring(0, 10);
        if (start != null && !start.isEmpty() && dateOnly.compareTo(start) < 0) return false;
        if (end != null && !end.isEmpty() && dateOnly.compareTo(end) > 0) return false;
        return true;
    }

    private AuditLogDto parseJson(String json) {
        try {
            return objectMapper.readValue(json.trim(), AuditLogDto.class);
        } catch (Exception e) {
            return null;
        }
    }
}
