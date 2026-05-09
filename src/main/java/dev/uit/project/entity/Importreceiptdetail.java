package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "IMPORTRECEIPTDETAIL")
public class Importreceiptdetail {
    @EmbeddedId
    private ImportreceiptdetailId id;

    @MapsId("importreceiptid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "IMPORTRECEIPTID", nullable = false)
    private Importreceipt importreceiptid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "EXPECTEDQUANTITY")
    private Long expectedquantity;

    @Column(name = "ACTUALQUANTITY")
    private Long actualquantity;


}