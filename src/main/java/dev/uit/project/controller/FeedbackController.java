package dev.uit.project.controller;

import dev.uit.project.dto.FeedbackDTO;
import dev.uit.project.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> list() {
        return ResponseEntity.ok(feedbackService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(feedbackService.get(id));
    }

    @PostMapping
    public ResponseEntity<FeedbackDTO> create(@RequestBody FeedbackDTO dto) {
        return ResponseEntity.ok(feedbackService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackDTO> update(@PathVariable Long id, @RequestBody FeedbackDTO dto) {
        return ResponseEntity.ok(feedbackService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        feedbackService.delete(id);
        return ResponseEntity.ok().build();
    }
}
