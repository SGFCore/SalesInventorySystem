package dev.uit.project.repository;

import dev.uit.project.entity.Listdiscount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListdiscountRepository extends JpaRepository<Listdiscount, Long> {
}
