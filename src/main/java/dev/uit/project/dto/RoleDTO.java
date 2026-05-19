package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {

    @JsonProperty("RoleID")
    private Long id;

    @JsonProperty("RoleName")
    private String rolename;

    public static RoleDTO fromEntity(Role entity) {
        if (entity == null) return null;
        return new RoleDTO(
                entity.getId(),
                entity.getRolename()
        );
    }
}