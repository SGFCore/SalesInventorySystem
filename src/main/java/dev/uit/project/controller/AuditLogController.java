package dev.uit.project.controller;

import dev.uit.project.dto.AuditLogDto;
import dev.uit.project.service.AuditLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/history")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @GetMapping
    public List<AuditLogDto> getHistory(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String employeeName,
            @RequestParam(required = false) String targetType,
            @RequestParam(required = false) String targetName) {
        
        return auditLogService.getAuditLogs(startDate, endDate, employeeName, targetType, targetName);
    }
}
