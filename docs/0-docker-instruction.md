**Lưu ý**:

- Trước khi chạy các lệnh này phải tải và mở **Docker Desktop**.
- Lệnh này có thể được chạy ở bất kỳ đâu.

# Các lệnh sử dụng

### Docker network

**Tạo Docker network** (chỉ chạy ở lần đầu tiên):

```sh
docker network create sgf-network
```

**Xóa Docker network**:

```sh
docker network rm sgf-network
```

### Database

**Run container**:

Lưu ý: Phải đổi path trước khi chạy lệnh này:

- Đường dẫn tuyệt đối (Path): D:\UNI DOCS\SalesInventorySystem\database.
- Hướng dẫn lấy path:
  - Right click vào folder `/database/` và chọn `Copy Path`.
  - Vào file này, gõ `Ctrl H` để thay thế path bên trên thành path bạn đã copy.

**Xóa database**:

```sh
docker rm -f sgf-db
docker volume rm sgf-data
```

**Chạy container**:

```sh
docker run --name sgf-db --network sgf-network -p 1521:1521 -e ORACLE_PASSWORD=Admin123 -v sgf-data:/opt/oracle/oradata -v "C:\Users\24521\Downloads\SalesInventorySystem\database:/docker-entrypoint-initdb.d" --health-cmd="healthcheck.sh" gvenzl/oracle-free:23-slim
```

f.write("ALTER SESSION SET CONTAINER = FREEPDB1;\nALTER SESSION SET CURRENT_SCHEMA = sgf_admin;\n")

Vào terminal:

```sh
docker exec -it sgf-db sqlplus sgf_admin/Admin123@FREEPDB1
```

**Lưu ý**:

- Không được thêm / sửa / xóa cấu trúc database bằng phần mềm.
- _Thêm / sửa / xóa cấu trúc database phải thông qua folder `database/` và Docker_.

### Backend

**Xóa container**:

```sh
docker rm -f sgf-backend
```

**Build container** (chỉ chạy ở lần đầu tiên):

```sh
docker build -t sgf-backend .
```

**Run container**:

```sh
docker run -it --name sgf-backend --network sgf-network -p 8080:8080 sgf-backend
```

Vào terminal:

```sh
docker exec -it sgf-backend bash
```

# Lập trình backend trong container

1 - Tải extension **Dev containers**.

2 - Nhấn `Ctrl` `Shift` `P` -> Gõ `Dev Containers: Attach to Running Container` -> Chọn `sgf-backend`.

3 - Di chuyển đến folder `app/`.

# Kết nối database trong container

Sử dụng bất kỳ phần mềm nào cũng được, ở đây hướng dẫn dùng extension **SQL Developer**.

1 - Tải extension SQL Developer.
2 - Điền thông tin cài đặt ở phần [`/docs/database-instruction.md`](/docs/database-instruction.md).
