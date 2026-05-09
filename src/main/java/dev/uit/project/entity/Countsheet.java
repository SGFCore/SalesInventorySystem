package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "COUNTSHEET")
public class Countsheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COUNTSHEETID", nullable = false)
    private Long id;

    @ColumnDefault("SYSDATE")
    @Column(name = "CREATEDDATE")
    private LocalDate createddate;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "STATUS", nullable = false)
    private Long status;


}