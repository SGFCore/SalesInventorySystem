package dev.uit.project.service;

import dev.uit.project.dto.InvoiceDTO;
import dev.uit.project.entity.Customer;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Invoice;
import dev.uit.project.repository.CustomerRepository;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;

    public List<InvoiceDTO> list() {
        return invoiceRepository.findAll()
                .stream()
                .map(InvoiceDTO::fromEntity)
                .toList();
    }

    public InvoiceDTO get(Long id) {
        return invoiceRepository.findById(id)
                .map(InvoiceDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + id));
    }

    public InvoiceDTO create(InvoiceDTO dto) {
        Invoice entity = convertToEntity(dto);
        Invoice saved = invoiceRepository.save(entity);
        return InvoiceDTO.fromEntity(saved);
    }

    public InvoiceDTO update(Long id, InvoiceDTO dto) {
        Invoice existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + id));

        if (dto.getCustomerid() != null) {
            Customer cust = customerRepository.findById(dto.getCustomerid())
                    .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerid()));
            existing.setCustomerid(cust);
        } else {
            existing.setCustomerid(null);
        }
        if (dto.getEmployeeid() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeid())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeid()));
            existing.setEmployeeid(emp);
        } else {
            existing.setEmployeeid(null);
        }

        existing.setSalechannelcode(dto.getSalechannelcode());
        existing.setTotalamount(dto.getTotalamount());
        existing.setTaxamount(dto.getTaxamount());
        existing.setFinalamount(dto.getFinalamount());
        existing.setStatus(dto.getStatus());
        existing.setInvoicedate(dto.getInvoicedate());

        Invoice updated = invoiceRepository.save(existing);
        return InvoiceDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new RuntimeException("Invoice not found: " + id);
        }
        invoiceRepository.deleteById(id);
    }

    private Invoice convertToEntity(InvoiceDTO dto) {
        Invoice entity = new Invoice();
        if (dto.getCustomerid() != null) {
            Customer cust = customerRepository.findById(dto.getCustomerid())
                    .orElseThrow(() -> new RuntimeException("Customer not found: " + dto.getCustomerid()));
            entity.setCustomerid(cust);
        }
        if (dto.getEmployeeid() != null) {
            Employee emp = employeeRepository.findById(dto.getEmployeeid())
                    .orElseThrow(() -> new RuntimeException("Employee not found: " + dto.getEmployeeid()));
            entity.setEmployeeid(emp);
        }
        entity.setSalechannelcode(dto.getSalechannelcode());
        entity.setTotalamount(dto.getTotalamount());
        entity.setTaxamount(dto.getTaxamount());
        entity.setFinalamount(dto.getFinalamount());
        entity.setStatus(dto.getStatus());
        entity.setInvoicedate(dto.getInvoicedate());
        return entity;
    }

    @org.springframework.beans.factory.annotation.Autowired
    private dev.uit.project.repository.InvoicedetailRepository invoiceDetailRepository;
    @org.springframework.beans.factory.annotation.Autowired
    private InvoicePdfService invoicePdfService;

    public java.io.ByteArrayOutputStream generateInvoicePdf(Long invoiceId, java.util.Map<String, String> vatInfo) throws com.itextpdf.text.DocumentException {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceId));
        List<dev.uit.project.entity.Invoicedetail> details = invoiceDetailRepository.findAll().stream()
                .filter(d -> d.getInvoiceid().getId().equals(invoiceId))
                .toList();
        return invoicePdfService.generateInvoicePdf(invoice, details, vatInfo);
    }

    public List<InvoiceDTO> getPendingInvoices() {
        return invoiceRepository.findAll().stream()
                .filter(i -> "Chờ thanh toán".equals(i.getStatus()) || "Thanh toán một phần".equals(i.getStatus()) || "Thanh toán 1 phần".equals(i.getStatus()))
                .map(InvoiceDTO::fromEntity)
                .toList();
    }
}
