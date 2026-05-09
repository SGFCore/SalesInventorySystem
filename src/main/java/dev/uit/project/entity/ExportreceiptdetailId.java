package dev.uit.project.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class ExportreceiptdetailId implements Serializable {
    private static final long serialVersionUID = -989145720942422078L;
    @NotNull
    @Column(name = "EXPORTRECEIPTID", nullable = false)
    private Long exportreceiptid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}