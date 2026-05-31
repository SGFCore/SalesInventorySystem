package dev.uit.project.dto;

public record AuditLogDto(
    String timestamp,
    String employeeName,
    String role,
    String actionType,
    String targetType,
    String targetName
) {}
