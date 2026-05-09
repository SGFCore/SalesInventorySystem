package dev.uit.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class EmployeeroleId implements Serializable {
    private static final long serialVersionUID = 4341720842407858597L;
    @NotNull
    @Column(name = "EMPLOYEEID", nullable = false)
    private Long employeeid;

    @NotNull
    @Column(name = "ROLEID", nullable = false)
    private Long roleid;


}