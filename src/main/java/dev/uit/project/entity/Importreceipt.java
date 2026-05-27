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

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "IMPORTRECEIPT")
public class Importreceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "IMPORTRECEIPT_id_gen")
    @SequenceGenerator(name = "IMPORTRECEIPT_id_gen", sequenceName = "IMPORT_RECEIPT_SEQ", allocationSize = 1)
    @Column(name = "IMPORTRECEIPTID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "WAREHOUSEID", nullable = false)
    private Warehouse warehouseid;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("'Bản nháp'")
    @Column(name = "STATUS", length = 50)
    private String status;

    @ColumnDefault("sysdate")
    @Column(name = "CREATEDDATE")
    private LocalDate createddate;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "REQUESTID")
    private Requestform requestid;

    @Size(max = 255)
    @Nationalized
    @Column(name = "DISCREPANCYREASON")
    private String discrepancyreason;

    @Size(max = 255)
    @Nationalized
    @Column(name = "DISCREPANCYIMAGEURL")
    private String discrepancyimageurl;

    @ColumnDefault("0")
    @Column(name = "HASDISCREPANCY")
    private Long hasdiscrepancy;


}