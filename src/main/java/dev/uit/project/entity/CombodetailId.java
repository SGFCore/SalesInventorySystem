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
public class CombodetailId implements Serializable {
    private static final long serialVersionUID = 4195558661467568037L;
    @NotNull
    @Column(name = "COMBOID", nullable = false)
    private Long comboid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}