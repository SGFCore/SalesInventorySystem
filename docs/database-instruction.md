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
