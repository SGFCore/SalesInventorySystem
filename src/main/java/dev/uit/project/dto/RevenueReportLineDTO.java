package dev.uit.project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RevenueReportLineDTO {
    private String productName;
    private Long quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalAmount;
    private String channel; // "Direct" or "Online"
    private LocalDate date;
}
