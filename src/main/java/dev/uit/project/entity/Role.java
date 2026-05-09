package dev.uit.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ROLE")
public class Role {
    @Id
    @Column(name = "ROLEID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Column(name = "ROLENAME", nullable = false, length = 100)
    private String rolename;


}