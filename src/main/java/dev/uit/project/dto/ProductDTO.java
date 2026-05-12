package dev.uit.project.dto;

import dev.uit.project.entity.Product;

public class ProductDTO {
    private Long id;
    private String productname;
    private String detail;
    private Long productprice;
    private Long productstatus;
    private CategoryDTO categoryid;
    private Boolean allowreturn;
    private String imageurl;

    // Constructor không tham số
    public ProductDTO() {
    }

    // Constructor có tham số
    public ProductDTO(Long id, String productname, String detail, Long productprice, Long productstatus, CategoryDTO categoryid, Boolean allowreturn, String imageurl) {
        this.id = id;
        this.productname = productname;
        this.detail = detail;
        this.productprice = productprice;
        this.productstatus = productstatus;
        this.categoryid = categoryid;
        this.allowreturn = allowreturn;
        this.imageurl = imageurl;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Long getProductprice() {
        return productprice;
    }

    public void setProductprice(Long productprice) {
        this.productprice = productprice;
    }

    public Long getProductstatus() {
        return productstatus;
    }

    public void setProductstatus(Long productstatus) {
        this.productstatus = productstatus;
    }

    public CategoryDTO getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(CategoryDTO categoryid) {
        this.categoryid = categoryid;
    }

    public Boolean getAllowreturn() {
        return allowreturn;
    }

    public void setAllowreturn(Boolean allowreturn) {
        this.allowreturn = allowreturn;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    // Phương thức fromEntity
    public static ProductDTO fromEntity(Product entity) {
        if (entity == null) {
            return null;
        }
        return new ProductDTO(
            entity.getId(),
            entity.getProductname(),
            entity.getDetail(),
            entity.getProductprice(),
            entity.getProductstatus(),
            entity.getCategoryid() != null ? CategoryDTO.fromEntity(entity.getCategoryid()) : null,
            entity.getAllowreturn(),
            entity.getImageurl()
        );
    }
}