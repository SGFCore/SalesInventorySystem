package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "RETURNPOLICY")
public class Returnpolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "RETURNPOLICY_id_gen")
    @SequenceGenerator(name = "RETURNPOLICY_id_gen", sequenceName = "RETURN_POLICY_SEQ", allocationSize = 1)
    @Column(name = "POLICYID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "POLICYNAME", nullable = false, length = 100)
    private String policyname;

    @Column(name = "MAXRETURNDAYS")
    private Long maxreturndays;

    @Column(name = "PENALTYFEERATE", precision = 5, scale = 2)
    private BigDecimal penaltyfeerate;

    @NotNull
    @Column(name = "EFFECTIVEDATE", nullable = false)
    private LocalDate effectivedate;

    @Column(name = "ISACTIVE")
    private Long isactive;


}