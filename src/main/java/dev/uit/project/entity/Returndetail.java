package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "RETURNDETAIL")
public class Returndetail {
    @EmbeddedId
    private ReturndetailId id;

    @MapsId("returnid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "RETURNID", nullable = false)
    private Orderreturn returnid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Size(max = 50)
    @Nationalized
    @Column(name = "QC_STATUS", length = 50)
    private String qcStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "TARGETWAREHOUSEID")
    private Warehouse targetwarehouseid;

    @Size(max = 100)
    @Nationalized
    @Column(name = "ACTIONTAKEN", length = 100)
    private String actiontaken;


}