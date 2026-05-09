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
public class TransferticketdetailId implements Serializable {
    private static final long serialVersionUID = 7306599229044550858L;
    @NotNull
    @Column(name = "TRANSFERID", nullable = false)
    private Long transferid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}