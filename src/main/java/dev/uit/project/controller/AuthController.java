package dev.uit.project.controller;

import dev.uit.project.dto.EmployeeDTO;
import dev.uit.project.dto.RoleDTO;
import dev.uit.project.entity.Employee;
import dev.uit.project.entity.Employeerole;
import dev.uit.project.repository.EmployeeRepository;
import dev.uit.project.repository.EmployeeroleRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final EmployeeRepository employeeRepository;
    private final EmployeeroleRepository employeeroleRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginCredentials credentials) {
        if (credentials.getUsername() == null || credentials.getPassword() == null) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Tên đăng nhập và mật khẩu không được để trống"));
        }

        // Tìm nhân viên theo email hoặc số điện thoại
        Optional<Employee> empOpt = employeeRepository.findAll().stream()
                .filter(e -> credentials.getUsername().equalsIgnoreCase(e.getEmail()) || credentials.getUsername().equals(e.getPhone()))
                .findFirst();

        if (empOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Tài khoản không tồn tại"));
        }

        Employee employee = empOpt.get();

        // Kiểm tra mật khẩu (đối chiếu bằng password encoder)
        if (!credentials.getPassword().equals(employee.getPassword())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Mật khẩu không chính xác"));
        }

        // Kiểm tra trạng thái tài khoản (1 = Active, 0 = Inactive)
        if (employee.getStatus() != null && employee.getStatus() == 0) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Tài khoản đã bị ngưng hoạt động"));
        }

        // Lấy danh sách các vai trò của nhân viên
        List<RoleDTO> roles = employeeroleRepository.findAll().stream()
                .filter(er -> er.getEmployeeid() != null && er.getEmployeeid().getId().equals(employee.getId()))
                .map(er -> er.getRoleid() != null ? RoleDTO.fromEntity(er.getRoleid()) : null)
                .filter(r -> r != null)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new LoginResponse(EmployeeDTO.fromEntity(employee), roles));
    }

    @PostMapping("/signout")
    public ResponseEntity<Void> signout() {
        return ResponseEntity.ok().build();
    }

    @Data
    public static class LoginCredentials {
        private String username;
        private String password;
    }

    @Data
    public static class LoginResponse {
        private final EmployeeDTO employee;
        private final List<RoleDTO> roles;
    }

    @Data
    public static class ErrorResponse {
        private final String message;
    }
}
