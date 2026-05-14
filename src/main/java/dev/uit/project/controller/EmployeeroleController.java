package dev.uit.project.controller;

import dev.uit.project.dto.EmployeeroleDTO;
import dev.uit.project.service.EmployeeroleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee-roles")
@RequiredArgsConstructor
public class EmployeeroleController {

    private final EmployeeroleService employeeroleService;

    /**
     * Lấy danh sách tất cả phân quyền nhân viên
     * GET /employee-roles
     */
    @GetMapping
    public ResponseEntity<List<EmployeeroleDTO>> list() {
        return ResponseEntity.ok(employeeroleService.list());
    }

    /**
     * Lấy thông tin phân quyền theo employeeId và roleId
     * GET /employee-roles/{employeeId}/{roleId}
     */
    @GetMapping("/{employeeId}/{roleId}")
    public ResponseEntity<EmployeeroleDTO> get(@PathVariable Long employeeId, @PathVariable Long roleId) {
        return ResponseEntity.ok(employeeroleService.get(employeeId, roleId));
    }

    /**
     * Tạo mới một phân quyền nhân viên
     * POST /employee-roles
     */
    @PostMapping
    public ResponseEntity<EmployeeroleDTO> create(@RequestBody EmployeeroleDTO employeeroleDTO) {
        return ResponseEntity.ok(employeeroleService.create(employeeroleDTO));
    }

    /**
     * Cập nhật phân quyền (không hỗ trợ, chỉ để giữ đúng cấu trúc API)
     * PUT /employee-roles/{employeeId}/{roleId}
     */
    @PutMapping("/{employeeId}/{roleId}")
    public ResponseEntity<EmployeeroleDTO> update(@PathVariable Long employeeId, @PathVariable Long roleId,
                                                  @RequestBody EmployeeroleDTO employeeroleDTO) {
        // Service đã ném UnsupportedOperationException, có thể bắt và trả về lỗi phù hợp
        return ResponseEntity.status(405).build(); // Method Not Allowed
    }

    /**
     * Xóa một phân quyền
     * DELETE /employee-roles/{employeeId}/{roleId}
     */
    @DeleteMapping("/{employeeId}/{roleId}")
    public ResponseEntity<Void> delete(@PathVariable Long employeeId, @PathVariable Long roleId) {
        employeeroleService.delete(employeeId, roleId);
        return ResponseEntity.ok().build();
    }
}