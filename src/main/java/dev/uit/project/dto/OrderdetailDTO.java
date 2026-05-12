package dev.uit.project.dto;

import dev.uit.project.entity.Orderdetail;
import java.math.BigDecimal;

public class OrderdetailDTO {
    private Long id;
    private Long orderid;
    private Long productid;
    private Long comboid;
    private Long quantity;
    private BigDecimal unitprice;
    private BigDecimal discountamount;
    private BigDecimal totalamount;

    // constructor khong tham so
    public OrderdetailDTO() {
    }

    // constructor day dy tham so
    public OrderdetailDTO(Long id, Long orderid, Long productid, Long comboid,
                          Long quantity, BigDecimal unitprice, BigDecimal discountamount,
                          BigDecimal totalamount) {
        this.id = id;
        this.orderid = orderid;
        this.productid = productid;
        this.comboid = comboid;
        this.quantity = quantity;
        this.unitprice = unitprice;
        this.discountamount = discountamount;
        this.totalamount = totalamount;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
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

    // Static fromEntity method
    public static OrderdetailDTO fromEntity(Orderdetail entity) {
        if (entity == null) {
            return null;
        }
        Long orderId = entity.getOrderid() != null ? entity.getOrderid().getId() : null;
        Long productId = entity.getProductid() != null ? entity.getProductid().getId() : null;
        Long comboId = entity.getComboid() != null ? entity.getComboid().getId() : null;
        return new OrderdetailDTO(
                entity.getId(),
                orderId,
                productId,
                comboId,
                entity.getQuantity(),
                entity.getUnitprice(),
                entity.getDiscountamount(),
                entity.getTotalamount()
        );
    }
}