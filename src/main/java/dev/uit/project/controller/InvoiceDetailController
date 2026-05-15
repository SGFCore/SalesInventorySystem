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
import dev.uit.project.dto.InvoicedetailDTO;
import dev.uit.project.service.InvoicedetailService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/invoice-details")
@RequiredArgsConstructor
public class InvoiceDetailController {
    
    private final InvoicedetailService invoicedetailService;
    
    /**
     * Lấy danh sách tất cả các chi tiết hóa đơn
     * GET /invoice-details
     */
    @GetMapping
    public ResponseEntity<List<InvoicedetailDTO>> list() {
        return ResponseEntity.ok(invoicedetailService.list());
    }
    
    /**
     * Lấy thông tin chi tiết hóa đơn theo ID
     * GET /invoice-details/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<InvoicedetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(invoicedetailService.get(id));
    }
    
    /**
     * Tạo mới một chi tiết hóa đơn
     * POST /invoice-details
     */
    @PostMapping
    public ResponseEntity<InvoicedetailDTO> create(@RequestBody InvoicedetailDTO invoicedetailDTO) {
        return ResponseEntity.ok(invoicedetailService.create(invoicedetailDTO));
    }
    
    /**
     * Cập nhật thông tin chi tiết hóa đơn
     * PUT /invoice-details/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<InvoicedetailDTO> update(@PathVariable Long id, @RequestBody InvoicedetailDTO invoicedetailDTO) {
        return ResponseEntity.ok(invoicedetailService.update(id, invoicedetailDTO));
    }
    
    /**
     * Xóa một chi tiết hóa đơn
     * DELETE /invoice-details/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoicedetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
