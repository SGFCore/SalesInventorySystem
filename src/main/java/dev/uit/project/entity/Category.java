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
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CATEGORYID", nullable = false)
    private Long id;

    @Size(max = 30)
    @NotNull
    @Nationalized
    @Column(name = "CATEGORYNAME", nullable = false, length = 30)
    private String categoryname;


}