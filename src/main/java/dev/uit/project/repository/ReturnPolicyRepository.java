package dev.uit.project.repository;

import dev.uit.project.entities.ReturnPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ReturnPolicyRepository extends JpaRepository<ReturnPolicy, Long> {
}
