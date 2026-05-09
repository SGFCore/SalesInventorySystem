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
public class DetailinventoryId implements Serializable {
    private static final long serialVersionUID = -6932048138177726362L;
    @NotNull
    @Column(name = "WAREHOUSEID", nullable = false)
    private Long warehouseid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}