package dev.uit.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "EMPLOYEEROLE")
public class Employeerole {
    @EmbeddedId
    private EmployeeroleId id;

    @MapsId("employeeid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "EMPLOYEEID", nullable = false)
    private Employee employeeid;

    @MapsId("roleid")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "ROLEID", nullable = false)
    private Role roleid;


}