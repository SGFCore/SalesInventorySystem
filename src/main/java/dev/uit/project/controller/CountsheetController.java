package dev.uit.project.controller;

import dev.uit.project.dto.CountsheetDTO;
import dev.uit.project.service.CountsheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/count-sheets")
@RequiredArgsConstructor
public class CountsheetController {

    private final CountsheetService countsheetService;

    @GetMapping
    public ResponseEntity<List<CountsheetDTO>> list() {
        return ResponseEntity.ok(countsheetService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CountsheetDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(countsheetService.get(id));
    }

    @PostMapping
    public ResponseEntity<CountsheetDTO> create(@RequestBody CountsheetDTO dto) {
        return ResponseEntity.ok(countsheetService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CountsheetDTO> update(@PathVariable Long id, @RequestBody CountsheetDTO dto) {
        return ResponseEntity.ok(countsheetService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        countsheetService.delete(id);
        return ResponseEntity.ok().build();
    }
}
