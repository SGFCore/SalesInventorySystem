# SGF Management System – Backend & Frontend

**Đề tài:** Hệ thống quản lý bán hàng và kho hàng SGF  
**Kiến trúc:** Oracle Database · Java Spring Boot Backend · React/Vite Frontend  

| Thành phần | Công nghệ chính |
|---|---|
| Backend | Java 17+, Spring Boot 3.x, Spring Data JPA, Spring Security, JWT (tuỳ chọn), WebSocket |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Axios, Recharts, Radix UI, Lucide React |
| Database | Oracle 19c (FREEPDB1) |
| Container | Docker (tuỳ chọn cho Oracle và Backend) |

---

## Mục lục

1. [Giới thiệu đồ án](#giới-thiệu-đồ-án)
2. [Cấu trúc](#cấu-trúc)
3. [Công nghệ và công cụ sử dụng](#công-nghệ-và-công-cụ-sử-dụng)
4. [Yêu cầu môi trường](#yêu-cầu-môi-trường)
5. [Hướng dẫn cài đặt và chạy dự án](#hướng-dẫn-cài-đặt-và-chạy-dự-án)
6. [Tài khoản mặc định (seed)](#tài-khoản-mặc-định-seed)
7. [Kiểm thử hệ thống](#kiểm-thử-hệ-thống)
8. [Tài liệu phát triển](#tài-liệu-phát-triển)

---

## Giới thiệu đồ án

Hệ thống SGF Management là giải pháp ERP dành cho doanh nghiệp bán lẻ và quản lý kho hàng, hỗ trợ các nghiệp vụ:

| Phân hệ | Vai trò chính |
|---|---|
| Quản trị / Nhân viên | Quản lý nhân viên, phân quyền, thông báo |
| Sản phẩm & Danh mục | Quản lý sản phẩm, danh mục, loại sản phẩm, combo |
| Kho hàng | Quản lý kho, tồn kho, nhập/xuất/kiểm kê, đề xuất bổ sung, phiếu chuyển kho |
| Bán hàng đa kênh | Đơn hàng tại quầy, đơn hàng trực tuyến, hóa đơn, thanh toán |
| Khách hàng & Đối tác | Quản lý khách hàng, nhóm khách hàng, đối tác vận chuyển |
| Chính sách & Khuyến mãi | Quản lý mã giảm giá, chính sách đổi trả, hoàn tiền |
| Báo cáo | Báo cáo doanh thu (biểu đồ), báo cáo xuất nhập tồn, xuất PDF/Excel |

Backend cung cấp REST API, frontend gồm một giao diện thống nhất (phân quyền theo vai trò: quản lý, thủ kho, nhân viên bán hàng, kế toán). Hệ thống sử dụng WebSocket để thông báo real-time cảnh báo tồn kho thấp.

---

## Cấu trúc

```text
sgf-management/
├── backend/                  # Backend Java Spring Boot
│   ├── src/main/java/dev/uit/project/
│   │   ├── config/           # Cấu hình CORS, Security, WebSocket
│   │   ├── controller/       # REST Controllers
│   │   ├── service/          # Business logic
│   │   ├── repository/       # JPA Repositories
│   │   ├── entity/           # JPA Entities
│   │   └── dto/              # DTOs
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml               # Maven dependencies
├── frontend/                 # React frontend (single app)
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Auth, Emp, Notification, Dashboard)
│   │   ├── lib/              # API client, types, utils
│   │   └── hooks/            # Custom hooks
│   ├── package.json
│   └── vite.config.ts
├── database-scripts/         # Scripts Oracle
│   ├── 0-create-user.sql
│   ├── 1-schema.sql
│   ├── 2-triggers.sql
│   └── 3-sample_data.sql
└── docker/                   # Dockerfile cho backend, docker-compose (tuỳ chọn)
```

---

## Công nghệ và công cụ sử dụng

### Backend

| Nhóm | Công nghệ |
|---|---|
| Ngôn ngữ | Java 17+ |
| Framework | Spring Boot 3.x |
| ORM | Hibernate (Spring Data JPA) |
| Database | Oracle 19c (FREEPDB1) |
| Security | Spring Security (JWT tuỳ chọn, hiện tại permitAll) |
| WebSocket | Spring WebSocket + STOMP |
| Build tool | Maven |

### Frontend

| Ứng dụng | Công nghệ chính |
|---|---|
| `frontend` (single SPA) | React 19, TypeScript, Vite, Tailwind CSS, Axios, React Router, Recharts, Radix UI, Lucide React |

### Công cụ phát triển

| Công cụ | Mục đích |
|---|---|
| IntelliJ IDEA / VS Code | IDE |
| Docker Desktop | Chạy Oracle database (hoặc cài native) |
| Maven | Build backend |
| Node.js + npm | Chạy frontend |
| Oracle SQL Developer / DBeaver | Quản trị database |

---

## Yêu cầu môi trường

| Thành phần | Phiên bản / ghi chú |
|---|---|
| Java JDK | 17 trở lên |
| Maven | 3.8+ |
| Node.js | 20 trở lên |
| Oracle Database | 19c (hoặc Oracle XE) – khuyến nghị chạy qua Docker |
| Port backend | `8080` (có thể đổi trong `application.properties`) |
| Port frontend | Vite mặc định `5173` |

Cấu hình CORS đã được mở cho phép mọi nguồn (phát triển). Backend mặc định chạy với context path `/api`.

---

## Hướng dẫn cài đặt và chạy dự án

### 1. Cài đặt Oracle Database (Docker)

Sử dụng image Oracle Database 19c Express Edition (FREEPDB1). Ví dụ:

```bash
docker run -d --name oracle-sgf -p 1521:1521 -e ORACLE_PWD=Admin123 gvenzl/oracle-xe
```

Sau đó kết nối với user `system` và chạy các script trong thư mục `database-scripts/` theo thứ tự:

1. `0-create-user.sql` – tạo user `sgf_admin`
2. `1-schema.sql` – tạo bảng, sequence
3. `2-triggers.sql` – tạo trigger
4. `3-sample_data.sql` – nạp dữ liệu mẫu

Bạn có thể dùng Oracle SQL Developer hoặc `sqlplus` để thực thi.

> **Lưu ý**: Script mặc định sử dụng service name `FREEPDB1`. Nếu dùng container khác, điều chỉnh tên service trong `application.properties`.

### 2. Cấu hình Backend

- Mở terminal, di chuyển vào thư mục `backend/`
- Copy `application.properties` mẫu (đã có sẵn) và chỉnh sửa thông tin kết nối database nếu cần:
  ```properties
  spring.datasource.url=jdbc:oracle:thin:@localhost:1521/FREEPDB1
  spring.datasource.username=sgf_admin
  spring.datasource.password=Admin123
  ```
- Build project:
  ```bash
  mvn clean install
  ```
- Chạy backend:
  ```bash
  mvn spring-boot:run
  ```
  Hoặc chạy file JAR sau khi build:
  ```bash
  java -jar target/project-0.0.1-SNAPSHOT.jar
  ```

Backend sẽ chạy tại `http://localhost:8080/api`.

### 3. Cài đặt và chạy Frontend

- Mở terminal mới, di chuyển vào `frontend/`
- Cài đặt dependencies:
  ```bash
  npm install
  ```
- Chạy dev server:
  ```bash
  npm run dev
  ```

Frontend sẽ chạy tại `http://localhost:5173`. Proxy được cấu hình để chuyển tiếp `/api` đến backend (cổng 8080).

---

## Tài khoản mặc định (seed)

Dữ liệu mẫu từ `3-sample_data.sql` cung cấp các tài khoản nhân viên:

| Vai trò | EmployeeID | Tên đăng nhập (số điện thoại) | Mật khẩu | Ghi chú |
|---|---|---|---|---|
| Quản lý | 1 | `0988444555` | `hashed_mgr` | Có quyền quản lý toàn bộ |
| Thủ kho | 2 | `0988111222` | `hashed_thukho` | Quyền nhập/xuất/kiểm kê |
| Nhân viên bán hàng | 3 | `0988555666` | `hashed_sale` | Quyền bán hàng, quản lý khách hàng |
| Kế toán | 4 | `0988333444` | `hashed_kt` | Quyền duyệt chi, báo cáo |

> **Lưu ý**: Mật khẩu trong seed là dạng plain text hoặc mã hoá BCrypt tuỳ theo cấu hình. Hệ thống hiện tại chưa yêu cầu mã hoá mạnh ở tầng demo, bạn có thể đăng nhập trực tiếp bằng số điện thoại và mật khẩu tương ứng.

Để đăng nhập, sử dụng giao diện `/signin` với `username` (số điện thoại) và `password`.

---

## Kiểm thử hệ thống

- **Backend**: Chạy các test với Maven:
  ```bash
  mvn test
  ```
- **Frontend**: Chưa có unit test, kiểm thử thủ công qua giao diện.

Các tình huống kiểm thử chính:
- Đăng nhập phân quyền (quản lý, thủ kho, nhân viên bán hàng, kế toán)
- CRUD sản phẩm, danh mục, loại sản phẩm, combo, khách hàng, kho hàng
- Tạo đơn hàng tại quầy và trực tuyến, cập nhật trạng thái vận chuyển
- Tạo phiếu nhập kho, kiểm kê, đề xuất bổ sung
- Xem báo cáo doanh thu dạng biểu đồ (Line/Bar chart)
- Xem và đánh dấu thông báo hệ thống

---

## Tài liệu phát triển

- Mô tả chi tiết API: [api-contract.md](docs/api-contract.md) (tự xây dựng từ code)
- Sơ đồ database: [database-schema.png](docs/database-schema.png)
- Hướng dẫn sử dụng: [user-guide.md](docs/user-guide.md)
- Báo cáo đồ án (PDF) bao gồm phân tích, thiết kế, kiến trúc, kết quả thử nghiệm
