package dev.uit.project.dto;

import dev.uit.project.entity.Invoicedetail;
import java.math.BigDecimal;

public class InvoicedetailDTO {
    private Long id;
    private Long invoiceid;
    private Long productid;
    private Long comboid;
    private Long quantity;
    private BigDecimal unitprice;
    private BigDecimal discountamount;
    private BigDecimal totalamount;

    // Constructor không tham số
    public InvoicedetailDTO() {
    }

    // Constructor đầy đủ tham số
    public InvoicedetailDTO(Long id, Long invoiceid, Long productid, Long comboid,
                            Long quantity, BigDecimal unitprice, BigDecimal discountamount,
                            BigDecimal totalamount) {
        this.id = id;
        this.invoiceid = invoiceid;
        this.productid = productid;
        this.comboid = comboid;
        this.quantity = quantity;
        this.unitprice = unitprice;
        this.discountamount = discountamount;
        this.totalamount = totalamount;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInvoiceid() {
        return invoiceid;
    }

    public void setInvoiceid(Long invoiceid) {
        this.invoiceid = invoiceid;
    }

    public Long getProductid() {
        return productid;
    }

    public void setProductid(Long productid) {
        this.productid = productid;
    }

    public Long getComboid() {
        return comboid;
    }

    public void setComboid(Long comboid) {
        this.comboid = comboid;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(BigDecimal unitprice) {
        this.unitprice = unitprice;
    }

    public BigDecimal getDiscountamount() {
        return discountamount;
    }

    public void setDiscountamount(BigDecimal discountamount) {
        this.discountamount = discountamount;
    }

    public BigDecimal getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(BigDecimal totalamount) {
        this.totalamount = totalamount;
    }

    // Phương thức fromEntity
    public static InvoicedetailDTO fromEntity(Invoicedetail entity) {
        if (entity == null) {
            return null;
        }
        Long invoiceId = entity.getInvoiceid() != null ? entity.getInvoiceid().getId() : null;
        Long productId = entity.getProductid() != null ? entity.getProductid().getId() : null;
        Long comboId = entity.getComboid() != null ? entity.getComboid().getId() : null;
        return new InvoicedetailDTO(
                entity.getId(),
                invoiceId,
                productId,
                comboId,
                entity.getQuantity(),
                entity.getUnitprice(),
                entity.getDiscountamount(),
                entity.getTotalamount()
        );
    }
}