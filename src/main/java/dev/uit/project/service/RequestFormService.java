package dev.uit.project.service;

import dev.uit.project.dto.RequestFormDTO;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Requestform;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.RequestFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestFormService {

    private final RequestFormRepository requestFormRepository;
    private final EmployeeRepository employeeRepository;

    public List<RequestFormDTO> list() {
        return requestFormRepository.findAll()
                .stream()
                .map(RequestFormDTO::fromEntity)
                .toList();
    }

    public RequestFormDTO get(Long id) {
        return requestFormRepository.findById(id)
                .map(RequestFormDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("RequestForm not found: " + id));
    }

    public RequestFormDTO create(RequestFormDTO dto) {
        Requestform entity = convertToEntity(dto);
        Requestform saved = requestFormRepository.save(entity);
        return RequestFormDTO.fromEntity(saved);
    }

    public RequestFormDTO update(Long id, RequestFormDTO dto) {
        Requestform existing = requestFormRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RequestForm not found: " + id));

        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            existing.setEmployeeid(emp);
        } else {
            existing.setEmployeeid(null);
        }
        if (dto.getApproverId() != null) {
            Employee app = employeeRepository.findById(dto.getApproverId())
                    .orElseThrow(() -> new RuntimeException("Approver not found: " + dto.getApproverId()));
            existing.setApproverid(app);
        } else {
            existing.setApproverid(null);
        }

        existing.setCreateddate(dto.getCreateddate());
        existing.setStatus(dto.getStatus());
        existing.setRejectreason(dto.getRejectreason());

        Requestform updated = requestFormRepository.save(existing);
        return RequestFormDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!requestFormRepository.existsById(id)) {
            throw new RuntimeException("RequestForm not found: " + id);
        }
        requestFormRepository.deleteById(id);
    }

    private Requestform convertToEntity(RequestFormDTO dto) {
        Requestform entity = new Requestform();
        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            entity.setEmployeeid(emp);
        }
        if (dto.getApproverId() != null) {
            Employee app = employeeRepository.findById(dto.getApproverId())
                    .orElseThrow(() -> new RuntimeException("Approver not found: " + dto.getApproverId()));
            entity.setApproverid(app);
        }
        entity.setCreateddate(dto.getCreateddate());
        entity.setStatus(dto.getStatus());
        entity.setRejectreason(dto.getRejectreason());
        return entity;
    }
}
