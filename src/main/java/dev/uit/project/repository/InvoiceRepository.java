package dev.uit.project.repository;

import dev.uit.project.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByInvoicedateBetween(LocalDate start, LocalDate end);
}
