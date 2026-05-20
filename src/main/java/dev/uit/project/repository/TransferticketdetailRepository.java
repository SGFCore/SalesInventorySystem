package dev.uit.project.repository;

import dev.uit.project.entity.Transferticketdetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferticketdetailRepository extends JpaRepository<Transferticketdetail, Long> {
}
