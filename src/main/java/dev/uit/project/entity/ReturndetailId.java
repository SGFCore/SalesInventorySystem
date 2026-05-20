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
public class ReturnDetailId implements Serializable {
    private static final long serialVersionUID = -8972803962287852464L;
    @NotNull
    @Column(name = "RETURNID", nullable = false)
    private Long returnid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;
}