package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseDTO {

    @JsonProperty("WareHouseID")
    private Long id;

    @JsonProperty("WareHouseName")
    private String warehousename;

    @JsonProperty("ManagerID")
    private Long managerId;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("ContactNumber")
    private String contactnumber;

    @JsonProperty("Capacity")
    private Long capacity;

    @JsonProperty("Status")
    private Long status;

    @JsonProperty("WarehouseType")
    private Long warehousetype;

    public static WarehouseDTO fromEntity(Warehouse entity) {
        if (entity == null) return null;
        Long managerVal = entity.getManagerid() != null ? entity.getManagerid().getId() : null;
        return new WarehouseDTO(
                entity.getId(),
                entity.getWarehousename(),
                managerVal,
                entity.getAddress(),
                entity.getContactnumber(),
                entity.getCapacity(),
                entity.getStatus(),
                entity.getWarehousetype()
        );
    }
}