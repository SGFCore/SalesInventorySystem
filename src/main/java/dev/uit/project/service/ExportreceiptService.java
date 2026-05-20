package dev.uit.project.service;

import dev.uit.project.dto.ExportreceiptDTO;
import dev.uit.project.entity.Exportreceipt;
import dev.uit.project.repository.ExportreceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExportreceiptService {

    private final ExportreceiptRepository exportreceiptRepository;

    public List<ExportreceiptDTO> list() {
        return exportreceiptRepository.findAll().stream()
                .map(ExportreceiptDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ExportreceiptDTO get(Long id) {
        return exportreceiptRepository.findById(id)
                .map(ExportreceiptDTO::fromEntity)
                .orElse(null);
    }

    public ExportreceiptDTO create(ExportreceiptDTO dto) {
        Exportreceipt entity = dto.toEntity();
        Exportreceipt saved = exportreceiptRepository.save(entity);
        return ExportreceiptDTO.fromEntity(saved);
    }

    public ExportreceiptDTO update(Long id, ExportreceiptDTO dto) {
        if (!exportreceiptRepository.existsById(id)) {
            return null;
        }
        Exportreceipt entity = dto.toEntity();
        Exportreceipt saved = exportreceiptRepository.save(entity);
        return ExportreceiptDTO.fromEntity(saved);
    }

    public void delete(Long id) {
        exportreceiptRepository.deleteById(id);
    }
}
