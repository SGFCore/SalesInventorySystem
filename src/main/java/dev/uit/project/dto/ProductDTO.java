package dev.uit.project.dto;

import dev.uit.project.entity.Product;

public class ProductDTO {
    private Long id;
    private String productname;
    private String detail;
    private Long productprice;
    private Long productstatus;
    private CategoryDTO categoryid;
    private Integer allowreturn;
    private String imageurl;
    private ProducttypeDTO producttypeid; 

    // Constructor không tham số
    public ProductDTO() {
    }

    // Constructor đầy đủ tham số (đã bao gồm producttypeid)
    public ProductDTO(Long id, String productname, String detail, Long productprice,
                      Long productstatus, CategoryDTO categoryid, Integer allowreturn,
                      String imageurl, ProducttypeDTO producttypeid) {
        this.id = id;
        this.productname = productname;
        this.detail = detail;
        this.productprice = productprice;
        this.productstatus = productstatus;
        this.categoryid = categoryid;
        this.allowreturn = allowreturn;
        this.imageurl = imageurl;
        this.producttypeid = producttypeid;
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

    public Integer getAllowreturn() {
        return allowreturn;
    }

    public void setAllowreturn(Integer allowreturn) {
        this.allowreturn = allowreturn;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    public ProducttypeDTO getProducttypeid() {
        return producttypeid;
    }

    public void setProducttypeid(ProducttypeDTO producttypeid) {
        this.producttypeid = producttypeid;
    }

    // Phương thức fromEntity 
    public static ProductDTO fromEntity(Product entity) {
        if (entity == null) {
            return null;
        }
        CategoryDTO categoryDTO = entity.getCategoryid() != null 
                ? CategoryDTO.fromEntity(entity.getCategoryid()) : null;
        ProducttypeDTO producttypeDTO = entity.getProducttypeid() != null 
                ? ProducttypeDTO.fromEntity(entity.getProducttypeid()) : null;
        return new ProductDTO(
                entity.getId(),
                entity.getProductname(),
                entity.getDetail(),
                entity.getProductprice(),
                entity.getProductstatus(),
                categoryDTO,
                entity.getAllowreturn(),
                entity.getImageurl(),
                producttypeDTO
        );
    }
}