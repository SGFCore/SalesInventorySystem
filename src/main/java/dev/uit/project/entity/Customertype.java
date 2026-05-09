package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "CUSTOMERTYPE")
public class Customertype {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CUSTOMERTYPEID", nullable = false)
    private Long id;

    @Size(max = 40)
    @NotNull
    @Nationalized
    @Column(name = "CUSTOMERTYPENAME", nullable = false, length = 40)
    private String customertypename;

    @NotNull
    @Column(name = "DISCOUNT", nullable = false, precision = 5, scale = 2)
    private BigDecimal discount;

    @Size(max = 200)
    @NotNull
    @Nationalized
    @Column(name = "DETAIL", nullable = false, length = 200)
    private String detail;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "SPENDINGLIMIT", nullable = false)
    private Long spendinglimit;


}