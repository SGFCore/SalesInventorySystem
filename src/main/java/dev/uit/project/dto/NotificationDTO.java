package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {

    @JsonProperty("NotificationID")
    private Long id;

    @JsonProperty("EmployeeID")
    private Long employeeId;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("Message")
    private String message;

    @JsonProperty("Type")
    private Long type;

    @JsonProperty("Status")
    private Integer status; // 0 or 1 matching frontend number status

    @JsonProperty("CreatedDate")
    private LocalDate createddate;

    public static NotificationDTO fromEntity(Notification entity) {
        if (entity == null) return null;
        Long employeeIdVal = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long productIdVal = entity.getProductid() != null ? entity.getProductid().getId() : null;
        Integer statusVal = entity.getStatus() != null ? (entity.getStatus() ? 1 : 0) : 0;
        return new NotificationDTO(
                entity.getId(),
                employeeIdVal,
                entity.getTitle(),
                productIdVal,
                entity.getMessage(),
                entity.getType(),
                statusVal,
                entity.getCreateddate()
        );
    }
}
