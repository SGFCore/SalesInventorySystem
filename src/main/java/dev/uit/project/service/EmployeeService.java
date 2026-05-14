package dev.uit.project.service;

import dev.uit.project.dto.EmployeeDTO;
import dev.uit.project.entity.Employee;
import dev.uit.project.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    /**
     * Lấy danh sách tất cả nhân viên
     */
    public List<EmployeeDTO> list() {
        return employeeRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin nhân viên theo ID
     */
    public EmployeeDTO get(Long id) {
        return employeeRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    /**
     * Tạo mới nhân viên
     */
    public EmployeeDTO create(EmployeeDTO employeeDTO) {
        Employee employee = convertToEntity(employeeDTO);
        employee.setId(null); // đảm bảo tạo mới
        Employee saved = employeeRepository.save(employee);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin nhân viên
     */
    public EmployeeDTO update(Long id, EmployeeDTO employeeDTO) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        existing.setFullname(employeeDTO.getFullname());
        existing.setEmail(employeeDTO.getEmail());
        existing.setPhone(employeeDTO.getPhone());
        existing.setPasswordhash(employeeDTO.getPasswordhash()); // nên mã hóa mật khẩu trong thực tế
        existing.setStatus(employeeDTO.getStatus());

        Employee updated = employeeRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa nhân viên
     */
    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private EmployeeDTO convertToDTO(Employee entity) {
        return EmployeeDTO.fromEntity(entity);
    }

    private Employee convertToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        employee.setFullname(dto.getFullname());
        employee.setEmail(dto.getEmail());
        employee.setPhone(dto.getPhone());
        employee.setPasswordhash(dto.getPasswordhash()); // nên mã hóa trước khi lưu
        employee.setStatus(dto.getStatus());
        return employee;
    }
}