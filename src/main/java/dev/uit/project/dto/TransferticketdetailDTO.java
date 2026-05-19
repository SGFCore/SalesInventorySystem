package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Transferticketdetail;
import dev.uit.project.entity.TransferticketdetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferticketdetailDTO {

    @JsonProperty("TransferID")
    private Long transferId;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("ExportQuantity")
    private Long exportquantity;

    @JsonProperty("ReceiveQuantity")
    private Long receivequantity;

    @JsonProperty("RequestQuantity")
    private Long requestquantity;

    public static TransferticketdetailDTO fromEntity(Transferticketdetail entity) {
        if (entity == null) return null;
        TransferticketdetailId id = entity.getId();
        return new TransferticketdetailDTO(
                id.getTransferid(),
                id.getProductid(),
                entity.getExportquantity(),
                entity.getReceivequantity(),
                entity.getRequestquantity()
        );
    }
}