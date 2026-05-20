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
@Table(name = "ORDERRETURN")
public class OrderReturn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RETURNID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ORDERID", nullable = false)
    private Order orderid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @ColumnDefault("SYSDATE")
    @Column(name = "RETURNDATE")
    private LocalDate returndate;

    @Size(max = 255)
    @Nationalized
    @Column(name = "REASON")
    private String reason;

    @Column(name = "TOTALREFUND", precision = 19, scale = 4)
    private BigDecimal totalrefund;

    @Size(max = 100)
    @Column(name = "RETURNREFCODE", length = 100)
    private String returnrefcode;

    @Size(max = 50)
    @Nationalized
    @Column(name = "STATUS", length = 50)
    private String status;
}