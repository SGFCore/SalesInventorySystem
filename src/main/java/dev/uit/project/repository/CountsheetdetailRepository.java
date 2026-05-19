package dev.uit.project.repository;

import dev.uit.project.entity.Countsheetdetail;
import dev.uit.project.entity.CountsheetdetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountsheetdetailRepository extends JpaRepository<Countsheetdetail, CountsheetdetailId> {
}
