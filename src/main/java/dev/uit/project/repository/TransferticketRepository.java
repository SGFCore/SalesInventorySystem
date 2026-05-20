package dev.uit.project.repository;

import dev.uit.project.entity.Transferticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferticketRepository extends JpaRepository<Transferticket, Long> {
}
