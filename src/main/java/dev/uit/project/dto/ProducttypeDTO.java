package dev.uit.project.dto;

import dev.uit.project.entity.Producttype;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProducttypeDTO {
    private Long id;
    private String producttypename;
    private Long categoryid;

    public static ProducttypeDTO fromEntity(Producttype entity) {
        if (entity == null) return null;
        return new ProducttypeDTO(
                entity.getId(),
                entity.getProducttypename(),
                entity.getCategoryid()
        );
    }
}