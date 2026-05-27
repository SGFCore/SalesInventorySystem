package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "REQUESTDETAIL")
public class Requestdetail {
    @EmbeddedId
    @SequenceGenerator(name = "REQUESTDETAIL_id_gen", sequenceName = "PRODUCT_TYPE_SEQ", allocationSize = 1)
    private RequestdetailId id;

    @MapsId("requestid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "REQUESTID", nullable = false)
    private Requestform requestid;

    @MapsId("productid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "PRODUCTID", nullable = false)
    private Product productid;

    @Column(name = "QUANTITY")
    private Long quantity;


}