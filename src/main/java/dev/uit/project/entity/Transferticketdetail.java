package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "TRANSFERTICKETDETAIL")
public class Transferticketdetail {
    @EmbeddedId
    private TransferticketdetailId id;

    @MapsId("transferid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "TRANSFERID", nullable = false)
    private Transferticket transferid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "EXPORTQUANTITY")
    private Long exportquantity;

    @Column(name = "RECEIVEQUANTITY")
    private Long receivequantity;

    @Column(name = "REQUESTQUANTITY")
    private Long requestquantity;


}