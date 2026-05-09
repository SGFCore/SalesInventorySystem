package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "EXPORTRECEIPTDETAIL")
public class Exportreceiptdetail {
    @EmbeddedId
    private ExportreceiptdetailId id;

    @MapsId("exportreceiptid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EXPORTRECEIPTID", nullable = false)
    private Exportreceipt exportreceiptid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "QUANTITY")
    private Long quantity;


}