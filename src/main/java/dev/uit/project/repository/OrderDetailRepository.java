package dev.uit.project.repository;

import dev.uit.project.entity.Orderdetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<Orderdetail, Long> {
}
