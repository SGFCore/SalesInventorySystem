package dev.uit.project.dto;

import dev.uit.project.entity.Order;
import java.math.BigDecimal;

public class OrderDTO {
    private Long id;
    private Long customerId;
    private Long employeeId;
    private Long invoiceId;
    private String shipcode;
    private Long shipCompanyId;
    private BigDecimal totalamount;
    private Long orderstatus;
    private Long shippingstatus;
    private String shipmentnote;
    private Long shippingfee;
    private Long exportticketid;

    // Constructor không tham số
    public OrderDTO() {
    }

    // Constructor đầy đủ tham số
    public OrderDTO(Long id, Long customerId, Long employeeId, Long invoiceId,
                    String shipcode, Long shipCompanyId, BigDecimal totalamount,
                    Long orderstatus, Long shippingstatus, String shipmentnote,
                    Long shippingfee, Long exportticketid) {
        this.id = id;
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.invoiceId = invoiceId;
        this.shipcode = shipcode;
        this.shipCompanyId = shipCompanyId;
        this.totalamount = totalamount;
        this.orderstatus = orderstatus;
        this.shippingstatus = shippingstatus;
        this.shipmentnote = shipmentnote;
        this.shippingfee = shippingfee;
        this.exportticketid = exportticketid;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public String getShipcode() {
        return shipcode;
    }

    public void setShipcode(String shipcode) {
        this.shipcode = shipcode;
    }

    public Long getShipCompanyId() {
        return shipCompanyId;
    }

    public void setShipCompanyId(Long shipCompanyId) {
        this.shipCompanyId = shipCompanyId;
    }

    public BigDecimal getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(BigDecimal totalamount) {
        this.totalamount = totalamount;
    }

    public Long getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(Long orderstatus) {
        this.orderstatus = orderstatus;
    }

    public Long getShippingstatus() {
        return shippingstatus;
    }

    public void setShippingstatus(Long shippingstatus) {
        this.shippingstatus = shippingstatus;
    }

    public String getShipmentnote() {
        return shipmentnote;
    }

    public void setShipmentnote(String shipmentnote) {
        this.shipmentnote = shipmentnote;
    }

    public Long getShippingfee() {
        return shippingfee;
    }

    public void setShippingfee(Long shippingfee) {
        this.shippingfee = shippingfee;
    }

    public Long getExportticketid() {
        return exportticketid;
    }

    public void setExportticketid(Long exportticketid) {
        this.exportticketid = exportticketid;
    }

    // Phương thức fromEntity
    public static OrderDTO fromEntity(Order entity) {
        if (entity == null) {
            return null;
        }
        Long customerId = entity.getCustomerid() != null ? entity.getCustomerid().getId() : null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long invoiceId = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long shipCompanyId = entity.getShipcompanyid() != null ? entity.getShipcompanyid().getId() : null;
        return new OrderDTO(
                entity.getId(),
                customerId,
                employeeId,
                invoiceId,
                entity.getShipcode(),
                shipCompanyId,
                entity.getTotalamount(),
                entity.getOrderstatus(),
                entity.getShippingstatus(),
                entity.getShipmentnote(),
                entity.getShippingfee(),
                entity.getExportticketid()
        );
    }
}