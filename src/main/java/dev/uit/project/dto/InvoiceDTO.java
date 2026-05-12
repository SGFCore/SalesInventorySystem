package dev.uit.project.dto;

import dev.uit.project.entity.Invoice;
import java.math.BigDecimal;
import java.time.LocalDate;

public class InvoiceDTO {
    private Long id;
    private Long customerid;
    private Long employeeid;
    private Long salechannelcode;
    private BigDecimal totalamount;
    private BigDecimal taxamount;
    private BigDecimal finalamount;
    private String status;
    private LocalDate invoicedate;

    // Constructor không tham số
    public InvoiceDTO() {
    }

    // Constructor đầy đủ tham số
    public InvoiceDTO(Long id, Long customerid, Long employeeid, Long salechannelcode,
                      BigDecimal totalamount, BigDecimal taxamount, BigDecimal finalamount,
                      String status, LocalDate invoicedate) {
        this.id = id;
        this.customerid = customerid;
        this.employeeid = employeeid;
        this.salechannelcode = salechannelcode;
        this.totalamount = totalamount;
        this.taxamount = taxamount;
        this.finalamount = finalamount;
        this.status = status;
        this.invoicedate = invoicedate;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerid() {
        return customerid;
    }

    public void setCustomerid(Long customerid) {
        this.customerid = customerid;
    }

    public Long getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Long employeeid) {
        this.employeeid = employeeid;
    }

    public Long getSalechannelcode() {
        return salechannelcode;
    }

    public void setSalechannelcode(Long salechannelcode) {
        this.salechannelcode = salechannelcode;
    }

    public BigDecimal getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(BigDecimal totalamount) {
        this.totalamount = totalamount;
    }

    public BigDecimal getTaxamount() {
        return taxamount;
    }

    public void setTaxamount(BigDecimal taxamount) {
        this.taxamount = taxamount;
    }

    public BigDecimal getFinalamount() {
        return finalamount;
    }

    public void setFinalamount(BigDecimal finalamount) {
        this.finalamount = finalamount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getInvoicedate() {
        return invoicedate;
    }

    public void setInvoicedate(LocalDate invoicedate) {
        this.invoicedate = invoicedate;
    }

    // Phương thức fromEntity
    public static InvoiceDTO fromEntity(Invoice entity) {
        if (entity == null) {
            return null;
        }
        Long customerIdVal = entity.getCustomerid() != null ? entity.getCustomerid().getId() : null;
        Long employeeIdVal = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        return new InvoiceDTO(
                entity.getId(),
                customerIdVal,
                employeeIdVal,
                entity.getSalechannelcode(),
                entity.getTotalamount(),
                entity.getTaxamount(),
                entity.getFinalamount(),
                entity.getStatus(),
                entity.getInvoicedate()
        );
    }
}