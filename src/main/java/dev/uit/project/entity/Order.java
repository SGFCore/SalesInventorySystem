package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "\"ORDER\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDERID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CUSTOMERID", nullable = false)
    private Customer customerid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "INVOICEID")
    private Invoice invoiceid;

    @Size(max = 20)
    @Column(name = "SHIPCODE", length = 20)
    private String shipcode;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "SHIPCOMPANYID")
    private Shipcompany shipcompanyid;

    @Column(name = "TOTALAMOUNT", precision = 19, scale = 4)
    private BigDecimal totalamount;

    @NotNull
    @Column(name = "ORDERSTATUS", nullable = false)
    private Long orderstatus;

    @Column(name = "SHIPPINGSTATUS")
    private Long shippingstatus;

    @Size(max = 100)
    @Column(name = "SHIPMENTNOTE", length = 100)
    private String shipmentnote;

    @Column(name = "SHIPPINGFEE")
    private Long shippingfee;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EXPORTRECEIPTID")
    private Exportreceipt exportreceiptid;


}