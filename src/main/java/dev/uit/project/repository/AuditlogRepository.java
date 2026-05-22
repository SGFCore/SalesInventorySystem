package dev.uit.project.repository;

import dev.uit.project.entity.Auditlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditlogRepository extends JpaRepository<Auditlog, Long> {
    
    List<Auditlog> findByTablename(String tablename);
    
    List<Auditlog> findByEmployeeid(Long employeeid);
    
    @Query("SELECT a FROM Auditlog a WHERE a.tablename = :tablename AND a.timestamp BETWEEN :startDate AND :endDate ORDER BY a.timestamp DESC")
    List<Auditlog> findByTablenameAndDateRange(@Param("tablename") String tablename, 
                                                @Param("startDate") LocalDateTime startDate,
                                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a FROM Auditlog a WHERE a.timestamp BETWEEN :startDate AND :endDate ORDER BY a.timestamp DESC")
    List<Auditlog> findByDateRange(@Param("startDate") LocalDateTime startDate, 
                                    @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a FROM Auditlog a WHERE a.affectedid = :affectedId AND a.tablename = :tablename ORDER BY a.timestamp DESC")
    List<Auditlog> findByAffectedIdAndTablename(@Param("affectedId") Long affectedId,
                                                  @Param("tablename") String tablename);
}
