package dev.uit.project.dto;

import dev.uit.project.entity.Orderreturn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderReturnDTO {
    private Long id;
    private Long orderId;
    private Long employeeId;
    private LocalDate returndate;
    private String reason;
    private BigDecimal totalrefund;
    private String returnrefcode;
    private String status;

    public static OrderReturnDTO fromEntity(Orderreturn entity) {
        if (entity == null) return null;
        Long orderId = entity.getOrderid() != null ? entity.getOrderid().getId() : null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        return new OrderReturnDTO(
                entity.getId(),
                orderId,
                employeeId,
                entity.getReturndate(),
                entity.getReason(),
                entity.getTotalrefund(),
                entity.getReturnrefcode(),
                entity.getStatus()
        );
    }

    public Orderreturn toEntity() {
        Orderreturn entity = new Orderreturn();
        entity.setId(this.id);
        entity.setReturndate(this.returndate);
        entity.setReason(this.reason);
        entity.setTotalrefund(this.totalrefund);
        entity.setReturnrefcode(this.returnrefcode);
        entity.setStatus(this.status);
        if (this.orderId != null) {
            dev.uit.project.entity.Order order = new dev.uit.project.entity.Order();
            order.setId(this.orderId);
            entity.setOrderid(order);
        }
        if (this.employeeId != null) {
            dev.uit.project.entity.Employee employee = new dev.uit.project.entity.Employee();
            employee.setId(this.employeeId);
            entity.setEmployeeid(employee);
        }
        return entity;
    }
}