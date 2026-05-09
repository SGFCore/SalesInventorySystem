package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "PRODUCTTYPE")
public class Producttype {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRODUCTTYPEID", nullable = false)
    private Long id;

    @Size(max = 30)
    @NotNull
    @Column(name = "PRODUCTTYPENAME", nullable = false, length = 30)
    private String producttypename;

    @NotNull
    @Column(name = "CATEGORYID", nullable = false)
    private Long categoryid;


}