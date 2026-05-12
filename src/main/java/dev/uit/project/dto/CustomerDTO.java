package dev.uit.project.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import dev.uit.project.entity.Customer;


public class CustomerDTO {
    private Long id;
    private CustomertypeDTO customertypeid;
    private String firstname;
    private String lastname;
    private String companyname;
    private String phone;
    private String address;
    private String email;
    private LocalDate createddate;
    private BigDecimal totalaccumulatedspent;

    // Constructor không tham số
    public CustomerDTO() {
    }

    // Constructor có tham số
    public CustomerDTO(Long id, CustomertypeDTO customertypeid, String firstname, String lastname, String companyname, String phone, String address, String email, LocalDate createddate, BigDecimal totalaccumulatedspent) {
        this.id = id;
        this.customertypeid = customertypeid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.companyname = companyname;
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.createddate = createddate;
        this.totalaccumulatedspent = totalaccumulatedspent;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomertypeDTO getCustomertypeid() {
        return customertypeid;
    }

    public void setCustomertypeid(CustomertypeDTO customertypeid) {
        this.customertypeid = customertypeid;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getCompanyname() {
        return companyname;
    }

    public void setCompanyname(String companyname) {
        this.companyname = companyname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreateddate() {
        return createddate;
    }

    public void setCreateddate(LocalDate createddate) {
        this.createddate = createddate;
    }

    public BigDecimal getTotalaccumulatedspent() {
        return totalaccumulatedspent;
    }

    public void setTotalaccumulatedspent(BigDecimal totalaccumulatedspent) {
        this.totalaccumulatedspent = totalaccumulatedspent;
    }

    // Phương thức fromEntity
    public static CustomerDTO fromEntity(Customer entity) {
        if (entity == null) {
            return null;
        }
        return new CustomerDTO(
            entity.getId(),
            entity.getCustomertypeid() != null ? CustomertypeDTO.fromEntity(entity.getCustomertypeid()) : null,
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