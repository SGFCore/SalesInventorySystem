package dev.uit.project.dto;

import dev.uit.project.entity.Role;

public class RoleDTO {
    private Long id;
    private String rolename;

    // Constructor không tham số
    public RoleDTO() {
    }

    // Constructor có tham số
    public RoleDTO(Long id, String rolename) {
        this.id = id;
        this.rolename = rolename;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    // Phương thức fromEntity
    public static RoleDTO fromEntity(Role entity) {
        if (entity == null) {
            return null;
        }
        return new RoleDTO(
            entity.getId(),
            entity.getRolename()
        );
    }
}