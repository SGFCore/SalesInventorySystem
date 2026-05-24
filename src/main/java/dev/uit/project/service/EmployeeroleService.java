package dev.uit.project.service;

import dev.uit.project.dto.EmployeeroleDTO;
import dev.uit.project.entity.Employeerole;
import dev.uit.project.entity.EmployeeroleId;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Role;
import dev.uit.project.repository.EmployeeroleRepository;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeroleService {

    private final EmployeeroleRepository employeeroleRepository;
    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;

    /**
     * Lấy danh sách tất cả các phân quyền nhân viên
     */
    public List<EmployeeroleDTO> list() {
        return employeeroleRepository.findAll()
                .stream()
                .map(EmployeeroleDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thông tin phân quyền theo employeeId và roleId
     */
    public EmployeeroleDTO get(Long employeeId, Long roleId) {
        EmployeeroleId id = new EmployeeroleId();
        id.setEmployeeid(employeeId);
        id.setRoleid(roleId);
        return employeeroleRepository.findById(id)
                .map(EmployeeroleDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Employeerole not found with employeeId: " + employeeId + ", roleId: " + roleId));
    }

    /**
     * Tạo mới một phân quyền nhân viên
     */
    public EmployeeroleDTO create(EmployeeroleDTO dto) {
        // Kiểm tra employee và role tồn tại
        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + dto.getEmployeeId()));
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + dto.getRoleId()));

        EmployeeroleId id = new EmployeeroleId();
        id.setEmployeeid(dto.getEmployeeId());
        id.setRoleid(dto.getRoleId());

        if (employeeroleRepository.existsById(id)) {
            throw new RuntimeException("Employeerole already exists");
        }

        Employeerole entity = new Employeerole();
        entity.setId(id);
        entity.setEmployeeid(employee);
        entity.setRoleid(role);

        Employeerole saved = employeeroleRepository.save(entity);
        return EmployeeroleDTO.fromEntity(saved);
    }

    /**
     * Cập nhật phân quyền 
     */
    public EmployeeroleDTO update(Long employeeId, Long roleId, EmployeeroleDTO dto) {
        throw new UnsupportedOperationException("Update not supported for Employeerole. Use delete and create instead.");
    }

    /**
     * Xóa một phân quyền
     */
    public void delete(Long employeeId, Long roleId) {
        EmployeeroleId id = new EmployeeroleId();
        id.setEmployeeid(employeeId);
        id.setRoleid(roleId);
        if (!employeeroleRepository.existsById(id)) {
            throw new RuntimeException("Employeerole not found with employeeId: " + employeeId + ", roleId: " + roleId);
        }
        employeeroleRepository.deleteById(id);
    }
}