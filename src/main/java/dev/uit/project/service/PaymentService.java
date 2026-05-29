package dev.uit.project.service;

import dev.uit.project.dto.PaymentDTO;
import dev.uit.project.entity.Invoice;
import dev.uit.project.entity.Payment;
import dev.uit.project.entity.Paymentmethod;
import dev.uit.project.repository.InvoiceRepository;
import dev.uit.project.repository.PaymentMethodRepository;
import dev.uit.project.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    public List<PaymentDTO> list() {
        return paymentRepository.findAll()
                .stream()
                .map(PaymentDTO::fromEntity)
                .toList();
    }

    public PaymentDTO get(Long id) {
        return paymentRepository.findById(id)
                .map(PaymentDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + id));
    }

    public PaymentDTO create(PaymentDTO dto) {
        Payment entity = convertToEntity(dto);
        Payment saved = paymentRepository.save(entity);
        return PaymentDTO.fromEntity(saved);
    }

    public PaymentDTO update(Long id, PaymentDTO dto) {
        Payment existing = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + id));

        if (dto.getInvoiceId() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceId()));
            existing.setInvoiceid(inv);
        } else {
            existing.setInvoiceid(null);
        }
        if (dto.getPaymentMethodId() != null) {
            Paymentmethod pm = paymentMethodRepository.findById(dto.getPaymentMethodId())
                    .orElseThrow(() -> new RuntimeException("PaymentMethod not found: " + dto.getPaymentMethodId()));
            existing.setPaymentmethodid(pm);
        } else {
            existing.setPaymentmethodid(null);
        }

        existing.setAmountpaid(dto.getAmountPaid());
        existing.setReferencecode(dto.getReferenceCode());
        existing.setPaymentdate(dto.getPaymentDate());

        Payment updated = paymentRepository.save(existing);
        return PaymentDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new RuntimeException("Payment not found: " + id);
        }
        paymentRepository.deleteById(id);
    }

    private Payment convertToEntity(PaymentDTO dto) {
        Payment entity = new Payment();
        if (dto.getInvoiceId() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceId()));
            entity.setInvoiceid(inv);
        }
        if (dto.getPaymentMethodId() != null) {
            Paymentmethod pm = paymentMethodRepository.findById(dto.getPaymentMethodId())
                    .orElseThrow(() -> new RuntimeException("PaymentMethod not found: " + dto.getPaymentMethodId()));
            entity.setPaymentmethodid(pm);
        }
        entity.setAmountpaid(dto.getAmountPaid());
        entity.setReferencecode(dto.getReferenceCode());
        entity.setPaymentdate(dto.getPaymentDate());
        return entity;
    }

    public void recordPayment(java.util.Map<String, Object> payload) {
        Long invoiceId = Long.valueOf(payload.get("invoiceId").toString());
        Long paymentMethodId = Long.valueOf(payload.get("paymentMethodId").toString());
        java.math.BigDecimal amountPaid = new java.math.BigDecimal(payload.get("amountPaid").toString());
        String referenceCode = payload.get("referenceCode") != null ? payload.get("referenceCode").toString() : null;
        java.time.LocalDateTime paymentDate = payload.get("paymentDate") != null ? 
            java.time.LocalDate.parse(payload.get("paymentDate").toString()).atStartOfDay() : 
            java.time.LocalDateTime.now();

        if (amountPaid.compareTo(java.math.BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Số tiền thanh toán phải lớn hơn 0");
        }

        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hóa đơn"));
        Paymentmethod pm = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Phương thức thanh toán không hợp lệ"));

        Payment payment = new Payment();
        payment.setInvoiceid(invoice);
        payment.setPaymentmethodid(pm);
        payment.setAmountpaid(amountPaid);
        payment.setReferencecode(referenceCode);
        payment.setPaymentdate(paymentDate);
        paymentRepository.save(payment);

        // Tính tổng đã thanh toán
        java.math.BigDecimal totalPaid = paymentRepository.findAll().stream()
                .filter(p -> p.getInvoiceid().getId().equals(invoiceId))
                .map(Payment::getAmountpaid)
                .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);

        if (invoice.getFinalamount() != null && totalPaid.compareTo(invoice.getFinalamount()) >= 0) {
            invoice.setStatus("Đã thanh toán");
        } else {
            invoice.setStatus("Thanh toán một phần");
        }
        invoiceRepository.save(invoice);
    }
}
