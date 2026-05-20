package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    @JsonProperty("EmployeeID")
    private Long id;

    @JsonProperty("Fullname")
    private String fullname;

    @JsonProperty("Email")
    private String email;

    @JsonProperty("Phone")
    private String phone;

    @JsonProperty("password")
    private String password;

    @JsonProperty("Status")
    private Integer status;

    public static EmployeeDTO fromEntity(Employee entity) {
        if (entity == null) return null;
        return new EmployeeDTO(
                entity.getId(),
                entity.getFullname(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getPassword(),
                entity.getStatus()
        );
    }
}