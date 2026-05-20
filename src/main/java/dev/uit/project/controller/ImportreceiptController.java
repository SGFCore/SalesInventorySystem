package dev.uit.project.controller;

import dev.uit.project.dto.ImportreceiptDTO;
import dev.uit.project.service.ImportreceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/import-receipts")
@RequiredArgsConstructor
public class ImportreceiptController {

    private final ImportreceiptService importreceiptService;

    @GetMapping
    public ResponseEntity<List<ImportreceiptDTO>> list() {
        return ResponseEntity.ok(importreceiptService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportreceiptDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(importreceiptService.get(id));
    }

    @PostMapping
    public ResponseEntity<ImportreceiptDTO> create(@RequestBody ImportreceiptDTO dto) {
        return ResponseEntity.ok(importreceiptService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportreceiptDTO> update(@PathVariable Long id, @RequestBody ImportreceiptDTO dto) {
        return ResponseEntity.ok(importreceiptService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        importreceiptService.delete(id);
        return ResponseEntity.ok().build();
    }
}
