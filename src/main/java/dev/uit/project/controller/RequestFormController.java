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
import dev.uit.project.dto.RequestFormDTO;
import dev.uit.project.service.RequestFormService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/request-forms")
@RequiredArgsConstructor
public class RequestFormController {
    
    private final RequestFormService requestFormService;
    
    /**
     * Lấy danh sách tất cả các phiếu yêu cầu
     * GET /request-forms
     */
    @GetMapping
    public ResponseEntity<List<RequestFormDTO>> list() {
        return ResponseEntity.ok(requestFormService.list());
    }
    
    /**
     * Lấy thông tin phiếu yêu cầu theo ID
     * GET /request-forms/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<RequestFormDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(requestFormService.get(id));
    }
    
    /**
     * Tạo mới một phiếu yêu cầu
     * POST /request-forms
     */
    @PostMapping
    public ResponseEntity<RequestFormDTO> create(@RequestBody RequestFormDTO requestFormDTO) {
        return ResponseEntity.ok(requestFormService.create(requestFormDTO));
    }
    
    /**
     * Cập nhật thông tin phiếu yêu cầu
     * PUT /request-forms/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<RequestFormDTO> update(@PathVariable Long id, @RequestBody RequestFormDTO requestFormDTO) {
        return ResponseEntity.ok(requestFormService.update(id, requestFormDTO));
    }
    
    /**
     * Xóa một phiếu yêu cầu
     * DELETE /request-forms/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        requestFormService.delete(id);
        return ResponseEntity.ok().build();
    }
}
