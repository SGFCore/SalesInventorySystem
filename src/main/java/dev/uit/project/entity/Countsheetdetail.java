package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "COUNTSHEETDETAIL")
public class Countsheetdetail {
    @EmbeddedId
    private CountsheetdetailId id;

    @MapsId("countsheetid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "COUNTSHEETID", nullable = false)
    private Countsheet countsheetid;

    @MapsId("warehouseid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "WAREHOUSEID", nullable = false)
    private Warehouse warehouseid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @NotNull
    @Column(name = "QUANTITY", nullable = false)
    private Long quantity;

    @Size(max = 50)
    @Nationalized
    @Column(name = "NOTE", length = 50)
    private String note;


}