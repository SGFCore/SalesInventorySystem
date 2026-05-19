package dev.uit.project.repository;

import dev.uit.project.entity.Requestform;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestFormRepository extends JpaRepository<Requestform, Long> {
}
