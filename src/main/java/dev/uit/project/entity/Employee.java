package dev.uit.project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "EMPLOYEE")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMPLOYEEID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "FULLNAME", nullable = false, length = 100)
    private String fullname;

    @Size(max = 100)
    @Column(name = "EMAIL", length = 100)
    private String email;

    @Size(max = 15)
    @NotNull
    @Column(name = "PHONE", nullable = false, length = 15)
    private String phone;

    @Size(max = 255)
    @NotNull
    @Column(name = "PASSWORDHASH", nullable = false)
    private String passwordhash;

    @ColumnDefault("1")
    @Column(name = "STATUS")
    private Integer status;


}