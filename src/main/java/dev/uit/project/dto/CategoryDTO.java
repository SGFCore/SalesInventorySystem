package dev.uit.project.dto;

import dev.uit.project.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String categoryname;

    public static CategoryDTO fromEntity(Category entity) {
        if (entity == null) return null;
        return new CategoryDTO(
                entity.getId(),
                entity.getCategoryname()
        );
    }
}