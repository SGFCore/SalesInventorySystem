# Hướng dẫn cài đặt và sử dụng backend

### Thông tin cơ bản

**Công nghệ sử dụng**: spring-boot-starter-parent 4.0.2, itextpdf 5.5.13.3.

**Yêu cầu cài đặt các phần mềm sau vào máy**:

- Java JDK 21.
- Maven 3.8+.

**Số port**:

- Port trong container: `8080`.
- Port ngoài container: `8080`.

### Các lệnh

**(Các lệnh sau chạy ở thư mục gốc của dự án)**

**Tải dependencies** (chỉ chạy ở lần đầu tiên):

```bash
mvnw clean install
```

**Chạy server**:

```bash
mvn spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080/api**. Khi truy cập vào sẽ thấy thông báo `API is running`.

Nếu có thông báo `BUILD SUCCESS` thì đã lỗi.

**Tắt server**: Gửi abort `Ctrl` `C`.

### Cấu trúc backend

##### Kết nối database

- `src/main/resources/application.properties`: Cấu hình kết nối với database và một số cấu hình khác.
- `src/main/resources/fonts`: Chứa một số font chữ dùng để xuất file PDF.
- `src/main/java/dev/uit/project/controllers`: Chứa các class `@Controller`.
- `src/main/java/dev/uit/project/services`: Chứa các class `@Service`.
- `src/main/java/dev/uit/project/entities`: Chứa các class `@Entity`.
- `src/main/java/dev/uit/project/dtos`: Chứa các class DTO.
- `src/main/java/dev/uit/project/repositories`: Chứa các class `@Repository`.
