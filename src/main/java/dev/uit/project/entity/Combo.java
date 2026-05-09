package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "COMBO")
public class Combo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMBOID", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "COMBOPRICE", nullable = false, precision = 19, scale = 4)
    private BigDecimal comboprice;


}