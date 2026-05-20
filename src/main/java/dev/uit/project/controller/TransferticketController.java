package dev.uit.project.controller;

import dev.uit.project.dto.TransferticketDTO;
import dev.uit.project.service.TransferticketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfer-tickets")
@RequiredArgsConstructor
public class TransferticketController {

    private final TransferticketService transferticketService;

    @GetMapping
    public ResponseEntity<List<TransferticketDTO>> list() {
        return ResponseEntity.ok(transferticketService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransferticketDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(transferticketService.get(id));
    }

    @PostMapping
    public ResponseEntity<TransferticketDTO> create(@RequestBody TransferticketDTO dto) {
        return ResponseEntity.ok(transferticketService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransferticketDTO> update(@PathVariable Long id, @RequestBody TransferticketDTO dto) {
        return ResponseEntity.ok(transferticketService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transferticketService.delete(id);
        return ResponseEntity.ok().build();
    }
}
