package dev.uit.project.service;

import dev.uit.project.dto.ImportreceiptDTO;
import dev.uit.project.entity.Importreceipt;
import dev.uit.project.repository.ImportreceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ImportreceiptService {

    private final ImportreceiptRepository importreceiptRepository;

    public List<ImportreceiptDTO> list() {
        return importreceiptRepository.findAll().stream()
                .map(ImportreceiptDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ImportreceiptDTO get(Long id) {
        return importreceiptRepository.findById(id)
                .map(ImportreceiptDTO::fromEntity)
                .orElse(null);
    }

    public ImportreceiptDTO create(ImportreceiptDTO dto) {
        Importreceipt entity = dto.toEntity();
        Importreceipt saved = importreceiptRepository.save(entity);
        return ImportreceiptDTO.fromEntity(saved);
    }

    public ImportreceiptDTO update(Long id, ImportreceiptDTO dto) {
        if (!importreceiptRepository.existsById(id)) {
            return null;
        }
        Importreceipt entity = dto.toEntity();
        Importreceipt saved = importreceiptRepository.save(entity);
        return ImportreceiptDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        importreceiptRepository.deleteById(id);
    }
}
