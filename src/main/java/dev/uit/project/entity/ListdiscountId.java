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
public class ListdiscountId implements Serializable {
    private static final long serialVersionUID = 72638954531866080L;
    @NotNull
    @Column(name = "ORDERID", nullable = false)
    private Long orderid;

    @NotNull
    @Column(name = "DISCOUNTID", nullable = false)
    private Long discountid;


}