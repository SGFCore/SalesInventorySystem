package dev.uit.project.service;

import dev.uit.project.entity.Auditlog;
import dev.uit.project.entity.Employee;
import dev.uit.project.repository.AuditlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditlogService {
    
    @Autowired
    private AuditlogRepository auditlogRepository;
    
    public Auditlog save(Auditlog auditlog) {
        return auditlogRepository.save(auditlog);
    }
    
    public Auditlog createAuditLog(String tableName, Employee employee, String action, 
                                   String oldValue, String newValue, Long affectedId) {
        Auditlog auditlog = new Auditlog();
        auditlog.setTablename(tableName);
        auditlog.setEmployeeid(employee);
        auditlog.setAction(action);
        auditlog.setOldvalue(oldValue);
        auditlog.setNewvalue(newValue);
        auditlog.setAffectedid(affectedId);
        auditlog.setTimestamp(LocalDateTime.now());
        
        return auditlogRepository.save(auditlog);
    }
    
    public List<Auditlog> findByTablename(String tablename) {
        return auditlogRepository.findByTablename(tablename);
    }
    
    public List<Auditlog> findByEmployeeid(Long employeeid) {
        return auditlogRepository.findByEmployeeid(employeeid);
    }
    
    public List<Auditlog> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return auditlogRepository.findByDateRange(startDate, endDate);
    }
    
    public List<Auditlog> findByTablenameAndDateRange(String tablename, LocalDateTime startDate, LocalDateTime endDate) {
        return auditlogRepository.findByTablenameAndDateRange(tablename, startDate, endDate);
    }
    
    public List<Auditlog> findByAffectedIdAndTablename(Long affectedId, String tablename) {
        return auditlogRepository.findByAffectedIdAndTablename(affectedId, tablename);
    }
    
    public Auditlog findById(Long id) {
        return auditlogRepository.findById(id).orElse(null);
    }
}

