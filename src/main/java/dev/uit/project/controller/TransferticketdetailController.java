package dev.uit.project.controller;

import dev.uit.project.dto.TransferticketdetailDTO;
import dev.uit.project.service.TransferticketdetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfer-ticket-details")
@RequiredArgsConstructor
public class TransferticketdetailController {

    private final TransferticketdetailService transferticketdetailService;

    @GetMapping
    public ResponseEntity<List<TransferticketdetailDTO>> list() {
        return ResponseEntity.ok(transferticketdetailService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferticketdetailDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(transferticketdetailService.get(id));
    }

    @PostMapping
    public ResponseEntity<TransferticketdetailDTO> create(@RequestBody TransferticketdetailDTO dto) {
        return ResponseEntity.ok(transferticketdetailService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransferticketdetailDTO> update(@PathVariable Long id, @RequestBody TransferticketdetailDTO dto) {
        return ResponseEntity.ok(transferticketdetailService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transferticketdetailService.delete(id);
        return ResponseEntity.ok().build();
    }
}
