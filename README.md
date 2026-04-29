# HỆ THỐNG QUẢN LÝ BÁN HÀNG VÀ KHO HÀNG VÌ CỘNG ĐỒNG

<div align="center">
    <img src="https://img.shields.io/badge/Spring%20Boot-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" />
    <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" />
    <img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white" />
    <img src="https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white" />
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</div>

Dự án Hệ thống Quản lý chuỗi cung ứng sản phẩm vì cộng đồng là một giải pháp số toàn diện nhằm tối ưu hóa quá trình quản lý chuỗi sản phẩm do người yếu thế tạo ra. Bao gồm các khâu quản lý nguyên vật liệu, sản xuất sản phẩm đến phân phối sản phẩm, giao dịch bán hàng, hạch toán tài chính,...

Các hệ thống hiện nay nhìn chung chỉ chú trọng ở khâu phân phối sản phẩm, vẫn còn nhiều hạn chế như chưa tối ưu trải nghiệm người dùng, thiếu tính minh bạch về thông tin và nguồn gốc của sản phẩm, cơ cấu quản lý có tính phân tán cao,...

**Những gì hệ thống mới sẽ đạt được**: Quản lý sản phẩm từ nhiều nguồn khác nhau một cách tập trung và thống nhất, tối ưu hóa trải nghiệm người dùng, đảm bảo tính minh bạch trong tất cả các khâu và thông tin và hệ thống cung cấp. Qua đó, nâng cao tính cạnh tranh và góp phần gia tăng niềm tin và hiệu quả hỗ trợ cộng đồng.

### Kiến trúc hệ thống

```mermaid
graph LR

fe[Frontend]

subgraph be[Backend]
    service[Services]
    controller[Controllers]
end

db[Database]

fe <-- "API, DTO" --> controller
controller <-- DTO --> service
service <-- "Entity, Repository" --> db
```

### Hướng dẫn sử dụng dự án

- [`/docs/backend-instruction.md`](/docs/backend-instruction.md): Hướng dẫn cài đặt và sử dụng _backend_.
- [`/docs/frontend-instruction.md`](/docs/frontend-instruction.md): Hướng dẫn cài đặt và sử dụng _frontend_.
- [`/docs/database-instruction.md`](/docs/database-instruction.md): Hướng dẫn cài đặt và sử dụng _database Docker_.
- [`/docs/rules.md`](/docs/rules.md): Các chuẩn chung khi sử dụng repository.
