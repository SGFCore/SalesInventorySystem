package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Importreceiptdetail;
import dev.uit.project.entity.ImportreceiptdetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportreceiptdetailDTO {

    @JsonProperty("ImportReceiptID")
    private Long importreceiptId;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("ProductName")
    private String productname;

    @JsonProperty("ExpectedQuantity")
    private Long expectedquantity;

    @JsonProperty("ActualQuantity")
    private Long actualquantity;

    public static ImportreceiptdetailDTO fromEntity(Importreceiptdetail entity) {
        if (entity == null) return null;
        ImportreceiptdetailId id = entity.getId();
        String prodName = entity.getProductid() != null ? entity.getProductid().getProductname() : null;
        return new ImportreceiptdetailDTO(
                id.getImportreceiptid(),
                id.getProductid(),
                prodName,
                entity.getExpectedquantity(),
                entity.getActualquantity()
        );
    }
}