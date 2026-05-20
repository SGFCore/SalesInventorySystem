package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Requestform;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestFormDTO {
    @JsonProperty("RequestID")
    private Long id;

    @JsonProperty("EmployeeID")
    private Long employeeId;

    @JsonProperty("CreatedDate")
    private LocalDate createddate;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("ApproverID")
    private Long approverId;

    @JsonProperty("RejectReason")
    private String rejectreason;

    public static RequestFormDTO fromEntity(Requestform entity) {
        if (entity == null) return null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long approverId = entity.getApproverid() != null ? entity.getApproverid().getId() : null;
        return new RequestFormDTO(
                entity.getId(),
                employeeId,
                entity.getCreateddate(),
                entity.getStatus(),
                approverId,
                entity.getRejectreason()
        );
    }
}