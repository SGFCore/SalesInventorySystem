package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Importreceipt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportreceiptDTO {

    @JsonProperty("ImportReceiptID")
    private Long id;

    @JsonProperty("EmployeeID")
    private Long employeeId;

    @JsonProperty("WarehouseID")
    private Long warehouseId;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("CreatedDate")
    private LocalDate createddate;

    @JsonProperty("RequestID")
    private Long requestId;

    @JsonProperty("DiscrepancyReason")
    private String discrepancyreason;

    @JsonProperty("DiscrepancyImageURL")
    private String discrepancyimageurl;

    @JsonProperty("HasDiscrepancy")
    private Long hasdiscrepancy;

    public static ImportreceiptDTO fromEntity(Importreceipt entity) {
        if (entity == null) return null;
        Long empId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long whId = entity.getWarehouseid() != null ? entity.getWarehouseid().getId() : null;
        Long reqId = entity.getRequestid() != null ? entity.getRequestid().getId() : null;

        return new ImportreceiptDTO(
                entity.getId(),
                empId,
                whId,
                entity.getStatus(),
                entity.getCreateddate(),
                reqId,
                entity.getDiscrepancyreason(),
                entity.getDiscrepancyimageurl(),
                entity.getHasdiscrepancy()
        );
    }
}