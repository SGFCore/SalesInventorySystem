package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "LISTDISCOUNT")
public class Listdiscount {
    @EmbeddedId
    private ListdiscountId id;

    @MapsId("orderid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ORDERID", nullable = false)
    private Order orderid;

    @MapsId("discountid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "DISCOUNTID", nullable = false)
    private Discount discountid;

    @NotNull
    @Column(name = "APPLIEDVALUE", nullable = false)
    private Long appliedvalue;


}