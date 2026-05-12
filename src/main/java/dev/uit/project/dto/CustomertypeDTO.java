package dev.uit.project.dto;

import java.math.BigDecimal;
import dev.uit.project.entity.Customertype;

public class CustomertypeDTO {
    private Long id;
    private String customertypename;
    private BigDecimal discount;
    private String detail;
    private Long spendinglimit;

    // Constructor không tham số
    public CustomertypeDTO() {
    }

    // Constructor có tham số
    public CustomertypeDTO(Long id, String customertypename, BigDecimal discount, String detail, Long spendinglimit) {
        this.id = id;
        this.customertypename = customertypename;
        this.discount = discount;
        this.detail = detail;
        this.spendinglimit = spendinglimit;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomertypename() {
        return customertypename;
    }

    public void setCustomertypename(String customertypename) {
        this.customertypename = customertypename;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Long getSpendinglimit() {
        return spendinglimit;
    }

    public void setSpendinglimit(Long spendinglimit) {
        this.spendinglimit = spendinglimit;
    }

    // Phương thức fromEntity
    public static CustomertypeDTO fromEntity(Customertype entity) {
        if (entity == null) {
            return null;
        }
        return new CustomertypeDTO(
            entity.getId(),
            entity.getCustomertypename(),
            entity.getDiscount(),
            entity.getDetail(),
            entity.getSpendinglimit()
        );
    }
}