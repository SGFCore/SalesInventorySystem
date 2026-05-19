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
import dev.uit.project.dto.PaymentDTO;
import dev.uit.project.service.PaymentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    
    private final PaymentService paymentService;
    
    /**
     * Lấy danh sách tất cả các thanh toán
     * GET /payments
     */
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> list() {
        return ResponseEntity.ok(paymentService.list());
    }
    
    /**
     * Lấy thông tin thanh toán theo ID
     * GET /payments/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.get(id));
    }
    
    /**
     * Tạo mới một thanh toán
     * POST /payments
     */
    @PostMapping
    public ResponseEntity<PaymentDTO> create(@RequestBody PaymentDTO paymentDTO) {
        return ResponseEntity.ok(paymentService.create(paymentDTO));
    }
    
    /**
     * Cập nhật thông tin thanh toán
     * PUT /payments/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<PaymentDTO> update(@PathVariable Long id, @RequestBody PaymentDTO paymentDTO) {
        return ResponseEntity.ok(paymentService.update(id, paymentDTO));
    }
    
    /**
     * Xóa một thanh toán
     * DELETE /payments/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        paymentService.delete(id);
        return ResponseEntity.ok().build();
    }
}