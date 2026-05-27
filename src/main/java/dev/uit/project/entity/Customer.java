package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "CUSTOMER")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUSTOMER_id_gen")
    @SequenceGenerator(name = "CUSTOMER_id_gen", sequenceName = "CUSTOMER_SEQ", allocationSize = 1)
    @Column(name = "CUSTOMERID", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CUSTOMERTYPEID")
    private Customertype customertypeid;

    @Size(max = 40)
    @NotNull
    @Nationalized
    @Column(name = "FIRSTNAME", nullable = false, length = 40)
    private String firstname;

    @Size(max = 20)
    @NotNull
    @Nationalized
    @Column(name = "LASTNAME", nullable = false, length = 20)
    private String lastname;

    @Size(max = 40)
    @Nationalized
    @Column(name = "COMPANYNAME", length = 40)
    private String companyname;

    @Size(max = 15)
    @NotNull
    @Column(name = "PHONE", nullable = false, length = 15)
    private String phone;

    @Size(max = 255)
    @Nationalized
    @Column(name = "ADDRESS")
    private String address;

    @Size(max = 100)
    @Column(name = "EMAIL", length = 100)
    private String email;

    @NotNull
    @ColumnDefault("sysdate")
    @Column(name = "CREATEDDATE", nullable = false)
    private LocalDate createddate;

    @ColumnDefault("0")
    @Column(name = "TOTALACCUMULATEDSPENT", precision = 19, scale = 4)
    private BigDecimal totalaccumulatedspent;


}