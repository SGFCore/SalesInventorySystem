package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCTID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "PRODUCTNAME", nullable = false, length = 100)
    private String productname;

    @Size(max = 200)
    @Nationalized
    @Column(name = "DETAIL", length = 200)
    private String detail;

    @Column(name = "PRODUCTPRICE")
    private Long productprice;

    @Column(name = "PRODUCTSTATUS")
    private Long productstatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "CATEGORYID")
    private Category categoryid;

    @NotNull
    @Column(name = "ALLOWRETURN", nullable = false)
    private Integer allowreturn;

    @Size(max = 4000)
    @Column(name = "IMAGEURL", length = 4000)
    private String imageurl;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTTYPEID")
    private Producttype producttypeid;


}