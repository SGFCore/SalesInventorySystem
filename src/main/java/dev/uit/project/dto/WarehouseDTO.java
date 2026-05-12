package dev.uit.project.dto;

import dev.uit.project.entity.Warehouse;

public class WarehouseDTO {
    private Long id;
    private String warehousename;
    private Long managerId;
    private String address;
    private String contactnumber;
    private Long capacity;
    private Long status;
    private Long warehousetype;

    // Constructor không tham số
    public WarehouseDTO() {
    }

    // Constructor có tham số
    public WarehouseDTO(Long id, String warehousename, Long managerId, String address, String contactnumber, Long capacity, Long status, Long warehousetype) {
        this.id = id;
        this.warehousename = warehousename;
        this.managerId = managerId;
        this.address = address;
        this.contactnumber = contactnumber;
        this.capacity = capacity;
        this.status = status;
        this.warehousetype = warehousetype;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWarehousename() {
        return warehousename;
    }

    public void setWarehousename(String warehousename) {
        this.warehousename = warehousename;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getContactnumber() {
        return contactnumber;
    }

    public void setContactnumber(String contactnumber) {
        this.contactnumber = contactnumber;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getStatus() {
        return status;
    }

    public void setStatus(Long status) {
        this.status = status;
    }

    public Long getWarehousetype() {
        return warehousetype;
    }

    public void setWarehousetype(Long warehousetype) {
        this.warehousetype = warehousetype;
    }

    // Phương thức fromEntity
    public static WarehouseDTO fromEntity(Warehouse entity) {
        if (entity == null) {
            return null;
        }
        return new WarehouseDTO(
            entity.getId(),
            entity.getWarehousename(),
            entity.getManagerid() != null ? entity.getManagerid().getId() : null,
            entity.getAddress(),
            entity.getContactnumber(),
            entity.getCapacity(),
            entity.getStatus(),
            entity.getWarehousetype()
        );
    }
}