package dev.uit.project.repository;

import dev.uit.project.entity.Detailinventory;
import dev.uit.project.entity.DetailinventoryId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailinventoryRepository extends JpaRepository<Detailinventory, DetailinventoryId> {
}
