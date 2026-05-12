package dev.uit.project.dto;

import dev.uit.project.entity.Paymentmethod;

public class PaymentmethodDTO {
    private Long id;
    private String paymentname;
    private Boolean status;

    // Constructor không tham số
    public PaymentmethodDTO() {
    }

    // Constructor có tham số
    public PaymentmethodDTO(Long id, String paymentname, Boolean status) {
        this.id = id;
        this.paymentname = paymentname;
        this.status = status;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPaymentname() {
        return paymentname;
    }

    public void setPaymentname(String paymentname) {
        this.paymentname = paymentname;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    // Phương thức fromEntity
    public static PaymentmethodDTO fromEntity(Paymentmethod entity) {
        if (entity == null) {
            return null;
        }
        return new PaymentmethodDTO(
                entity.getId(),
                entity.getPaymentname(),
                entity.getStatus()
        );
    }
}