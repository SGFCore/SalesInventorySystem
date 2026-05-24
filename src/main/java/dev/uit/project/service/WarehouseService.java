package dev.uit.project.service;

import dev.uit.project.dto.WarehouseDTO;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Warehouse;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final EmployeeRepository employeeRepository;

    /**
     * Lấy danh sách tất cả kho hàng
     */
    public List<WarehouseDTO> list() {
        return warehouseRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin kho hàng theo ID
     */
    public WarehouseDTO get(Long id) {
        return warehouseRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + id));
    }

    /**
     * Tạo mới một kho hàng
     */
    public WarehouseDTO create(WarehouseDTO warehouseDTO) {
        Warehouse warehouse = convertToEntity(warehouseDTO);
        warehouse.setId(null); // đảm bảo tạo mới
        Warehouse saved = warehouseRepository.save(warehouse);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin kho hàng
     */
    public WarehouseDTO update(Long id, WarehouseDTO warehouseDTO) {
        Warehouse existing = warehouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Warehouse not found with id: " + id));

        existing.setWarehousename(warehouseDTO.getWarehousename());
        existing.setAddress(warehouseDTO.getAddress());
        existing.setContactnumber(warehouseDTO.getContactnumber());
        existing.setCapacity(warehouseDTO.getCapacity());
        existing.setStatus(warehouseDTO.getStatus());
        existing.setWarehousetype(warehouseDTO.getWarehousetype());

        // Xử lý manager
        if (warehouseDTO.getManagerId() != null) {
            Employee manager = employeeRepository.findById(warehouseDTO.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + warehouseDTO.getManagerId()));
            existing.setManagerid(manager);
        } else {
            existing.setManagerid(null);
        }

        Warehouse updated = warehouseRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một kho hàng
     */
    public void delete(Long id) {
        if (!warehouseRepository.existsById(id)) {
            throw new RuntimeException("Warehouse not found with id: " + id);
        }
        warehouseRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private WarehouseDTO convertToDTO(Warehouse entity) {
        return WarehouseDTO.fromEntity(entity);
    }

    private Warehouse convertToEntity(WarehouseDTO dto) {
        Warehouse warehouse = new Warehouse();
        warehouse.setWarehousename(dto.getWarehousename());
        warehouse.setAddress(dto.getAddress());
        warehouse.setContactnumber(dto.getContactnumber());
        warehouse.setCapacity(dto.getCapacity());
        warehouse.setStatus(dto.getStatus());
        warehouse.setWarehousetype(dto.getWarehousetype());

        if (dto.getManagerId() != null) {
            Employee manager = employeeRepository.findById(dto.getManagerId())
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + dto.getManagerId()));
            warehouse.setManagerid(manager);
        }

        return warehouse;
    }
}