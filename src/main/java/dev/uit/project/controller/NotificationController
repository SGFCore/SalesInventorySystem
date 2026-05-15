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
import dev.uit.project.dto.NotificationDTO;
import dev.uit.project.service.NotificationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    
    private final NotificationService notificationService;
    
    /**
     * Lấy danh sách tất cả các thông báo
     * GET /notifications
     */
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> list() {
        return ResponseEntity.ok(notificationService.list());
    }
    
    /**
     * Lấy thông tin thông báo theo ID
     * GET /notifications/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<NotificationDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.get(id));
    }
    
    /**
     * Tạo mới một thông báo
     * POST /notifications
     */
    @PostMapping
    public ResponseEntity<NotificationDTO> create(@RequestBody NotificationDTO notificationDTO) {
        return ResponseEntity.ok(notificationService.create(notificationDTO));
    }
    
    /**
     * Cập nhật thông tin thông báo
     * PUT /notifications/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<NotificationDTO> update(@PathVariable Long id, @RequestBody NotificationDTO notificationDTO) {
        return ResponseEntity.ok(notificationService.update(id, notificationDTO));
    }
    
    /**
     * Xóa một thông báo
     * DELETE /notifications/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.delete(id);
        return ResponseEntity.ok().build();
    }
}