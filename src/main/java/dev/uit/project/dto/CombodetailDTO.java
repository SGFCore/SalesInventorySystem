package dev.uit.project.dto;

import dev.uit.project.entity.Combodetail;

public class CombodetailDTO {
    private Long comboId;
    private Long productId;
    private Long quantity;

    public CombodetailDTO() {
    }

    public CombodetailDTO(Long comboId, Long productId, Long quantity) {
        this.comboId = comboId;
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getComboId() {
        return comboId;
    }

    public void setComboId(Long comboId) {
        this.comboId = comboId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public static CombodetailDTO fromEntity(Combodetail entity) {
        if (entity == null) {
            return null;
        }
        Long comboId = (entity.getId() != null) ? entity.getId().getComboid() : null;
        Long productId = (entity.getId() != null) ? entity.getId().getProductid() : null;
        return new CombodetailDTO(comboId, productId, entity.getQuantity());
    }
}