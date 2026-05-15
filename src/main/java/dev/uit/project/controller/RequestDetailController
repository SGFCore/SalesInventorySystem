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
import dev.uit.project.dto.RequestDetailDTO;
import dev.uit.project.service.RequestDetailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/request-details")
@RequiredArgsConstructor
public class RequestDetailController {
    
    private final RequestDetailService requestDetailService;
    
    /**
     * Lấy danh sách tất cả chi tiết yêu cầu
     * GET /request-details
     */
    @GetMapping
    public ResponseEntity<List<RequestDetailDTO>> list() {
        return ResponseEntity.ok(requestDetailService.list());
    }
    
    /**
     * Lấy thông tin chi tiết yêu cầu theo ID
     * GET /request-details/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<RequestDetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(requestDetailService.get(id));
    }
    
    /**
     * Tạo mới một chi tiết yêu cầu
     * POST /request-details
     */
    @PostMapping
    public ResponseEntity<RequestDetailDTO> create(@RequestBody RequestDetailDTO requestDetailDTO) {
        return ResponseEntity.ok(requestDetailService.create(requestDetailDTO));
    }
    
    /**
     * Cập nhật thông tin chi tiết yêu cầu
     * PUT /request-details/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<RequestDetailDTO> update(@PathVariable Long id, @RequestBody RequestDetailDTO requestDetailDTO) {
        return ResponseEntity.ok(requestDetailService.update(id, requestDetailDTO));
    }
    
    /**
     * Xóa một chi tiết yêu cầu
     * DELETE /request-details/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        requestDetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
