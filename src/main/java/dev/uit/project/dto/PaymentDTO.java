package dev.uit.project.dto;

import dev.uit.project.entity.Payment;
import java.math.BigDecimal;
import java.time.Instant;

public class PaymentDTO {
    private Long id;
    private Long invoiceId;
    private Long paymentMethodId;
    private BigDecimal amountPaid;
    private String referenceCode;
    private Instant paymentDate;

    // Constructor không tham số
    public PaymentDTO() {
    }

    // Constructor đầy đủ tham số
    public PaymentDTO(Long id, Long invoiceId, Long paymentMethodId, BigDecimal amountPaid,
                      String referenceCode, Instant paymentDate) {
        this.id = id;
        this.invoiceId = invoiceId;
        this.paymentMethodId = paymentMethodId;
        this.amountPaid = amountPaid;
        this.referenceCode = referenceCode;
        this.paymentDate = paymentDate;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(Long paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public Instant getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Instant paymentDate) {
        this.paymentDate = paymentDate;
    }

    // Phương thức fromEntity
    public static PaymentDTO fromEntity(Payment entity) {
        if (entity == null) {
            return null;
        }
        Long invoiceId = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long paymentMethodId = entity.getPaymentmethodid() != null ? entity.getPaymentmethodid().getId() : null;
        return new PaymentDTO(
                entity.getId(),
                invoiceId,
                paymentMethodId,
                entity.getAmountpaid(),
                entity.getReferencecode(),
                entity.getPaymentdate()
        );
    }
}