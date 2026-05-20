package dev.uit.project.dto;

import dev.uit.project.entity.Discount;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiscountDTO {
    private Long id;
    private Long customertypeId;
    private String discountname;
    private Long value;
    private String detail;
    private String appliedproductids;
    private Long status;
    private LocalDate expirydate;
    private LocalDate startdate;

    public static DiscountDTO fromEntity(Discount entity) {
        if (entity == null) return null;
        Long customertypeId = entity.getCustomertypeid() != null ? entity.getCustomertypeid().getId() : null;
        return new DiscountDTO(
                entity.getId(),
                customertypeId,
                entity.getDiscountname(),
                entity.getValue(),
                entity.getDetail(),
                entity.getAppliedproductids(),
                entity.getStatus(),
                entity.getExpirydate(),
                entity.getStartdate()
        );
    }

    public Discount toEntity() {
        Discount entity = new Discount();
        entity.setId(this.id);
        entity.setDiscountname(this.discountname);
        entity.setValue(this.value);
        entity.setDetail(this.detail);
        entity.setAppliedproductids(this.appliedproductids);
        entity.setStatus(this.status);
        entity.setExpirydate(this.expirydate);
        entity.setStartdate(this.startdate);
        if (this.customertypeId != null) {
            dev.uit.project.entity.Customertype ct = new dev.uit.project.entity.Customertype();
            ct.setId(this.customertypeId);
            entity.setCustomertypeid(ct);
        }
        return entity;
    }
}