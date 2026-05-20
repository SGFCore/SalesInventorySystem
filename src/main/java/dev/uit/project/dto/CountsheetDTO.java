package dev.uit.project.dto;

import dev.uit.project.entity.Countsheet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountsheetDTO {
    private Long id;
    private LocalDate createddate;
    private Long status;

    public static CountsheetDTO fromEntity(Countsheet entity) {
        if (entity == null) return null;
        return new CountsheetDTO(
                entity.getId(),
                entity.getCreateddate(),
                entity.getStatus()
        );
    }

    public Countsheet toEntity() {
        Countsheet entity = new Countsheet();
        entity.setId(this.id);
        entity.setCreateddate(this.createddate);
        entity.setStatus(this.status);
        return entity;
    }
}