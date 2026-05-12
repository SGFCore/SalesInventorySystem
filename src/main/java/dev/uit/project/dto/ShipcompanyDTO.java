package dev.uit.project.dto;

import dev.uit.project.entity.Shipcompany;

public class ShipcompanyDTO {
    private Long id;
    private String shipcompanyname;
    private String supportedregion;
    private String phone;
    private String email;
    private String address;
    private String notes;
    private Integer status;

    // Constructor không tham số
    public ShipcompanyDTO() {
    }

    // Constructor đầy đủ tham số
    public ShipcompanyDTO(Long id, String shipcompanyname, String supportedregion,
                          String phone, String email, String address, String notes,
                          Integer status) {
        this.id = id;
        this.shipcompanyname = shipcompanyname;
        this.supportedregion = supportedregion;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.notes = notes;
        this.status = status;
    }

    // Getter và Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShipcompanyname() {
        return shipcompanyname;
    }

    public void setShipcompanyname(String shipcompanyname) {
        this.shipcompanyname = shipcompanyname;
    }

    public String getSupportedregion() {
        return supportedregion;
    }

    public void setSupportedregion(String supportedregion) {
        this.supportedregion = supportedregion;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // Phương thức fromEntity
    public static ShipcompanyDTO fromEntity(Shipcompany entity) {
        if (entity == null) {
            return null;
        }
        return new ShipcompanyDTO(
                entity.getId(),
                entity.getShipcompanyname(),
                entity.getSupportedregion(),
                entity.getPhone(),
                entity.getEmail(),
                entity.getAddress(),
                entity.getNotes(),
                entity.getStatus()
        );
    }
}