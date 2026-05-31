package dev.uit.project.dto;

import dev.uit.project.entity.Exportreceipt;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExportreceiptDTO {
    private Long id;
    private Long employeeId;
    private Integer exporttype;
    private String reason;
    private String status;
    private LocalDate createddate;
    private Long warehouseId;
    private java.util.List<ExportreceiptdetailDTO> details;

    public static ExportreceiptDTO fromEntity(Exportreceipt entity) {
        if (entity == null) return null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long warehouseId = entity.getWarehouseid() != null ? entity.getWarehouseid().getId() : null;
        
        java.util.List<ExportreceiptdetailDTO> detailsDTO = null;
        if (entity.getDetails() != null) {
            detailsDTO = entity.getDetails().stream()
                    .map(ExportreceiptdetailDTO::fromEntity)
                    .toList();
        }

        return new ExportreceiptDTO(
                entity.getId(),
                employeeId,
                entity.getExporttype(),
                entity.getReason(),
                entity.getStatus(),
                entity.getCreateddate(),
                warehouseId,
                detailsDTO
        );
    }

    public Exportreceipt toEntity() {
        Exportreceipt entity = new Exportreceipt();
        entity.setId(this.id);
        entity.setExporttype(this.exporttype);
        entity.setReason(this.reason);
        entity.setStatus(this.status);
        entity.setCreateddate(this.createddate);
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

        if (this.details != null) {
            java.util.List<dev.uit.project.entity.Exportreceiptdetail> entityDetails = new java.util.ArrayList<>();
            for (ExportreceiptdetailDTO dDTO : this.details) {
                dev.uit.project.entity.Exportreceiptdetail d = dDTO.toEntity();
                d.setExportreceiptid(entity); // CRITICAL: bidirectional link
                entityDetails.add(d);
            }
            entity.setDetails(entityDetails);
        }

        return entity;
    }
}