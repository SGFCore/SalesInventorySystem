package dev.uit.project.dto;

import dev.uit.project.entity.Employee;

public class EmployeeDTO {
    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private String passwordhash;
    private Integer status;

    // Constructor không tham số
    public EmployeeDTO() {
    }

    // Constructor có tham số
    public EmployeeDTO(Long id, String fullname, String email, String phone, String passwordhash, Integer status) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.phone = phone;
        this.passwordhash = passwordhash;
        this.status = status;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPasswordhash() {
        return passwordhash;
    }

    public void setPasswordhash(String passwordhash) {
        this.passwordhash = passwordhash;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // Phương thức fromEntity
    public static EmployeeDTO fromEntity(Employee entity) {
        if (entity == null) {
            return null;
        }
        return new EmployeeDTO(
            entity.getId(),
            entity.getFullname(),
            entity.getEmail(),
            entity.getPhone(),
            entity.getPasswordhash(),
            entity.getStatus()
        );
    }
}