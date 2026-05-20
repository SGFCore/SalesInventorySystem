package dev.uit.project.service;

import dev.uit.project.dto.ImportreceiptdetailDTO;
import dev.uit.project.entity.Importreceiptdetail;
import dev.uit.project.repository.ImportreceiptdetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImportreceiptdetailService {

    private final ImportreceiptdetailRepository importreceiptdetailRepository;

    public List<ImportreceiptdetailDTO> list() {
        return importreceiptdetailRepository.findAll().stream()
                .map(ImportreceiptdetailDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ImportreceiptdetailDTO get(dev.uit.project.entity.ImportreceiptdetailId id) {
        return importreceiptdetailRepository.findById(id)
                .map(ImportreceiptdetailDTO::fromEntity)
                .orElse(null);
    }

    public ImportreceiptdetailDTO create(ImportreceiptdetailDTO dto) {
        Importreceiptdetail entity = dto.toEntity();
        Importreceiptdetail saved = importreceiptdetailRepository.save(entity);
        return ImportreceiptdetailDTO.fromEntity(saved);
    }

    public ImportreceiptdetailDTO update(dev.uit.project.entity.ImportreceiptdetailId id, ImportreceiptdetailDTO dto) {
        if (!importreceiptdetailRepository.existsById(id)) {
            return null;
        }
        Importreceiptdetail entity = dto.toEntity();
        Importreceiptdetail saved = importreceiptdetailRepository.save(entity);
        return ImportreceiptdetailDTO.fromEntity(saved);
    }

    public void delete(dev.uit.project.entity.ImportreceiptdetailId id) {
        importreceiptdetailRepository.deleteById(id);
    }
}
