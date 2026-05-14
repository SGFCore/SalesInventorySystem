package dev.uit.project.repository;

import dev.uit.project.entity.Shipcompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipcompanyRepository extends JpaRepository<Shipcompany, Long> {
}