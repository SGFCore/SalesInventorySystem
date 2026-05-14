package dev.uit.project.controller;

import dev.uit.project.dto.EmployeeDTO;
import dev.uit.project.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /**
     * Lấy danh sách tất cả nhân viên
     * GET /employees
     */
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> list() {
        return ResponseEntity.ok(employeeService.list());
    }

    /**
     * Lấy thông tin nhân viên theo ID
     * GET /employees/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.get(id));
    }

    /**
     * Tạo mới một nhân viên
     * POST /employees
     */
    @PostMapping
    public ResponseEntity<EmployeeDTO> create(@RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.create(employeeDTO));
    }

    /**
     * Cập nhật thông tin nhân viên
     * PUT /employees/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> update(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        return ResponseEntity.ok(employeeService.update(id, employeeDTO));
    }

    /**
     * Xóa một nhân viên
     * DELETE /employees/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.ok().build();
    }
}