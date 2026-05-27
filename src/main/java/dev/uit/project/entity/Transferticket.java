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
@Table(name = "TRANSFERTICKET")
public class Transferticket {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TRANSFERTICKET_id_gen")
    @SequenceGenerator(name = "TRANSFERTICKET_id_gen", sequenceName = "TRANSFER_TICKET_SEQ", allocationSize = 1)
    @Column(name = "TRANSFERID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "SOURCEWHID", nullable = false)
    private Warehouse sourcewhid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "DESTWHID", nullable = false)
    private Warehouse destwhid;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("'Chờ xuất kho'")
    @Column(name = "STATUS", length = 50)
    private String status;

    @ColumnDefault("sysdate")
    @Column(name = "CREATEDDATE")
    private LocalDate createddate;


}