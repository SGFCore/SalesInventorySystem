package dev.uit.project.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import dev.uit.project.entity.Returnpolicy;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReturnpolicyDTO {

    @JsonProperty("PolicyID")
    private Long id;

    @JsonProperty("PolicyName")
    private String policyname;

    @JsonProperty("MaxReturnDays")
    private Long maxreturndays;

    @JsonProperty("PenaltyFeeRate")
    private BigDecimal penaltyfeerate;

    @JsonProperty("EffectiveDate")
    private LocalDate effectivedate;

    @JsonProperty("IsActive")
    private Long isactive;

    public static ReturnpolicyDTO fromEntity(Returnpolicy entity) {
        if (entity == null) return null;
        return new ReturnpolicyDTO(
                entity.getId(),
                entity.getPolicyname(),
                entity.getMaxreturndays(),
                entity.getPenaltyfeerate(),
                entity.getEffectivedate(),
                entity.getIsactive()
        );
    }
}