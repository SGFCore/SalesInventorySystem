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
import dev.uit.project.dto.ReturnPolicyDTO;
import dev.uit.project.service.ReturnPolicyService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/return-policies")
@RequiredArgsConstructor
public class ReturnPolicyController {
    
    private final ReturnPolicyService returnPolicyService;
    
    /**
     * Lấy danh sách tất cả các chính sách hoàn trả
     * GET /return-policies
     */
    @GetMapping
    public ResponseEntity<List<ReturnPolicyDTO>> list() {
        return ResponseEntity.ok(returnPolicyService.list());
    }
    
    /**
     * Lấy thông tin chính sách hoàn trả theo ID
     * GET /return-policies/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReturnPolicyDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(returnPolicyService.get(id));
    }
    
    /**
     * Tạo mới một chính sách hoàn trả
     * POST /return-policies
     */
    @PostMapping
    public ResponseEntity<ReturnPolicyDTO> create(@RequestBody ReturnPolicyDTO returnPolicyDTO) {
        return ResponseEntity.ok(returnPolicyService.create(returnPolicyDTO));
    }
    
    /**
     * Cập nhật thông tin chính sách hoàn trả
     * PUT /return-policies/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReturnPolicyDTO> update(@PathVariable Long id, @RequestBody ReturnPolicyDTO returnPolicyDTO) {
        return ResponseEntity.ok(returnPolicyService.update(id, returnPolicyDTO));
    }
    
    /**
     * Xóa một chính sách hoàn trả
     * DELETE /return-policies/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        returnPolicyService.delete(id);
        return ResponseEntity.ok().build();
    }
}
