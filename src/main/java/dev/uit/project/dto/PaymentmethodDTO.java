package dev.uit.project.dto;

import dev.uit.project.entity.Paymentmethod;

public class PaymentmethodDTO {
    private Long id;
    private String paymentname;
    private Integer status;

    // Constructor không tham số
    public PaymentmethodDTO() {
    }

    // Constructor có tham số
    public PaymentmethodDTO(Long id, String paymentname, Integer status) {
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
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