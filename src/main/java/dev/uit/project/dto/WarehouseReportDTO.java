package dev.uit.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseReportDTO {
    private LocalDate month;
    private Long totalImported;
    private Long totalExported;
    private List<WarehouseReportLineDTO> details;
}
