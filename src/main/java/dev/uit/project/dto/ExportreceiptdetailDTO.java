package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Exportreceiptdetail;
import dev.uit.project.entity.ExportreceiptdetailId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExportreceiptdetailDTO {

    private Long exportreceiptId;
    private Long productId;
    private Long quantity;

    public static ExportreceiptdetailDTO fromEntity(Exportreceiptdetail entity) {
        if (entity == null) return null;
        ExportreceiptdetailId id = entity.getId();
        return new ExportreceiptdetailDTO(id.getExportreceiptid(), id.getProductid(), entity.getQuantity());
    }

    public Exportreceiptdetail toEntity() {
        Exportreceiptdetail entity = new Exportreceiptdetail();
        dev.uit.project.entity.ExportreceiptdetailId cid = new dev.uit.project.entity.ExportreceiptdetailId();
        cid.setExportreceiptid(this.exportreceiptId);
        cid.setProductid(this.productId);
        entity.setId(cid);
        entity.setQuantity(this.quantity);
        
        if (this.exportreceiptId != null) {
            dev.uit.project.entity.Exportreceipt receipt = new dev.uit.project.entity.Exportreceipt();
            receipt.setId(this.exportreceiptId);
            entity.setExportreceiptid(receipt);
        }
        
        if (this.productId != null) {
            dev.uit.project.entity.Product product = new dev.uit.project.entity.Product();
            product.setId(this.productId);
            entity.setProductid(product);
        }
        
        return entity;
    }
}