package dev.uit.project.repository;

import dev.uit.project.entity.Countsheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountsheetRepository extends JpaRepository<Countsheet, Long> {
}
