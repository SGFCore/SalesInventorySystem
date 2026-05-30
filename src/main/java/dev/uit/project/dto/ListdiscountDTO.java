package dev.uit.project.dto;

import dev.uit.project.entity.Listdiscount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListdiscountDTO {
    private Long orderId;
    private Long discountId;
    private Long appliedvalue;

    public static ListdiscountDTO fromEntity(Listdiscount entity) {
        if (entity == null) return null;
        Long orderId = entity.getOrderid() != null ? entity.getOrderid().getId() : null;
        Long discountId = entity.getDiscountid() != null ? entity.getDiscountid().getId() : null;
        return new ListdiscountDTO(
                orderId,
                discountId,
                entity.getAppliedvalue()
        );
    }

    public Listdiscount toEntity() {
        Listdiscount entity = new Listdiscount();
        dev.uit.project.entity.ListdiscountId cid = new dev.uit.project.entity.ListdiscountId();
        cid.setOrderid(this.orderId);
        cid.setDiscountid(this.discountId);
        entity.setId(cid);

        // Populate associations because of @MapsId
        if (this.orderId != null) {
            dev.uit.project.entity.Order o = new dev.uit.project.entity.Order();
            o.setId(this.orderId);
            entity.setOrderid(o);
        }
        if (this.discountId != null) {
            dev.uit.project.entity.Discount d = new dev.uit.project.entity.Discount();
            d.setId(this.discountId);
            entity.setDiscountid(d);
        }

        entity.setAppliedvalue(this.appliedvalue);
        return entity;
    }
}