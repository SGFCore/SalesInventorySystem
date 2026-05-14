package dev.uit.project.controller;

import dev.uit.project.dto.RoleDTO;
import dev.uit.project.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * Lấy danh sách tất cả các vai trò
     * GET /roles
     */
    @GetMapping
    public ResponseEntity<List<RoleDTO>> list() {
        return ResponseEntity.ok(roleService.list());
    }

    /**
     * Lấy thông tin vai trò theo ID
     * GET /roles/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<RoleDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(roleService.get(id));
    }

    /**
     * Tạo mới một vai trò
     * POST /roles
     */
    @PostMapping
    public ResponseEntity<RoleDTO> create(@RequestBody RoleDTO roleDTO) {
        return ResponseEntity.ok(roleService.create(roleDTO));
    }

    /**
     * Cập nhật thông tin vai trò
     * PUT /roles/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<RoleDTO> update(@PathVariable Long id, @RequestBody RoleDTO roleDTO) {
        return ResponseEntity.ok(roleService.update(id, roleDTO));
    }

    /**
     * Xóa một vai trò
     * DELETE /roles/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roleService.delete(id);
        return ResponseEntity.ok().build();
    }
}