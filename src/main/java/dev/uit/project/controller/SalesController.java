package dev.uit.project.controller;

import dev.uit.project.dto.OrderDTO;
import dev.uit.project.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    @GetMapping("/orders/search")
    public ResponseEntity<List<OrderDTO>> searchOrders(@RequestParam String keyword) {
        return ResponseEntity.ok(salesService.searchOrders(keyword));
    }

    @PostMapping("/exchange")
    public ResponseEntity<?> processExchange(@RequestBody java.util.Map<String, Object> payload) {
        try {
            Long orderId = Long.valueOf(payload.get("orderId").toString());
            Long oldProductId = Long.valueOf(payload.get("oldProductId").toString());
            Long newProductId = Long.valueOf(payload.get("newProductId").toString());
            Integer quantity = Integer.valueOf(payload.get("quantity").toString());
            Long employeeId = Long.valueOf(payload.get("employeeId").toString());
            salesService.processExchange(orderId, oldProductId, newProductId, quantity, employeeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/return")
    public ResponseEntity<?> processReturn(@RequestBody java.util.Map<String, Object> payload) {
        try {
            Long orderId = Long.valueOf(payload.get("orderId").toString());
            String reason = payload.get("reason").toString();
            Long employeeId = Long.valueOf(payload.get("employeeId").toString());
            List<java.util.Map<String, Object>> items = (List<java.util.Map<String, Object>>) payload.get("items");
            salesService.processReturn(orderId, reason, employeeId, items);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/transfer-tickets")
    public ResponseEntity<List<dev.uit.project.dto.TransferticketDTO>> getTransferTickets() {
        return ResponseEntity.ok(salesService.getTransferTickets());
    }

    @PostMapping("/transfer-tickets")
    public ResponseEntity<?> createTransferTicket(@RequestBody java.util.Map<String, Object> payload) {
        try {
            salesService.createTransferTicket(payload);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/transfer-tickets/{id}/confirm-receive")
    public ResponseEntity<?> confirmTransferReceive(@PathVariable Long id) {
        try {
            salesService.confirmTransferReceive(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", e.getMessage()));
        }
    }
}
