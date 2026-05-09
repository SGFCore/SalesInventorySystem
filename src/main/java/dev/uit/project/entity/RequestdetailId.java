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
public class RequestdetailId implements Serializable {
    private static final long serialVersionUID = -2440313653071991466L;
    @NotNull
    @Column(name = "REQUESTID", nullable = false)
    private Long requestid;

    @NotNull
    @Column(name = "PRODUCTID", nullable = false)
    private Long productid;


}