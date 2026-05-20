package dev.uit.project.dto;

import dev.uit.project.entity.Countsheetdetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountsheetdetailDTO {
    private Long countsheetId;
    private Long warehouseId;
    private Long productId;
    private Long quantity;
    private String note;

    public static CountsheetdetailDTO fromEntity(Countsheetdetail entity) {
        if (entity == null) return null;
        Long countsheetId = entity.getCountsheetid() != null ? entity.getCountsheetid().getId() : null;
        Long warehouseId = entity.getWarehouseid() != null ? entity.getWarehouseid().getId() : null;
        Long productId = entity.getProductid() != null ? entity.getProductid().getId() : null;
        return new CountsheetdetailDTO(
                countsheetId,
                warehouseId,
                productId,
                entity.getQuantity(),
                entity.getNote()
        );
    }

    public Countsheetdetail toEntity() {
        Countsheetdetail entity = new Countsheetdetail();
        dev.uit.project.entity.CountsheetdetailId cid = new dev.uit.project.entity.CountsheetdetailId();
        cid.setCountsheetid(this.countsheetId);
        cid.setWarehouseid(this.warehouseId);
        cid.setProductid(this.productId);
        entity.setId(cid);
        entity.setQuantity(this.quantity);
        entity.setNote(this.note);
        return entity;
    }
}