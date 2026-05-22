package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Paymentmethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodDTO {

    @JsonProperty("PaymentMethodID")
    private Long id;

    @JsonProperty("PaymentName")
    private String paymentname;

    @JsonProperty("Status")
    private Integer status;

    public static PaymentMethodDTO fromEntity(Paymentmethod entity) {
        if (entity == null) return null;
        return new PaymentMethodDTO(
                entity.getId(),
                entity.getPaymentname(),
                entity.getStatus()
        );
    }
}
