package dev.uit.project.dto;

import dev.uit.project.entity.Producttype;

public class ProducttypeDTO {
    private Long id;
    private String producttypename;
    private Long categoryid;

    // Constructor không tham số
    public ProducttypeDTO() {
    }

    // Constructor có tham số
    public ProducttypeDTO(Long id, String producttypename, Long categoryid) {
        this.id = id;
        this.producttypename = producttypename;
        this.categoryid = categoryid;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProducttypename() {
        return producttypename;
    }

    public void setProducttypename(String producttypename) {
        this.producttypename = producttypename;
    }

    public Long getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Long categoryid) {
        this.categoryid = categoryid;
    }

    // Phương thức fromEntity
    public static ProducttypeDTO fromEntity(Producttype entity) {
        if (entity == null) {
            return null;
        }
        return new ProducttypeDTO(
            entity.getId(),
            entity.getProducttypename(),
            entity.getCategoryid()
        );
    }
}