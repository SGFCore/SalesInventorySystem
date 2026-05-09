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
public class CountsheetdetailId implements Serializable {
    private static final long serialVersionUID = 1874105376840658927L;
    @NotNull
    @Column(name = "COUNTSHEETID", nullable = false)
    private Long countsheetid;

    @NotNull
    @Column(name = "WAREHOUSEID", nullable = false)
    private Long warehouseid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}