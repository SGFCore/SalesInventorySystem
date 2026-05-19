package dev.uit.project.service;

import dev.uit.project.dto.InvoicedetailDTO;
import dev.uit.project.entity.Combo;
import dev.uit.project.entity.Invoice;
import dev.uit.project.entity.Invoicedetail;
import dev.uit.project.entity.Product;
import dev.uit.project.repository.ComboRepository;
import dev.uit.project.repository.InvoiceRepository;
import dev.uit.project.repository.InvoicedetailRepository;
import dev.uit.project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoicedetailService {

    private final InvoicedetailRepository invoicedetailRepository;
    private final InvoiceRepository invoiceRepository;
    private final ProductRepository productRepository;
    private final ComboRepository comboRepository;

    public List<InvoicedetailDTO> list() {
        return invoicedetailRepository.findAll()
                .stream()
                .map(InvoicedetailDTO::fromEntity)
                .toList();
    }

    public InvoicedetailDTO get(Long id) {
        return invoicedetailRepository.findById(id)
                .map(InvoicedetailDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Invoice detail not found: " + id));
    }

    public InvoicedetailDTO create(InvoicedetailDTO dto) {
        Invoicedetail entity = convertToEntity(dto);
        Invoicedetail saved = invoicedetailRepository.save(entity);
        return InvoicedetailDTO.fromEntity(saved);
    }

    public InvoicedetailDTO update(Long id, InvoicedetailDTO dto) {
        Invoicedetail existing = invoicedetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice detail not found: " + id));

        if (dto.getInvoiceid() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceid())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceid()));
            existing.setInvoiceid(inv);
        }
        if (dto.getProductid() != null) {
            Product prod = productRepository.findById(dto.getProductid())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductid()));
            existing.setProductid(prod);
        } else {
            existing.setProductid(null);
        }
        if (dto.getComboid() != null) {
            Combo combo = comboRepository.findById(dto.getComboid())
                    .orElseThrow(() -> new RuntimeException("Combo not found: " + dto.getComboid()));
            existing.setComboid(combo);
        } else {
            existing.setComboid(null);
        }

        existing.setQuantity(dto.getQuantity());
        existing.setUnitprice(dto.getUnitprice());
        existing.setDiscountamount(dto.getDiscountamount());
        existing.setTotalamount(dto.getTotalamount());

        Invoicedetail updated = invoicedetailRepository.save(existing);
        return InvoicedetailDTO.fromEntity(updated);
    }

    public void delete(Long id) {
        if (!invoicedetailRepository.existsById(id)) {
            throw new RuntimeException("Invoice detail not found: " + id);
        }
        invoicedetailRepository.deleteById(id);
    }

    private Invoicedetail convertToEntity(InvoicedetailDTO dto) {
        Invoicedetail entity = new Invoicedetail();
        if (dto.getInvoiceid() != null) {
            Invoice inv = invoiceRepository.findById(dto.getInvoiceid())
                    .orElseThrow(() -> new RuntimeException("Invoice not found: " + dto.getInvoiceid()));
            entity.setInvoiceid(inv);
        }
        if (dto.getProductid() != null) {
            Product prod = productRepository.findById(dto.getProductid())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + dto.getProductid()));
            entity.setProductid(prod);
        }
        if (dto.getComboid() != null) {
            Combo combo = comboRepository.findById(dto.getComboid())
                    .orElseThrow(() -> new RuntimeException("Combo not found: " + dto.getComboid()));
            entity.setComboid(combo);
        }
        entity.setQuantity(dto.getQuantity());
        entity.setUnitprice(dto.getUnitprice());
        entity.setDiscountamount(dto.getDiscountamount());
        entity.setTotalamount(dto.getTotalamount());
        return entity;
    }
}
