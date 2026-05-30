package dev.uit.project.repository;

import dev.uit.project.entity.Invoicedetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoicedetailRepository extends JpaRepository<Invoicedetail, Long> {
    java.util.List<Invoicedetail> findByInvoiceid_Id(Long invoiceId);
}
