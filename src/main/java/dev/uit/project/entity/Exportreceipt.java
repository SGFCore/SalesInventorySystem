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
@Table(name = "EXPORTRECEIPT")
public class Exportreceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EXPORTRECEIPTID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @NotNull
    @Column(name = "EXPORTTYPE", nullable = false)
    private Boolean exporttype;

    @Size(max = 255)
    @Nationalized
    @Column(name = "REASON")
    private String reason;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("'Đã hoàn thành'")
    @Column(name = "STATUS", length = 50)
    private String status;

    @ColumnDefault("SYSDATE")
    @Column(name = "CREATEDDATE")
    private LocalDate createddate;


}