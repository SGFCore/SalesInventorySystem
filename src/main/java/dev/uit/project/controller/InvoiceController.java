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
import dev.uit.project.dto.InvoiceDTO;
import dev.uit.project.service.InvoiceService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    
    private final InvoiceService invoiceService;
    
    /**
     * Lấy danh sách tất cả các hóa đơn
     * GET /invoices
     */
    @GetMapping
    public ResponseEntity<List<InvoiceDTO>> list() {
        return ResponseEntity.ok(invoiceService.list());
    }
    
    /**
     * Lấy thông tin hóa đơn theo ID
     * GET /invoices/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.get(id));
    }
    
    /**
     * Tạo mới một hóa đơn
     * POST /invoices
     */
    @PostMapping
    public ResponseEntity<InvoiceDTO> create(@RequestBody InvoiceDTO invoiceDTO) {
        return ResponseEntity.ok(invoiceService.create(invoiceDTO));
    }
    
    /**
     * Cập nhật thông tin hóa đơn
     * PUT /invoices/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<InvoiceDTO> update(@PathVariable Long id, @RequestBody InvoiceDTO invoiceDTO) {
        return ResponseEntity.ok(invoiceService.update(id, invoiceDTO));
    }
    
    /**
     * Xóa một hóa đơn
     * DELETE /invoices/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        invoiceService.delete(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Generate PDF (VAT or normal) for an existing invoice
     */
    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdf(@RequestBody java.util.Map<String, Object> payload) {
        try {
            Long invoiceId = Long.valueOf(payload.get("invoiceId").toString());
            boolean isVat = payload.containsKey("isVat") && Boolean.parseBoolean(payload.get("isVat").toString());
            java.util.Map<String, Object> vatInfo = isVat ? (java.util.Map<String, Object>) payload.get("vatInfo") : null;

            java.io.ByteArrayOutputStream pdf = invoiceService.generateInvoicePdf(invoiceId, vatInfo);
            
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                    .header(org.springframework.http.HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=invoice_" + invoiceId + ".pdf")
                    .body(pdf.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get pending invoices for payment
     */
    @GetMapping("/pending")
    public ResponseEntity<List<InvoiceDTO>> getPendingInvoices() {
        return ResponseEntity.ok(invoiceService.getPendingInvoices());
    }
}