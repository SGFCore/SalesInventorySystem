package dev.uit.project.dto;

import dev.uit.project.entity.Customertype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomertypeDTO {
    private Long id;
    private String customertypename;
    private BigDecimal discount;
    private String detail;
    private Long spendinglimit;

    public static CustomertypeDTO fromEntity(Customertype entity) {
        if (entity == null) return null;
        return new CustomertypeDTO(
                entity.getId(),
                entity.getCustomertypename(),
                entity.getDiscount(),
                entity.getDetail(),
                entity.getSpendinglimit()
        );
    }
}