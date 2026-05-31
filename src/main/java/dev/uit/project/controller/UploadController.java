package dev.uit.project.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/uploads")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UploadController {

    @Value("${upload.path:uploads}")
    private String uploadPath;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vui lòng chọn file để tải lên"));
        }

        try {
            // Đảm bảo thư mục tồn tại (sử dụng đường dẫn tuyệt đối để tránh nhầm lẫn trong Docker/IDE)
            Path root = Paths.get(uploadPath).toAbsolutePath().normalize();
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            // Tạo tên file duy nhất tránh trùng lặp
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String newFilename = "feedback_" + UUID.randomUUID().toString() + extension;

            // Lưu file vật lý
            Path targetPath = root.resolve(newFilename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Trả về URL để hiển thị. 
            // Do context-path là /api và WebConfig map /uploads/**, URL sẽ là /api/uploads/filename
            String fileUrl = "/api/uploads/" + newFilename;

            System.out.println("DEBUG: File saved to " + targetPath);
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("message", "Lỗi server khi lưu file: " + e.getMessage()));
        }
    }
}
