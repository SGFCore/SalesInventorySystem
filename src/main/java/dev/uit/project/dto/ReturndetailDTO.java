package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Returndetail;
import dev.uit.project.entity.ReturndetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturndetailDTO {

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

    public static ReturndetailDTO fromEntity(Returndetail entity) {
        if (entity == null) return null;
        ReturndetailId id = entity.getId();
        Long targetId = entity.getTargetwarehouseid() != null ? entity.getTargetwarehouseid().getId() : null;
        return new ReturndetailDTO(
                id.getReturnid(),
                id.getProductid(),
                entity.getQuantity(),
                entity.getQcStatus(),
                targetId,
                entity.getActiontaken()
        );
    }
}