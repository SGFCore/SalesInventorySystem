package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "DETAILINVENTORY")
public class Detailinventory {
    @EmbeddedId
    private DetailinventoryId id;

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

    @ColumnDefault("0")
    @Column(name = "CURRENTQUANTITY")
    private Long currentquantity;

    @ColumnDefault("0")
    @Column(name = "REALSTOCK")
    private Long realstock;

    @ColumnDefault("0")
    @Column(name = "AVAILABLESTOCK")
    private Long availablestock;

    @Column(name = "MINSTOCK")
    private Long minstock;

    @Column(name = "MAXSTOCK")
    private Long maxstock;

    @ColumnDefault("1")
    @Column(name = "ISALERTENABLED")
    private Integer isAlertEnabled;

    @Size(max = 100)
    @Nationalized
    @Column(name = "STORAGELOCATION", length = 100)
    private String storagelocation;


}