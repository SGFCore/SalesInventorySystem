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
import dev.uit.project.dto.PaymentMethodDTO;
import dev.uit.project.service.PaymentMethodService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {
    
    private final PaymentMethodService paymentMethodService;
    
    /**
     * Lấy danh sách tất cả các phương thức thanh toán
     * GET /payment-methods
     */
    @GetMapping
    public ResponseEntity<List<PaymentMethodDTO>> list() {
        return ResponseEntity.ok(paymentMethodService.list());
    }
    
    /**
     * Lấy thông tin phương thức thanh toán theo ID
     * GET /payment-methods/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethodDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(paymentMethodService.get(id));
    }
    
    /**
     * Tạo mới một phương thức thanh toán
     * POST /payment-methods
     */
    @PostMapping
    public ResponseEntity<PaymentMethodDTO> create(@RequestBody PaymentMethodDTO paymentMethodDTO) {
        return ResponseEntity.ok(paymentMethodService.create(paymentMethodDTO));
    }
    
    /**
     * Cập nhật thông tin phương thức thanh toán
     * PUT /payment-methods/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethodDTO> update(@PathVariable Long id, @RequestBody PaymentMethodDTO paymentMethodDTO) {
        return ResponseEntity.ok(paymentMethodService.update(id, paymentMethodDTO));
    }
    
    /**
     * Xóa một phương thức thanh toán
     * DELETE /payment-methods/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        paymentMethodService.delete(id);
        return ResponseEntity.ok().build();
    }
}
