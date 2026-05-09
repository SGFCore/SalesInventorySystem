package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "ORDERDETAIL")
public class Orderdetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDERDETAILID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ORDERID", nullable = false)
    private Order orderid;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "COMBOID")
    private Combo comboid;

    @Column(name = "QUANTITY")
    private Long quantity;

    @Column(name = "UNITPRICE", precision = 19, scale = 4)
    private BigDecimal unitprice;

    @ColumnDefault("0")
    @Column(name = "DISCOUNTAMOUNT", precision = 19, scale = 4)
    private BigDecimal discountamount;

    @NotNull
    @Column(name = "TOTALAMOUNT", nullable = false, precision = 19, scale = 4)
    private BigDecimal totalamount;


}