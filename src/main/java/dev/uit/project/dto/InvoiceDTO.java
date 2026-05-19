package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {

    @JsonProperty("InvoiceID")
    private Long id;

    @JsonProperty("CustomerID")
    private Long customerid;

    @JsonProperty("EmployeeID")
    private Long employeeid;

    @JsonProperty("SaleChannelCode")
    private Long salechannelcode;

    @JsonProperty("TotalAmount")
    private BigDecimal totalamount;

    @JsonProperty("TaxAmount")
    private BigDecimal taxamount;

    @JsonProperty("FinalAmount")
    private BigDecimal finalamount;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("InvoiceDate")
    private LocalDate invoicedate;

    public static InvoiceDTO fromEntity(Invoice entity) {
        if (entity == null) return null;
        Long customerVal = entity.getCustomerid() != null ? entity.getCustomerid().getId() : null;
        Long employeeVal = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        return new InvoiceDTO(
                entity.getId(),
                customerVal,
                employeeVal,
                entity.getSalechannelcode(),
                entity.getTotalamount(),
                entity.getTaxamount(),
                entity.getFinalamount(),
                entity.getStatus(),
                entity.getInvoicedate()
        );
    }
}