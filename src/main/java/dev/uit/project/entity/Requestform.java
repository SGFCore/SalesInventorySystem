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
@Table(name = "REQUESTFORM")
public class Requestform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REQUESTID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @ColumnDefault("SYSDATE")
    @Column(name = "CREATEDDATE")
    private LocalDate createddate;

    @Size(max = 50)
    @Nationalized
    @ColumnDefault("'Chờ duyệt'")
    @Column(name = "STATUS", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "APPROVERID")
    private Employee approverid;

    @Size(max = 255)
    @Nationalized
    @Column(name = "REJECTREASON")
    private String rejectreason;


}