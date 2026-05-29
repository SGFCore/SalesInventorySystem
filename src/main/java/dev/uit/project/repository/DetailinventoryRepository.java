package dev.uit.project.repository;

import dev.uit.project.entity.Detailinventory;
import dev.uit.project.entity.DetailinventoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DetailinventoryRepository extends JpaRepository<Detailinventory, DetailinventoryId> {
    @Query("SELECT di FROM Detailinventory di WHERE (:warehouseId IS NULL OR di.id.warehouseid = :warehouseId) AND (:productId IS NULL OR di.id.productid = :productId)")
    List<Detailinventory> findWithFilters(@Param("warehouseId") Long warehouseId, @Param("productId") Long productId);
}
