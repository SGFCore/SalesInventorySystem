package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Shipcompany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShipcompanyDTO {

    @JsonProperty("ShipCompanyID")
    private Long id;

    @JsonProperty("ShipCompanyName")
    private String shipcompanyname;

    @JsonProperty("SupportedRegion")
    private String supportedregion;

    @JsonProperty("Phone")
    private String phone;

    @JsonProperty("Email")
    private String email;

    @JsonProperty("Address")
    private String address;

    @JsonProperty("Notes")
    private String notes;

    @JsonProperty("Status")
    private Integer status;

    public static ShipcompanyDTO fromEntity(Shipcompany entity) {
        if (entity == null) return null;
        return new ShipcompanyDTO(
                entity.getId(),
                entity.getShipcompanyname(),
                entity.getSupportedregion(),
                entity.getPhone(),
                entity.getEmail(),
                entity.getAddress(),
                entity.getNotes(),
                entity.getStatus()
        );
    }
}