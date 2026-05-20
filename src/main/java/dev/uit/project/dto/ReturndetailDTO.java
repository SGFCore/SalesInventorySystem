package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.ReturnDetail;
import dev.uit.project.entity.ReturnDetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnDetailDTO {

    @JsonProperty("ReturnID")
    private Long returnId;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("Quantity")
    private Long quantity;

    @JsonProperty("QC_Status")
    private String qcStatus;

    @JsonProperty("TargetWarehouseID")
    private Long targetWarehouseId;

    @JsonProperty("ActionTaken")
    private String actiontaken;

    public static ReturnDetailDTO fromEntity(ReturnDetail entity) {
        if (entity == null) return null;
        ReturnDetailId id = entity.getId();
        Long targetId = entity.getTargetwarehouseid() != null ? entity.getTargetwarehouseid().getId() : null;
        return new ReturnDetailDTO(
                id.getReturnid(),
                id.getProductid(),
                entity.getQuantity(),
                entity.getQcStatus(),
                targetId,
                entity.getActiontaken()
        );
    }
}