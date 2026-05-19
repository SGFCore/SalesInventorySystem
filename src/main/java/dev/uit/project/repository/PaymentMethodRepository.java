package dev.uit.project.repository;

import dev.uit.project.entity.Paymentmethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<Paymentmethod, Long> {
}
