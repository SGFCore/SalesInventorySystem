package dev.uit.project.dto;

import java.math.BigDecimal;
import dev.uit.project.entity.Combo;


public class ComboDTO {
    private Long id;
    private BigDecimal comboprice;

    // Constructor không tham số
    public ComboDTO() {
    }

    // Constructor có tham số
    public ComboDTO(Long id, BigDecimal comboprice) {
        this.id = id;
        this.comboprice = comboprice;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getComboprice() {
        return comboprice;
    }

    public void setComboprice(BigDecimal comboprice) {
        this.comboprice = comboprice;
    }

    // Phương thức fromEntity
    public static ComboDTO fromEntity(Combo entity) {
        if (entity == null) {
            return null;
        }
        return new ComboDTO(
            entity.getId(),
            entity.getComboprice()
        );
    }
}