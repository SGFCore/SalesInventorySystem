package dev.uit.project.repository;

import dev.uit.project.entity.Requestdetail;
import dev.uit.project.entity.RequestdetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestDetailRepository extends JpaRepository<Requestdetail, RequestdetailId> {
}
