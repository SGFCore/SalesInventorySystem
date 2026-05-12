package dev.uit.project.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.uit.project.dto.CustomertypeDTO;
import dev.uit.project.service.CustomertypeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customer-types")
@RequiredArgsConstructor
public class CustomertypeController {
    
    private final CustomertypeService customertypeService;
    
    /**
     * Lấy danh sách tất cả các loại khách hàng
     * GET /customer-types
     */
    @GetMapping
    public ResponseEntity<List<CustomertypeDTO>> list() {
        return ResponseEntity.ok(customertypeService.list());
    }
    
    /**
     * Lấy thông tin loại khách hàng theo ID
     * GET /customer-types/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CustomertypeDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(customertypeService.get(id));
    }
    
    /**
     * Tạo mới một loại khách hàng
     * POST /customer-types
     */
    @PostMapping
    public ResponseEntity<CustomertypeDTO> create(@RequestBody CustomertypeDTO customertypeDTO) {
        return ResponseEntity.ok(customertypeService.create(customertypeDTO));
    }
    
    /**
     * Cập nhật thông tin loại khách hàng
     * PUT /customer-types/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<CustomertypeDTO> update(@PathVariable Long id, @RequestBody CustomertypeDTO customertypeDTO) {
        return ResponseEntity.ok(customertypeService.update(id, customertypeDTO));
    }
    
    /**
     * Xóa một loại khách hàng
     * DELETE /customer-types/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customertypeService.delete(id);
        return ResponseEntity.ok().build();
    }
}
