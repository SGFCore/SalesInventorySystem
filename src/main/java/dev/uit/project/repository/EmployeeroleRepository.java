package dev.uit.project.repository;

import dev.uit.project.entity.Employeerole;
import dev.uit.project.entity.EmployeeroleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeroleRepository extends JpaRepository<Employeerole, EmployeeroleId> {
}