package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    @JsonProperty("PaymentID")
    private Long id;

    @JsonProperty("InvoiceID")
    private Long invoiceId;

    @JsonProperty("PaymentMethodID")
    private Long paymentMethodId;

    @JsonProperty("AmountPaid")
    private BigDecimal amountPaid;

    @JsonProperty("ReferenceCode")
    private String referenceCode;

    @JsonProperty("PaymentDate")
    private Instant paymentDate;

    public static PaymentDTO fromEntity(Payment entity) {
        if (entity == null) return null;
        Long invoiceVal = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long paymentMethodVal = entity.getPaymentmethodid() != null ? entity.getPaymentmethodid().getId() : null;
        return new PaymentDTO(
                entity.getId(),
                invoiceVal,
                paymentMethodVal,
                entity.getAmountpaid(),
                entity.getReferencecode(),
                entity.getPaymentdate()
        );
    }
}