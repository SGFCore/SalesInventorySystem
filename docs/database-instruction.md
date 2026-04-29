# Hướng dẫn cài đặt và sử dụng database

### Thông tin cơ bản

- Container name: `sgf-db`:
- Port: `1521` (dùng để kết nối với database).
- Volume: `sgf-data`.
- Hostname: `localhost`.
- PDB (Service name): `FREEPDB1`.

Cả bên trong và bên ngoài container đều dùng chung port.

**Các table đều được tạo trong schema sau**:

- Username: `admin`.
- Password: `Admin123`.

### Hướng dẫn sử dụng

**Yêu cầu cài đặt các phần mềm sau vào máy**: Docker Desktop.

**Lưu ý**:

1 - Trước khi dùng phải **kích hoạt Docker engine** (mở Docker Desktop).

2 - Đường dẫn thư mục chứa các file `.sql` khởi tạo: `D:\UNI DOCS\SalesInventorySystem\database` _(các bạn sửa lại cho đúng với đường dẫn trong máy mình)_.

- Các file phải được sắp xếp từ trước theo thứ tự từ điển.
- Các file chỉ được khởi chạy khi không volume `sgf-data`.
- Ở đầu file đều phải chuyển user và PDB đúng như cấu hình trên: `ALTER SESSION SET CONTAINER = FREEPDB1; ALTER SESSION SET CURRENT_SCHEMA = admin;`.
- Các lệnh sau đây có thể được chạy ở bất kỳ folder nào.

##### Tạo và chạy container

_(các bạn sửa lại cho đúng với đường dẫn trong máy mình)_

```sh
docker run --name sgf-db -p 1521:1521 -e ORACLE_PASSWORD=Admin123 -v sgf-data:/opt/oracle/oradata -v "D:\UNI DOCS\SalesInventorySystem\database":/docker-entrypoint-initdb.d --health-cmd="healthcheck.sh" gvenzl/oracle-free:23-slim
```

Database đã khởi tạo xong sẽ thấy thông báo: `DATABASE IS READY TO USE!` (_Chú ý xem log xem có failed ở lệnh nào không, nếu có thì xóa và cài lại từ đầu_).

##### Xóa container và volume

```sh
docker rm -f sgf-db
docker volume rm sgf-data
```

##### Truy cập vào database

Sử dụng bất kỳ phần mềm nào đều được.
**Lưu ý** không được thêm / sửa / xóa cấu trúc database bằng phần mềm. _Thêm / sửa / xóa cấu trúc database phải thông qua folder `database/` và Docker_.

Hướng dẫn truy cập database bằng VS Code Extension **SQL Developer**:

1. Tải extension SQL Developer.
2. Điền thông tin cài đặt ở phần `Thông tin cơ bản`.
