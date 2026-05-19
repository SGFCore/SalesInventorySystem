package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Detailinventory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailinventoryDTO {

    @JsonProperty("WarehouseID")
    private Long warehouseId;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("CurrentQuantity")
    private Long currentquantity;

    @JsonProperty("RealStock")
    private Long realstock;

    @JsonProperty("AvailableStock")
    private Long availablestock;

    @JsonProperty("MinStock")
    private Long minstock;

    @JsonProperty("MaxStock")
    private Long maxstock;

    @JsonProperty("IsAlertEnabled")
    private Integer isalertenabled;

    @JsonProperty("StorageLocation")
    private String storagelocation;

    public static DetailinventoryDTO fromEntity(Detailinventory entity) {
        if (entity == null) return null;
        Long whId = entity.getWarehouseid() != null ? entity.getWarehouseid().getId() : null;
        Long prodId = entity.getProductid() != null ? entity.getProductid().getId() : null;
        return new DetailinventoryDTO(
                whId,
                prodId,
                entity.getCurrentquantity(),
                entity.getRealstock(),
                entity.getAvailablestock(),
                entity.getMinstock(),
                entity.getMaxstock(),
                entity.getIsAlertEnabled(),
                entity.getStoragelocation()
        );
    }
}