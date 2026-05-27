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
@Table(name = "WAREHOUSE")
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "WAREHOUSE_id_gen")
    @SequenceGenerator(name = "WAREHOUSE_id_gen", sequenceName = "WAREHOUSE_SEQ", allocationSize = 1)
    @Column(name = "WAREHOUSEID", nullable = false)
    private Long id;

    @Size(max = 50)
    @NotNull
    @Nationalized
    @Column(name = "WAREHOUSENAME", nullable = false, length = 50)
    private String warehousename;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "MANAGERID", nullable = false)
    private Employee managerid;

    @Size(max = 100)
    @NotNull
    @Nationalized
    @Column(name = "ADDRESS", nullable = false, length = 100)
    private String address;

    @Size(max = 15)
    @NotNull
    @Column(name = "CONTACTNUMBER", nullable = false, length = 15)
    private String contactnumber;

    @NotNull
    @Column(name = "CAPACITY", nullable = false)
    private Long capacity;

    @Column(name = "STATUS")
    private Long status;

    @Column(name = "WAREHOUSETYPE")
    private Long warehousetype;


}