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

    public Importreceipt toEntity() {
        Importreceipt entity = new Importreceipt();
        entity.setId(this.id);
        entity.setStatus(this.status);
        entity.setCreateddate(this.createddate);
        entity.setDiscrepancyreason(this.discrepancyreason);
        entity.setDiscrepancyimageurl(this.discrepancyimageurl);
        entity.setHasdiscrepancy(this.hasdiscrepancy);
        if (this.employeeId != null) {
            dev.uit.project.entity.Employee emp = new dev.uit.project.entity.Employee();
            emp.setId(this.employeeId);
            entity.setEmployeeid(emp);
        }
        if (this.warehouseId != null) {
            dev.uit.project.entity.Warehouse wh = new dev.uit.project.entity.Warehouse();
            wh.setId(this.warehouseId);
            entity.setWarehouseid(wh);
        }
        if (this.requestId != null) {
            dev.uit.project.entity.Requestform rf = new dev.uit.project.entity.Requestform();
            rf.setId(this.requestId);
            entity.setRequestid(rf);
        }
        return entity;
    }
}