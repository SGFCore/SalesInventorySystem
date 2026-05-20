package dev.uit.project.dto;

import dev.uit.project.entity.Combo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComboDTO {
    private Long id;
    private BigDecimal comboprice;

    public static ComboDTO fromEntity(Combo entity) {
        if (entity == null) return null;
        return new ComboDTO(
                entity.getId(),
                entity.getComboprice()
        );
    }
}