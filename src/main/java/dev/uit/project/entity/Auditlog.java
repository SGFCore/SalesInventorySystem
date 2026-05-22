package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "AUDITLOG")
@NoArgsConstructor
@AllArgsConstructor
public class Auditlog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AUDITLOGID", nullable = false)
    private Long id;

    @NotNull
    @ColumnDefault("SYSDATE")
    @Column(name = "TIMESTAMP", nullable = false)
    private LocalDateTime timestamp;

    @NotNull
    @Size(max = 100)
    @Nationalized
    @Column(name = "TABLENAME", nullable = false, length = 100)
    private String tablename;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @Size(max = 4000)
    @Column(name = "OLDVALUE", length = 4000)
    private String oldvalue;

    @Size(max = 4000)
    @Column(name = "NEWVALUE", length = 4000)
    private String newvalue;

    @Size(max = 50)
    @Nationalized
    @Column(name = "ACTION", length = 50)
    private String action;

    @Column(name = "AFFECTEDID")
    private Long affectedid;
}
