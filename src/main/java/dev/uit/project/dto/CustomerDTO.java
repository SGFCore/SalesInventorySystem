package dev.uit.project.dto;

import dev.uit.project.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;
    private Long customertypeId;
    private String firstname;
    private String lastname;
    private String companyname;
    private String phone;
    private String address;
    private String email;
    private LocalDate createddate;
    private BigDecimal totalaccumulatedspent;

    public static CustomerDTO fromEntity(Customer entity) {
        if (entity == null) return null;
        Long customertypeId = entity.getCustomertypeid() != null ? entity.getCustomertypeid().getId() : null;
        return new CustomerDTO(
                entity.getId(),
                customertypeId,
                entity.getFirstname(),
                entity.getLastname(),
                entity.getCompanyname(),
                entity.getPhone(),
                entity.getAddress(),
                entity.getEmail(),
                entity.getCreateddate(),
                entity.getTotalaccumulatedspent()
        );
    }
}