package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "COMBODETAIL")
public class Combodetail {
    @EmbeddedId
    private CombodetailId id;

    @MapsId("comboid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "COMBOID", nullable = false)
    private Combo comboid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "QUANTITY")
    private Long quantity;


}