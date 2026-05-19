package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Transferticket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransferticketDTO {

    @JsonProperty("TransferID")
    private Long id;

    @JsonProperty("EmployeeID")
    private Long employeeId;

    @JsonProperty("SourceWHID")
    private Long sourcewhId;

    @JsonProperty("DestWHID")
    private Long destwhId;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("CreatedDate")
    private LocalDate createddate;

    public static TransferticketDTO fromEntity(Transferticket entity) {
        if (entity == null) return null;
        Long empId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long srcId = entity.getSourcewhid() != null ? entity.getSourcewhid().getId() : null;
        Long dstId = entity.getDestwhid() != null ? entity.getDestwhid().getId() : null;

        return new TransferticketDTO(
                entity.getId(),
                empId,
                srcId,
                dstId,
                entity.getStatus(),
                entity.getCreateddate()
        );
    }
}