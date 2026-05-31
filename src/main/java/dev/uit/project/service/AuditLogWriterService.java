package dev.uit.project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import dev.uit.project.dto.AuditLogDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Slf4j
@Service
public class AuditLogWriterService {

    private static final String LOG_PATH = "/app/logs/audit.log";
    private final ObjectMapper objectMapper;

    public AuditLogWriterService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public synchronized void writeLog(AuditLogDto logDto) {
        try {
            log.info("Attempting to write audit log to file: {}", LOG_PATH);
            
            Path path = Paths.get(LOG_PATH);
            Path parentDir = path.getParent();
            if (parentDir != null && !Files.exists(parentDir)) {
                Files.createDirectories(parentDir);
            }

            String jsonLine = objectMapper.writeValueAsString(logDto) + System.lineSeparator();
            Files.write(
                path, 
                jsonLine.getBytes(StandardCharsets.UTF_8), 
                StandardOpenOption.CREATE, 
                StandardOpenOption.APPEND
            );
            
            log.info("Successfully wrote audit log to file.");
        } catch (IOException e) {
            log.error("LỖI GHI FILE: ", e);
        }
    }
}
