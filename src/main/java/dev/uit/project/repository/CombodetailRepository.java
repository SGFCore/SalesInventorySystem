package dev.uit.project.repository;

import dev.uit.project.entity.Combodetail;
import dev.uit.project.entity.CombodetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CombodetailRepository extends JpaRepository<Combodetail, CombodetailId> {
}