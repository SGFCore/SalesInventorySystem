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
@Table(name = "DISCOUNT")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DISCOUNTID", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CUSTOMERTYPEID")
    private Customertype customertypeid;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "DISCOUNTNAME", nullable = false, length = 100)
    private String discountname;

    @NotNull
    @Column(name = "VALUE", nullable = false)
    private Long value;

    @Size(max = 300)
    @NotNull
    @Column(name = "DETAIL", nullable = false, length = 300)
    private String detail;

    @Size(max = 4000)
    @Column(name = "APPLIEDPRODUCTIDS", length = 4000)
    private String appliedproductids;

    @ColumnDefault("2")
    @Column(name = "STATUS")
    private Long status;

    @NotNull
    @Column(name = "EXPIRYDATE", nullable = false)
    private LocalDate expirydate;

    @NotNull
    @Column(name = "STARTDATE", nullable = false)
    private LocalDate startdate;


}