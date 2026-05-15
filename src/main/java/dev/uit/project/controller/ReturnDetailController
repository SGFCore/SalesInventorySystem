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
import dev.uit.project.dto.ReturnDetailDTO;
import dev.uit.project.service.ReturnDetailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/return-details")
@RequiredArgsConstructor
public class ReturnDetailController {
    
    private final ReturnDetailService returnDetailService;
    
    /**
     * Lấy danh sách tất cả các chi tiết trả hàng
     * GET /return-details
     */
    @GetMapping
    public ResponseEntity<List<ReturnDetailDTO>> list() {
        return ResponseEntity.ok(returnDetailService.list());
    }
    
    /**
     * Lấy thông tin chi tiết trả hàng theo ID
     * GET /return-details/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReturnDetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(returnDetailService.get(id));
    }
    
    /**
     * Tạo mới một chi tiết trả hàng
     * POST /return-details
     */
    @PostMapping
    public ResponseEntity<ReturnDetailDTO> create(@RequestBody ReturnDetailDTO returnDetailDTO) {
        return ResponseEntity.ok(returnDetailService.create(returnDetailDTO));
    }
    
    /**
     * Cập nhật thông tin chi tiết trả hàng
     * PUT /return-details/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ReturnDetailDTO> update(@PathVariable Long id, @RequestBody ReturnDetailDTO returnDetailDTO) {
        return ResponseEntity.ok(returnDetailService.update(id, returnDetailDTO));
    }
    
    /**
     * Xóa một chi tiết trả hàng
     * DELETE /return-details/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        returnDetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
