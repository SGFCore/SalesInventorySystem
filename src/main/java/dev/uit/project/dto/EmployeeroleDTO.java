package dev.uit.project.dto;

import dev.uit.project.entity.Employeerole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeroleDTO {
    private Long employeeId;
    private Long roleId;

    public static EmployeeroleDTO fromEntity(Employeerole entity) {
        if (entity == null) return null;
        Long employeeId = entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null;
        Long roleId = entity.getRoleid() != null ? entity.getRoleid().getId() : null;
        return new EmployeeroleDTO(
                employeeId,
                roleId
        );
    }
}