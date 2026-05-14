package dev.uit.project.repository;

import dev.uit.project.entity.Producttype;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProducttypeRepository extends JpaRepository<Producttype, Long> {
}