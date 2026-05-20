package dev.uit.project.dto;

import dev.uit.project.entity.Combodetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CombodetailDTO {
    private Long comboId;
    private Long productId;
    private Long quantity;

    public static CombodetailDTO fromEntity(Combodetail entity) {
        if (entity == null) return null;
        Long comboId = entity.getComboid() != null ? entity.getComboid().getId() : null;
        Long productId = entity.getProductid() != null ? entity.getProductid().getId() : null;
        return new CombodetailDTO(
                comboId,
                productId,
                entity.getQuantity()
        );
    }
}