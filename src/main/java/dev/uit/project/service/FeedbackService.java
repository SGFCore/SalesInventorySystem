package dev.uit.project.service;

import dev.uit.project.dto.FeedbackDTO;
import dev.uit.project.entity.Feedback;
import dev.uit.project.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public List<FeedbackDTO> list() {
        return feedbackRepository.findAll().stream()
                .map(FeedbackDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public FeedbackDTO get(Long id) {
        return feedbackRepository.findById(id)
                .map(FeedbackDTO::fromEntity)
                .orElse(null);
    }

    public FeedbackDTO create(FeedbackDTO dto) {
        Feedback entity = dto.toEntity();
        Feedback saved = feedbackRepository.save(entity);
        return FeedbackDTO.fromEntity(saved);
    }

    public FeedbackDTO update(Long id, FeedbackDTO dto) {
        if (!feedbackRepository.existsById(id)) {
            return null;
        }
        Feedback entity = dto.toEntity();
        Feedback saved = feedbackRepository.save(entity);
        return FeedbackDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        feedbackRepository.deleteById(id);
    }
}
