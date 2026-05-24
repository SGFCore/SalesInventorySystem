package dev.uit.project.service;

import dev.uit.project.dto.NotificationDTO;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Notification;
import dev.uit.project.entity.Product;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.NotificationRepository;
import dev.uit.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final EmployeeRepository employeeRepository;
    private final ProductRepository productRepository;

    public List<NotificationDTO> list() {
        return notificationRepository.findAll()
                .stream()
                .map(NotificationDTO::fromEntity)
                .toList();
    }

    public NotificationDTO get(Long id) {
        return notificationRepository.findById(id)
                .map(NotificationDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Notification not found: " + id));
    }

    public NotificationDTO create(NotificationDTO dto) {
        Notification entity = convertToEntity(dto);
        Notification saved = notificationRepository.save(entity);
        return NotificationDTO.fromEntity(saved);
    }

    public NotificationDTO update(Long id, NotificationDTO dto) {
        Notification existing = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found: " + id));

        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            existing.setEmployeeid(emp);
        } else {
            existing.setEmployeeid(null);
        }
        if (dto.getProductId() != null) {
            Product prod = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductId()));
            existing.setProductid(prod);
        } else {
            existing.setProductid(null);
        }

        existing.setTitle(dto.getTitle());
        existing.setMessage(dto.getMessage());
        existing.setType(dto.getType());
        existing.setStatus((dto.getStatus() != null && dto.getStatus() == 1) ? 1 : 0);
        existing.setCreateddate(dto.getCreateddate());

        Notification updated = notificationRepository.save(existing);
        return NotificationDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!notificationRepository.existsById(id)) {
            throw new RuntimeException("Notification not found: " + id);
        }
        notificationRepository.deleteById(id);
    }

    private Notification convertToEntity(NotificationDTO dto) {
        Notification entity = new Notification();
        if (dto.getEmployeeId() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeId())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeId()));
            entity.setEmployeeid(emp);
        }
        if (dto.getProductId() != null) {
            Product prod = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductId()));
            entity.setProductid(prod);
        }
        entity.setTitle(dto.getTitle());
        entity.setMessage(dto.getMessage());
        entity.setType(dto.getType());
        entity.setStatus((dto.getStatus() != null && dto.getStatus() == 1) ? 1 : 0);
        entity.setCreateddate(dto.getCreateddate());
        return entity;
    }
}
