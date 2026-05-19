package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Orderdetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {

    @JsonProperty("OrderDetailID")
    private Long id;

    @JsonProperty("OrderID")
    private Long orderid;

    @JsonProperty("ProductID")
    private Long productid;

    @JsonProperty("ComboID")
    private Long comboid;

    @JsonProperty("Quantity")
    private Long quantity;

    @JsonProperty("UnitPrice")
    private BigDecimal unitprice;

    @JsonProperty("DiscountAmount")
    private BigDecimal discountamount;

    @JsonProperty("TotalAmount")
    private BigDecimal totalamount;

    public static OrderDetailDTO fromEntity(Orderdetail entity) {
        if (entity == null) return null;
        Long orderIdVal = entity.getOrderid() != null ? entity.getOrderid().getId() : null;
        Long productIdVal = entity.getProductid() != null ? entity.getProductid().getId() : null;
        Long comboIdVal = entity.getComboid() != null ? entity.getComboid().getId() : null;
        return new OrderDetailDTO(
                entity.getId(),
                orderIdVal,
                productIdVal,
                comboIdVal,
                entity.getQuantity(),
                entity.getUnitprice(),
                entity.getDiscountamount(),
                entity.getTotalamount()
        );
    }
}