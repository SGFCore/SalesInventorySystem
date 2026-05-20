package dev.uit.project.repository;

import dev.uit.project.entity.OrderReturn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderReturnRepository extends JpaRepository<OrderReturn, Long> {
}
