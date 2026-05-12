package dev.uit.project.dto;

import dev.uit.project.entity.Category;

public class CategoryDTO {
    private Long id;
    private String categoryname;

    // Constructor không tham số
    public CategoryDTO() {
    }

    // Constructor có tham số
    public CategoryDTO(Long id, String categoryname) {
        this.id = id;
        this.categoryname = categoryname;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryname() {
        return categoryname;
    }

    public void setCategoryname(String categoryname) {
        this.categoryname = categoryname;
    }

    // Phương thức fromEntity
    public static CategoryDTO fromEntity(Category entity) {
        if (entity == null) {
            return null;
        }
        return new CategoryDTO(
            entity.getId(),
            entity.getCategoryname()
        );
    }
}