package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Invoicedetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoicedetailDTO {

    @JsonProperty("InvoiceDetailID")
    private Long id;

    @JsonProperty("InvoiceID")
    private Long invoiceid;

    @JsonProperty("ProductID")
    private Long productid;

    @JsonProperty("ComboID")
    private Long comboid;

    @JsonProperty("Quantity")
    private Long quantity;

    @JsonProperty("UnitPrice")
    private BigDecimal unitprice;

    @JsonProperty("DiscountAmount")
    private BigDecimal discountamount;

    @JsonProperty("TotalAmount")
    private BigDecimal totalamount;

    public static InvoicedetailDTO fromEntity(Invoicedetail entity) {
        if (entity == null) return null;
        Long invoiceVal = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long productVal = entity.getProductid() != null ? entity.getProductid().getId() : null;
        Long comboVal = entity.getComboid() != null ? entity.getComboid().getId() : null;
        return new InvoicedetailDTO(
                entity.getId(),
                invoiceVal,
                productVal,
                comboVal,
                entity.getQuantity(),
                entity.getUnitprice(),
                entity.getDiscountamount(),
                entity.getTotalamount()
        );
    }
}