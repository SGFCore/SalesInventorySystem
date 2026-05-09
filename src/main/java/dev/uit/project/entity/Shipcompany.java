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
@Table(name = "SHIPCOMPANY")
public class Shipcompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SHIPCOMPANYID", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "SHIPCOMPANYNAME", nullable = false, length = 100)
    private String shipcompanyname;

    @Size(max = 50)
    @NotNull
    @Column(name = "SUPPORTEDREGION", nullable = false, length = 50)
    private String supportedregion;

    @Size(max = 15)
    @NotNull
    @Column(name = "PHONE", nullable = false, length = 15)
    private String phone;

    @Size(max = 100)
    @Column(name = "EMAIL", length = 100)
    private String email;

    @Size(max = 255)
    @Nationalized
    @Column(name = "ADDRESS")
    private String address;

    @Size(max = 500)
    @Nationalized
    @Column(name = "NOTES", length = 500)
    private String notes;

    @ColumnDefault("1")
    @Column(name = "STATUS")
    private Boolean status;


}