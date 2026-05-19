package dev.uit.project.service;

import dev.uit.project.dto.PaymentMethodDTO;
import dev.uit.project.entity.Paymentmethod;
import dev.uit.project.repository.PaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethodDTO> list() {
        return paymentMethodRepository.findAll()
                .stream()
                .map(PaymentMethodDTO::fromEntity)
                .toList();
    }

    public PaymentMethodDTO get(Long id) {
        return paymentMethodRepository.findById(id)
                .map(PaymentMethodDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("PaymentMethod not found: " + id));
    }

    public PaymentMethodDTO create(PaymentMethodDTO dto) {
        Paymentmethod entity = convertToEntity(dto);
        Paymentmethod saved = paymentMethodRepository.save(entity);
        return PaymentMethodDTO.fromEntity(saved);
    }

    public PaymentMethodDTO update(Long id, PaymentMethodDTO dto) {
        Paymentmethod existing = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PaymentMethod not found: " + id));

        existing.setPaymentname(dto.getPaymentname());
        existing.setStatus(dto.getStatus());

        Paymentmethod updated = paymentMethodRepository.save(existing);
        return PaymentMethodDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!paymentMethodRepository.existsById(id)) {
            throw new RuntimeException("PaymentMethod not found: " + id);
        }
        paymentMethodRepository.deleteById(id);
    }

    private Paymentmethod convertToEntity(PaymentMethodDTO dto) {
        Paymentmethod entity = new Paymentmethod();
        entity.setPaymentname(dto.getPaymentname());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
