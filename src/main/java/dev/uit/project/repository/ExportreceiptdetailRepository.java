package dev.uit.project.repository;

import dev.uit.project.entity.Exportreceiptdetail;
import dev.uit.project.entity.ExportreceiptdetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExportreceiptdetailRepository extends JpaRepository<Exportreceiptdetail, ExportreceiptdetailId> {
}
