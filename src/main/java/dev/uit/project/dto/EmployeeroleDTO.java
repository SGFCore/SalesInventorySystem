package dev.uit.project.dto;

import dev.uit.project.entity.Employeerole;

public class EmployeeroleDTO {
    private Long employeeId;
    private Long roleId;

    // Constructor không tham số
    public EmployeeroleDTO() {
    }

    // Constructor có tham số
    public EmployeeroleDTO(Long employeeId, Long roleId) {
        this.employeeId = employeeId;
        this.roleId = roleId;
    }

    // Getters và Setters
    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    // Phương thức fromEntity
    public static EmployeeroleDTO fromEntity(Employeerole entity) {
        if (entity == null) {
            return null;
        }
        return new EmployeeroleDTO(
            entity.getEmployeeid() != null ? entity.getEmployeeid().getId() : null,
            entity.getRoleid() != null ? entity.getRoleid().getId() : null
        );
    }
}