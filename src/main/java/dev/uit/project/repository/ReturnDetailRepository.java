package dev.uit.project.repository;

import dev.uit.project.entity.Returndetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ReturnDetailRepository extends JpaRepository<Returndetail, Long> {

}
