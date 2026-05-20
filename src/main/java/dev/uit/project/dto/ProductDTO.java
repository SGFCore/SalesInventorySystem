package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    @JsonProperty("ProductID")
    private Long id;

    @JsonProperty("ProductName")
    private String productname;

    @JsonProperty("Detail")
    private String detail;

    @JsonProperty("ProductPrice")
    private Long productprice;

    @JsonProperty("ProductStatus")
    private Long productstatus;

    @JsonProperty("CategoryID")
    private Long categoryId;

    @JsonProperty("AllowReturn")
    private Integer allowreturn;

    @JsonProperty("ImageURL")
    private String imageurl;

    @JsonProperty("ProductTypeID")
    private Long producttypeId;

    public static ProductDTO fromEntity(Product entity) {
        if (entity == null) return null;
        Long categoryId = entity.getCategoryid() != null ? entity.getCategoryid().getId() : null;
        Long producttypeId = entity.getProducttypeid() != null ? entity.getProducttypeid().getId() : null;
        return new ProductDTO(
                entity.getId(),
                entity.getProductname(),
                entity.getDetail(),
                entity.getProductprice(),
                entity.getProductstatus(),
                categoryId,
                entity.getAllowreturn(),
                entity.getImageurl(),
                producttypeId
        );
    }
}