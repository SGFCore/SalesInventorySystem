package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "COMBO")
public class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COMBO_id_gen")
    @SequenceGenerator(name = "COMBO_id_gen", sequenceName = "COMBO_SEQ", allocationSize = 1)
    @Column(name = "COMBOID", nullable = false)
    private Long id;

    @Column(name = "COMBOPRICE", precision = 19, scale = 4)
    private BigDecimal comboprice;


}