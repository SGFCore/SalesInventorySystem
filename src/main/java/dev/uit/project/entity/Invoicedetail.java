package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "INVOICEDETAIL")
public class Invoicedetail {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "INVOICEDETAIL_id_gen")
    @SequenceGenerator(name = "INVOICEDETAIL_id_gen", sequenceName = "INVOICE_DETAIL_SEQ", allocationSize = 1)
    @Column(name = "INVOICEDETAILID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "INVOICEID", nullable = false)
    private Invoice invoiceid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID")
    private Product productid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "COMBOID")
    private Combo comboid;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Column(name = "UNITPRICE", precision = 19, scale = 4)
    private BigDecimal unitprice;

    @ColumnDefault("0")
    @Column(name = "DISCOUNTAMOUNT", precision = 19, scale = 4)
    private BigDecimal discountamount;

    @NotNull
    @Column(name = "TOTALAMOUNT", nullable = false, precision = 19, scale = 4)
    private BigDecimal totalamount;


}