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

    public static ExportreceiptDTO fromEntity(Exportreceipt entity) {
        if (entity == null) return null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long warehouseId = entity.getWarehouseid() != null ? entity.getWarehouseid().getId() : null;
        return new ExportreceiptDTO(
                entity.getId(),
                employeeId,
                entity.getExporttype(),
                entity.getReason(),
                entity.getStatus(),
                entity.getCreateddate(),
                warehouseId
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
        return entity;
    }
}