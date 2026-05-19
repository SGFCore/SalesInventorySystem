package dev.uit.project.repository;

import dev.uit.project.entity.Importreceiptdetail;
import dev.uit.project.entity.ImportreceiptdetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImportreceiptdetailRepository extends JpaRepository<Importreceiptdetail, ImportreceiptdetailId> {
}
