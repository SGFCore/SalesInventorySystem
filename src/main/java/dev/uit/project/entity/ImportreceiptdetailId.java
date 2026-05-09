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
public class ImportreceiptdetailId implements Serializable {
    private static final long serialVersionUID = -1484908444737874813L;
    @NotNull
    @Column(name = "IMPORTRECEIPTID", nullable = false)
    private Long importreceiptid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}