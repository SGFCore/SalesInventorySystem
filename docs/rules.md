# Định dạng dữ liệu ngày / tháng (datetime)

- Tại client: `Date` `dd-MM-yyyy`.
- Tại server: `LocalDatetime` `yyyy-MM-dd`.
- Tại database: `TIMESTAMP` (không quan trọng định dạng).

# Cách sử dụng Github (không quan trọng lắm)

**Tải repo về máy**:

```sh
git clone https://github.com/SGFCore/SalesInventorySystem.git
```

**Thao tác mỗi lần code**:

```sh
# luôn pull trước
git pull origin main

# tạo branch
git checkout -b feature/<ten-feature>

# code
git add .
git commit -m "feat(module): mô tả"

# push
git push origin feature/<ten-feature>
```

**VD**: Cao Thái Bảo khi code giao diện của button:

```sh
git pull origin main
git checkout -b feature/button

# Code code code các kiểu ...
# Sau khi code xong thì gõ cái này

git add .
git commit -m "feature(frontend): Add Button"
git push origin feature/button
```
