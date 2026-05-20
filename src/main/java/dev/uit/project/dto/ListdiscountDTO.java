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
        entity.setAppliedvalue(this.appliedvalue);
        return entity;
    }
}