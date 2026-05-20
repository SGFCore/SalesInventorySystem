package dev.uit.project.dto;

import dev.uit.project.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long customerId;
    private Long employeeId;
    private Long invoiceId;
    private String shipcode;
    private Long shipcompanyId;
    private BigDecimal totalamount;
    private Long orderstatus;
    private Long shippingstatus;
    private String shipmentnote;
    private Long shippingfee;
    private Long exportreceiptId;

    public static OrderDTO fromEntity(Order entity) {
        if (entity == null) return null;
        Long customerId = entity.getCustomerid() != null ? entity.getCustomerid().getId() : null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long invoiceId = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long shipcompanyId = entity.getShipcompanyid() != null ? entity.getShipcompanyid().getId() : null;
        Long exportreceiptId = entity.getExportreceiptid() != null ? entity.getExportreceiptid().getId() : null;
        return new OrderDTO(
                entity.getId(),
                customerId,
                employeeId,
                invoiceId,
                entity.getShipcode(),
                shipcompanyId,
                entity.getTotalamount(),
                entity.getOrderstatus(),
                entity.getShippingstatus(),
                entity.getShipmentnote(),
                entity.getShippingfee(),
                exportreceiptId
        );
    }
}