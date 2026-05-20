package dev.uit.project.controller;

import dev.uit.project.dto.ListdiscountDTO;
import dev.uit.project.service.ListdiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/list-discounts")
@RequiredArgsConstructor
public class ListdiscountController {

    private final ListdiscountService listdiscountService;

    @GetMapping
    public ResponseEntity<List<ListdiscountDTO>> list() {
        return ResponseEntity.ok(listdiscountService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListdiscountDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(listdiscountService.get(id));
    }

    @PostMapping
    public ResponseEntity<ListdiscountDTO> create(@RequestBody ListdiscountDTO dto) {
        return ResponseEntity.ok(listdiscountService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListdiscountDTO> update(@PathVariable Long id, @RequestBody ListdiscountDTO dto) {
        return ResponseEntity.ok(listdiscountService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        listdiscountService.delete(id);
        return ResponseEntity.ok().build();
    }
}
