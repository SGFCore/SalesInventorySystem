package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "PAYMENTMETHOD")
public class Paymentmethod {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PAYMENTMETHOD_id_gen")
    @SequenceGenerator(name = "PAYMENTMETHOD_id_gen", sequenceName = "PAYMENT_METHOD_SEQ", allocationSize = 1)
    @Column(name = "PAYMENTMETHODID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "PAYMENTNAME", nullable = false, length = 100)
    private String paymentname;

    @Column(name = "STATUS")
    private Integer status;


}