package dev.uit.project.service;

import dev.uit.project.dto.CountsheetdetailDTO;
import dev.uit.project.entity.Countsheetdetail;
import dev.uit.project.repository.CountsheetdetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CountsheetdetailService {

    private final CountsheetdetailRepository countsheetdetailRepository;

    public List<CountsheetdetailDTO> list() {
        return countsheetdetailRepository.findAll().stream()
                .map(CountsheetdetailDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public CountsheetdetailDTO get(Long id) {
        return countsheetdetailRepository.findById(id)
                .map(CountsheetdetailDTO::fromEntity)
                .orElse(null);
    }

    public CountsheetdetailDTO create(CountsheetdetailDTO dto) {
        Countsheetdetail entity = dto.toEntity();
        Countsheetdetail saved = countsheetdetailRepository.save(entity);
        return CountsheetdetailDTO.fromEntity(saved);
    }

    public CountsheetdetailDTO update(Long id, CountsheetdetailDTO dto) {
        if (!countsheetdetailRepository.existsById(id)) {
            return null;
        }
        Countsheetdetail entity = dto.toEntity();
        Countsheetdetail saved = countsheetdetailRepository.save(entity);
        return CountsheetdetailDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        countsheetdetailRepository.deleteById(id);
    }
}
