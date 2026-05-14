package dev.uit.project.service;

import dev.uit.project.dto.RoleDTO;
import dev.uit.project.entity.Role;
import dev.uit.project.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    /**
     * Lấy danh sách tất cả các vai trò
     */
    public List<RoleDTO> list() {
        return roleRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    /**
     * Lấy thông tin vai trò theo ID
     */
    public RoleDTO get(Long id) {
        return roleRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
    }

    /**
     * Tạo mới một vai trò
     * Lưu ý: Role sử dụng ID thủ công (không tự động sinh) nên client phải cung cấp ID.
     */
    public RoleDTO create(RoleDTO roleDTO) {
        if (roleDTO.getId() == null) {
            throw new RuntimeException("Role ID must be provided");
        }
        if (roleRepository.existsById(roleDTO.getId())) {
            throw new RuntimeException("Role already exists with id: " + roleDTO.getId());
        }
        Role role = convertToEntity(roleDTO);
        Role saved = roleRepository.save(role);
        return convertToDTO(saved);
    }

    /**
     * Cập nhật thông tin vai trò (chỉ cho phép đổi tên, không đổi ID)
     */
    public RoleDTO update(Long id, RoleDTO roleDTO) {
        Role existing = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found with id: " + id));
        existing.setRolename(roleDTO.getRolename());
        Role updated = roleRepository.save(existing);
        return convertToDTO(updated);
    }

    /**
     * Xóa một vai trò
     */
    public void delete(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new RuntimeException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }

    // ------------------ Chuyển đổi Entity <-> DTO ------------------

    private RoleDTO convertToDTO(Role entity) {
        return RoleDTO.fromEntity(entity);
    }

    private Role convertToEntity(RoleDTO dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setRolename(dto.getRolename());
        return role;
    }
}