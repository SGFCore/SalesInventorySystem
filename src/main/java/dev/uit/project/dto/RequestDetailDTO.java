package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Requestdetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDetailDTO {

    @JsonProperty("RequestID")
    private Long id;

    @JsonProperty("ProductID")
    private Long productId;

    @JsonProperty("Quantity")
    private Long quantity;

    public static RequestDetailDTO fromEntity(Requestdetail entity) {
        if (entity == null) return null;
        Long reqVal = entity.getRequestid() != null ? entity.getRequestid().getId() : null;
        Long prodVal = entity.getProductid() != null ? entity.getProductid().getId() : null;
        return new RequestDetailDTO(
                reqVal,
                prodVal,
                entity.getQuantity()
        );
    }
}
