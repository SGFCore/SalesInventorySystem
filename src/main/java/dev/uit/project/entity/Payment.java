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
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "PAYMENT")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PAYMENT_id_gen")
    @SequenceGenerator(name = "PAYMENT_id_gen", sequenceName = "PAYMENT_SEQ", allocationSize = 1)
    @Column(name = "PAYMENTID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "INVOICEID", nullable = false)
    private Invoice invoiceid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PAYMENTMETHODID", nullable = false)
    private Paymentmethod paymentmethodid;

    @Column(name = "AMOUNTPAID", precision = 19, scale = 4)
    private BigDecimal amountpaid;

    @Size(max = 100)
    @Column(name = "REFERENCECODE", length = 100)
    private String referencecode;

    @ColumnDefault("current_timestamp")
    @Column(name = "PAYMENTDATE")
    private Instant paymentdate;


}