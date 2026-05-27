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
@Table(name = "NOTIFICATION")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTIFICATION_id_gen")
    @SequenceGenerator(name = "NOTIFICATION_id_gen", sequenceName = "NOTIFICATION_SEQ", allocationSize = 1)
    @Column(name = "NOTIFICATIONID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @Size(max = 200)
    @NotNull
    @Nationalized
    @Column(name = "TITLE", nullable = false, length = 200)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID")
    private Product productid;

    @Size(max = 1000)
    @NotNull
    @Nationalized
    @Column(name = "MESSAGE", nullable = false, length = 1000)
    private String message;

    @Column(name = "\"TYPE\"")
    private Long type;

    @Column(name = "STATUS")
    private Integer status;

    @NotNull
    @ColumnDefault("sysdate")
    @Column(name = "CREATEDDATE", nullable = false)
    private LocalDate createddate;


}