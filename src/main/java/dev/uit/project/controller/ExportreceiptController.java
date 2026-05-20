package dev.uit.project.controller;

import dev.uit.project.dto.ExportreceiptDTO;
import dev.uit.project.service.ExportreceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/export-receipts")
@RequiredArgsConstructor
public class ExportreceiptController {

    private final ExportreceiptService exportreceiptService;

    @GetMapping
    public ResponseEntity<List<ExportreceiptDTO>> list() {
        return ResponseEntity.ok(exportreceiptService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExportreceiptDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(exportreceiptService.get(id));
    }

    @PostMapping
    public ResponseEntity<ExportreceiptDTO> create(@RequestBody ExportreceiptDTO dto) {
        return ResponseEntity.ok(exportreceiptService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExportreceiptDTO> update(@PathVariable Long id, @RequestBody ExportreceiptDTO dto) {
        return ResponseEntity.ok(exportreceiptService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        exportreceiptService.delete(id);
        return ResponseEntity.ok().build();
    }
}
