package dev.uit.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogDTO {
    private Long id;
    private LocalDateTime timestamp;
    private String tableName;
    private String employeeName;
    private String action;
    private String oldValue;
    private String newValue;
    private Long affectedId;
}
