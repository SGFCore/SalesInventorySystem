package dev.uit.project.service;

import dev.uit.project.dto.CountsheetDTO;
import dev.uit.project.entity.Countsheet;
import dev.uit.project.repository.CountsheetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CountsheetService {

    private final CountsheetRepository countsheetRepository;

    public List<CountsheetDTO> list() {
        return countsheetRepository.findAll().stream()
                .map(CountsheetDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public CountsheetDTO get(Long id) {
        return countsheetRepository.findById(id)
                .map(CountsheetDTO::fromEntity)
                .orElse(null);
    }

    public CountsheetDTO create(CountsheetDTO dto) {
        Countsheet entity = dto.toEntity();
        Countsheet saved = countsheetRepository.save(entity);
        return CountsheetDTO.fromEntity(saved);
    }

    public CountsheetDTO update(Long id, CountsheetDTO dto) {
        if (!countsheetRepository.existsById(id)) {
            return null;
        }
        Countsheet entity = dto.toEntity();
        Countsheet saved = countsheetRepository.save(entity);
        return CountsheetDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        countsheetRepository.deleteById(id);
    }
}
