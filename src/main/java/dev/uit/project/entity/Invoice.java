package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "INVOICE")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "INVOICEID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CUSTOMERID", nullable = false)
    private Customer customerid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID")
    private Employee employeeid;

    @NotNull
    @Column(name = "SALECHANNELCODE", nullable = false)
    private Long salechannelcode;

    @Column(name = "TOTALAMOUNT", precision = 19, scale = 4)
    private BigDecimal totalamount;

    @ColumnDefault("0")
    @Column(name = "TAXAMOUNT", precision = 19, scale = 4)
    private BigDecimal taxamount;

    @Column(name = "FINALAMOUNT", precision = 19, scale = 4)
    private BigDecimal finalamount;

    @Size(max = 20)
    @NotNull
    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    @ColumnDefault("SYSDATE")
    @Column(name = "INVOICEDATE")
    private LocalDate invoicedate;


}