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
public class WarehouseReportLineDTO {
    private String productName;
    private Long quantity;
    private LocalDateTime timestamp;
    private String type; // "IMPORT" or "EXPORT"
}
