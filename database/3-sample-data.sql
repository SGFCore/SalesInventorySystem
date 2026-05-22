-- INSERT DỮ LIỆU DEMO
-- =============================================
-- 1. CUSTOMERTYPE (4 dòng - tối đa với CHECK hiện tại)
-- =============================================
insert into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Bronze',
           0,
           N'Khách hàng thông thường',
           0 );
insert into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Silver',
           5,
           N'Khách hàng thân thiết',
           5000000 );
insert into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Gold',
           10,
           N'Khách hàng VIP',
           20000000 );
insert into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'VIP',
           15,
           N'Nhà hảo tâm / ủng hộ thường xuyên',
           50000000 );

----select * from customertype;
-- =============================================
-- 2. ROLE (4 dòng)
-- =============================================
insert into role (
   roleid,
   rolename
) values ( 1,
           N'Quản lý' );
insert into role (
   roleid,
   rolename
) values ( 2,
           N'Thủ kho' );
insert into role (
   roleid,
   rolename
) values ( 3,
           N'Nhân viên bán hàng' );
insert into role (
   roleid,
   rolename
) values ( 4,
           N'Kế toán' );

----select * from ROLE;
-- =============================================
-- 3. CATEGORY (8 dòng)
-- =============================================
insert into category ( categoryname ) values ( N'Túi xách / Ví' );
insert into category ( categoryname ) values ( N'Khẩu trang' );
insert into category ( categoryname ) values ( N'Xà phòng' );
insert into category ( categoryname ) values ( N'Nghệ thuật Napkin' );
insert into category ( categoryname ) values ( N'Miếng lót ly' );
insert into category ( categoryname ) values ( N'Quần jean' );
insert into category ( categoryname ) values ( N'Sản phẩm thêu' );
insert into category ( categoryname ) values ( N'Combo quà' );

----select * from CATEGORY;
-- =============================================
-- 4. EMPLOYEE (4 dòng)
-- =============================================
insert into employee (
   fullname,
   email,
   phone,
   password,
   status
) values ( N'Phạm Văn Quản Lý',
           'quanly.pham@sgf.vn',
           '0988444555',
           'hashed_mgr',
           1 );
insert into employee (
   fullname,
   email,
   phone,
   password,
   status
) values ( N'Nguyễn Thủ Kho',
           'thukho.nguyen@sgf.vn',
           '0988111222',
           'hashed_thukho',
           1 );
insert into employee (
   fullname,
   email,
   phone,
   password,
   status
) values ( N'Hoàng Thị Bán Hàng',
           'banhang.hoang@sgf.vn',
           '0988555666',
           'hashed_sale',
           1 );
insert into employee (
   fullname,
   email,
   phone,
   password,
   status
) values ( N'Lê Thị Kế Toán',
           'ketoan.le@sgf.vn',
           '0988333444',
           'hashed_kt',
           1 );
-- --select * from employee;

-- =============================================
-- 5. EMPLOYEEROLE (4 dòng - chỉ gán cho 4 nhân viên hiện có)
-- =============================================
insert into employeerole (
   employeeid,
   roleid
) values ( 1,
           1 );
insert into employeerole (
   employeeid,
   roleid
) values ( 2,
           2 );
insert into employeerole (
   employeeid,
   roleid
) values ( 3,
           3 );
insert into employeerole (
   employeeid,
   roleid
) values ( 4,
           4 );

--select * FROM EMPLOYEEROLE;

-- =============================================
-- 6. WAREHOUSE (3 dòng)
-- =============================================
insert into warehouse (
   warehousename,
   managerid,
   address,
   contactnumber,
   capacity,
   status,
   warehousetype
) values ( N'Kho tổng SGF',
           2,
           N'Số 40 Hoàng Hoa Thám, Đà Lạt',
           '0989126351',
           5000,
           1,
           1 );
insert into warehouse (
   warehousename,
   managerid,
   address,
   contactnumber,
   capacity,
   status,
   warehousetype
) values ( N'Kho bán hàng SGF',
           2,
           N'Số 40 Hoàng Hoa Thám, Đà Lạt',
           '0989126351',
           500,
           1,
           2 );
insert into warehouse (
   warehousename,
   managerid,
   address,
   contactnumber,
   capacity,
   status,
   warehousetype
) values ( N'Kho lỗi SGF',
           2,
           N'Số 40 Hoàng Hoa Thám, Đà Lạt',
           '0989126351',
           500,
           1,
           3 );

--select * FROM WAREHOUSE;

-- =============================================
-- 7. PRODUCTTYPE
-- =============================================
insert into producttype (
   producttypename,
   categoryid
) values ( N'Túi tote',
           1 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Túi xách vải handmade',
           1 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Ví handmade',
           1 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Túi xách jean quai quần',
           1 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Khẩu trang vải',
           2 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Xà phòng handmade',
           3 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Khung hình để bàn',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Hộp đựng giấy',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Tranh trang trí',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Chai rượu tái chế',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Kệ sách để bàn mini',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Chậu cây mini',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Hộp đựng bút',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Handmade Napkin',
           4 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Lót ly handmade',
           5 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Quần jean',
           6 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Khăn ăn thêu tay',
           7 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Cúc áo thêu tay',
           7 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Túi rút thêu',
           7 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Sản phẩm thêu tay khác',
           7 );
insert into producttype (
   producttypename,
   categoryid
) values ( N'Combo quà tặng',
           8 );

--select * FROM PRODUCTTYPE;

-- =============================================
-- 8. PRODUCT (31 dòng)
-- =============================================
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Túi tote vải canvas trơn',
           N'Túi tote làm từ vải canvas tái chế',
           85000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=101',
           1 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Túi tote họa tiết hoa sen',
           N'Túi tote in hoa sen',
           95000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=102',
           1 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Túi xách vải handmade hoa văn dân tộc',
           N'Túi may từ vải vụn',
           120000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=103',
           2 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Ví handmade da tái chế',
           N'Ví nhỏ gọn da tái chế',
           65000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=104',
           3 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Túi xách jean quai quần',
           N'Túi làm từ jean cũ',
           110000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=105',
           4 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khẩu trang trẻ em thêu con thỏ',
           N'Khẩu trang thêu tay',
           25000,
           1,
           2,
           0,
           'https://picsum.photos/1000?random=106',
           5 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khẩu trang 3D kháng khuẩn',
           N'Khẩu trang 3 lớp',
           30000,
           1,
           2,
           0,
           'https://picsum.photos/1000?random=107',
           5 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Xà phòng nhân sâm đỏ',
           N'Xà phòng dưỡng da',
           45000,
           1,
           3,
           1,
           'https://picsum.photos/1000?random=108',
           6 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Xà phòng hoa oải hương',
           N'Xà phòng thiên nhiên',
           40000,
           1,
           3,
           1,
           'https://picsum.photos/1000?random=109',
           6 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Xà phòng sả chanh',
           N'Xà phòng tươi mát',
           35000,
           1,
           3,
           1,
           'https://picsum.photos/1000?random=110',
           6 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Xà phòng cà phê',
           N'Tẩy tế bào chết',
           40000,
           1,
           3,
           1,
           'https://picsum.photos/1000?random=111',
           6 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khung hình để bàn',
           N'Từ gỗ tái chế',
           75000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=112',
           7 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Hộp đựng giấy',
           N'Bằng gỗ sơn decoupage',
           85000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=113',
           8 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Tranh trang trí',
           N'Ghép vải vụn',
           120000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=114',
           9 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Chai rượu tái chế',
           N'Trang trí đèn LED',
           95000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=115',
           10 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Kệ sách mini',
           N'Từ gỗ pallet',
           100000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=116',
           11 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Chậu cây mini',
           N'Gỗ trang trí',
           70000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=117',
           12 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Hộp đựng bút',
           N'Bọc vải decoupage',
           45000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=118',
           13 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Set napkin',
           N'Bộ 3 sản phẩm',
           220000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=119',
           14 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Lót ly rau củ',
           N'Thêu tay',
           30000,
           1,
           5,
           1,
           'https://picsum.photos/1000?random=120',
           15 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Lót ly hải sản',
           N'Thêu tay',
           35000,
           1,
           5,
           1,
           'https://picsum.photos/1000?random=121',
           15 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Lót ly cà phê',
           N'Thêu tay',
           30000,
           1,
           5,
           1,
           'https://picsum.photos/1000?random=122',
           15 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Quần jean suông',
           N'Tái chế',
           180000,
           1,
           6,
           1,
           'https://picsum.photos/1000?random=123',
           16 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Quần jean thêu',
           N'Thêu mặt trời',
           220000,
           1,
           6,
           1,
           'https://picsum.photos/1000?random=124',
           16 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khăn ăn hoa hồng',
           N'Linen thêu',
           60000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=125',
           17 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Cúc áo thêu',
           N'Gỗ thêu',
           35000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=126',
           18 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Túi rút thêu',
           N'Dân tộc',
           55000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=127',
           19 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Tranh thêu sen',
           N'Tranh thêu tay',
           150000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=128',
           20 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Tranh thêu làng quê',
           N'Phong cảnh',
           180000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=129',
           20 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Combo yêu thương',
           N'Xà phòng + Khăn',
           100000,
           1,
           8,
           1,
           'https://picsum.photos/1000?random=130',
           21 );
insert into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Combo sinh nhật',
           N'Túi + Xà phòng',
           150000,
           1,
           8,
           1,
           'https://picsum.photos/1000?random=131',
           21 );

--select * FROM PRODUCT;

-- =============================================
-- 9. COMBO (10 dòng)
-- =============================================
insert into combo ( comboprice ) values ( 100000 );
insert into combo ( comboprice ) values ( 150000 );
insert into combo ( comboprice ) values ( 200000 );
insert into combo ( comboprice ) values ( 250000 );
insert into combo ( comboprice ) values ( 300000 );
insert into combo ( comboprice ) values ( 120000 );
insert into combo ( comboprice ) values ( 180000 );
insert into combo ( comboprice ) values ( 220000 );
insert into combo ( comboprice ) values ( 99000 );
insert into combo ( comboprice ) values ( 400000 );

--select * FROM COMBO;

-- =============================================
-- 10. COMBODETAIL (đầy đủ 10 Combo, dùng ProductID 1-31)
-- =============================================
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           11,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           26,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           28,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           9,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           21,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           1,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           10,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           20,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           4,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           25,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           29,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           29,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           9,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           12,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           7,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           8,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           22,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           18,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           16,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           20,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           17,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           14,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           9,
           1 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 9,
           22,
           2 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 9,
           23,
           2 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           1,
           5 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           21,
           2 );
insert into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           29,
           1 );

--select * FROM COMBODETAIL;

-- =============================================
-- 11. SHIPCOMPANY (10 dòng)
-- =============================================
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Giao hàng tiết kiệm',
           N'Toàn quốc',
           '19001234',
           'support@ghtk.vn',
           N'123 Láng Hạ, Hà Nội',
           N'Đối tác chính',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Viettel Post',
           N'Miền Bắc',
           '19001235',
           'support@viettelpost.vn',
           N'456 Giải Phóng, Hà Nội',
           N'Giao nhanh',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'VNPost',
           N'Toàn quốc',
           '19001111',
           'cskh@vnpost.vn',
           N'12 Bưu Điện',
           N'Cước rẻ',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'J&T Express',
           N'Toàn quốc',
           '19002222',
           'info@jnt.vn',
           N'22 Cộng Hòa',
           N'Giao hàng TMĐT',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Ahamove',
           N'Nội thành HCM, HN',
           '19003333',
           'support@ahamove.vn',
           N'10 Thành Thánh',
           N'Giao siêu tốc',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Lalamove',
           N'Nội thành',
           '19004444',
           'info@lalamove.com',
           N'55 Nguyễn Đình Chiểu',
           N'Giao hàng cồng kềnh',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Ninja Van',
           N'Toàn quốc',
           '19005555',
           'vn@ninjavan.co',
           N'34 KCN Tân Bình',
           N'Chuyên tuyến huyện',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'GrabExpress',
           N'Nội thành',
           '19006666',
           'grab@grab.vn',
           N'Maplet',
           N'Giao đồ ăn, hàng hóa',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Shopee Express',
           N'Toàn quốc',
           '19007777',
           'cskh@shopee.vn',
           N'DaLatTown',
           N'Shopee partner',
           1 );
insert into shipcompany (
   shipcompanyname,
   supportedregion,
   phone,
   email,
   address,
   notes,
   status
) values ( N'Be Delivery',
           N'Nội thành',
           '19008888',
           'support@be.vn',
           N'Tòa nhà E-town',
           N'Be Group',
           1 );

--select * FROM SHIPCOMPANY;

-- =============================================
-- 12. CUSTOMER (10 dòng, CustomerTypeID có thể NULL)
-- =============================================
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 1,
           N'Nguyễn',
           N'Thị Hoa',
           null,
           '0988777666',
           N'12 Trần Duy Hưng, Hà Nội',
           'hoa.nguyen@gmail.com',
           170000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 2,
           N'Phạm',
           N'Văn Bình',
           N'Nhà hàng Tâm An',
           '0988777667',
           N'34 Ngọc Khánh, Hà Nội',
           'binh.pham@taman.vn',
           190000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( null,
           N'Khách',
           N'Lẻ',
           null,
           '0912345678',
           N'56 Chợ Mơ',
           null,
           65000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 3,
           N'Lê',
           N'Hoàng Nam',
           null,
           '0922333444',
           N'100 Quang Trung, Gò Vấp',
           'nam.le@email.com',
           195000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 4,
           N'Trần',
           N'Kim Chi',
           null,
           '0933444555',
           N'2B Lê Lợi, Q1',
           'chi.tran@email.com',
           880000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 1,
           N'Hoàng',
           N'Văn Doanh',
           N'Công ty CP Đầu Tư',
           '0944555666',
           N'Landmark 81',
           'doanh.hoang@congty.vn',
           300000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 2,
           N'Đinh',
           N'Thị Ngọc',
           null,
           '0955666777',
           N'5 Cầu Giấy, HN',
           'ngoc.dinh@email.com',
           125000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 3,
           N'Vũ',
           N'Tuấn Anh',
           null,
           '0966777888',
           N'15 Tây Hồ, HN',
           'anh.vu@email.com',
           210000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 4,
           N'Bùi',
           N'Lan Hương',
           null,
           '0977888999',
           N'99 Đống Đa, HN',
           'huong.bui@email.com',
           395000 );
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( null,
           N'Tập đoàn',
           N'SGF Partner',
           N'SGF Partner Corp',
           '0988999111',
           N'KCN Sóng Thần',
           'contact@sgfpartner.vn',
           3500000 );

--select * FROM CUSTOMER;

-- =============================================
-- 13. PAYMENTMETHOD (10 dòng)
-- =============================================
insert into paymentmethod (
   paymentname,
   status
) values ( N'Tiền mặt',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'Chuyển khoản',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'Ví điện tử MoMo',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'VNPay',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'ZaloPay',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'Thanh toán khi nhận hàng (COD)',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'Thẻ tín dụng (Credit Card)',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'Thẻ ghi nợ (Debit Card)',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'PayPal',
           1 );
insert into paymentmethod (
   paymentname,
   status
) values ( N'ShopeePay',
           1 );

--select * FROM PAYMENTMETHOD;

-- =============================================
-- 14. RETURNPOLICY (8 dòng)
-- =============================================
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Chính sách đổi trả 7 ngày',
           7,
           0,
           date '2024-01-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Hàng thêu không đổi',
           0,
           100,
           date '2024-01-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả 14 ngày (Khách VIP)',
           14,
           0,
           date '2024-02-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi hàng lỗi do NSX (30 ngày)',
           30,
           0,
           date '2024-01-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Hàng giảm giá không đổi',
           0,
           100,
           date '2024-01-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả mất phí 10%',
           7,
           10,
           date '2024-03-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả B2B',
           15,
           5,
           date '2024-04-01',
           1 );
insert into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả miễn phí 3 ngày',
           3,
           0,
           date '2024-06-01',
           1 );

--select * FROM RETURNPOLICY;

-- =============================================
-- 15. DISCOUNT (10 dòng, CustomerTypeID NULL hoặc 1-4)
-- =============================================
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 1,
           N'Giảm giá tháng 5',
           10,
           N'Giảm 10%',
           null,
           0,
           date '2024-05-31',
           date '2024-05-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 2,
           N'Ưu đãi khách Silver',
           15,
           N'Giảm 15%',
           null,
           0,
           date '2024-06-30',
           date '2024-05-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 3,
           N'Khuyến mãi Gold',
           20,
           N'Giảm 20%',
           null,
           0,
           date '2024-07-31',
           date '2024-06-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 4,
           N'Flash sale VIP',
           30,
           N'Giảm 30%',
           null,
           0,
           date '2024-05-15',
           date '2024-05-10' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( null,
           N'Mã FREESHIP',
           0,
           N'Miễn phí vận chuyển',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( null,
           N'Giảm giá quần áo',
           5,
           N'Giảm 5% thời trang',
           '23,24',
           0,
           date '2024-08-30',
           date '2024-01-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 1,
           N'Chiết khấu sỉ B2B',
           15,
           N'Đơn hàng B2B Standard',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 2,
           N'Chiết khấu sỉ B2B Premium',
           25,
           N'Đơn B2B Premium',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 3,
           N'Welcome Member',
           10,
           N'Chào bạn mới',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' );
insert into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( null,
           N'Black Friday',
           50,
           N'Giảm 50% tất cả',
           null,
           0,
           date '2024-11-30',
           date '2024-11-25' );

--select * FROM DISCOUNT;

-- =============================================
-- 16. DETAILINVENTORY (Kho tổng 31 sp, kho bán hàng 11 sp, kho lỗi 2 sp)
-- =============================================
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           1,
           200,
           200,
           150,
           20,
           500,
           1,
           N'Kệ A-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           2,
           150,
           150,
           150,
           15,
           400,
           1,
           N'Kệ A-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           3,
           180,
           180,
           180,
           18,
           450,
           1,
           N'Kệ A-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           4,
           220,
           220,
           220,
           22,
           550,
           1,
           N'Kệ A-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           5,
           160,
           160,
           160,
           16,
           400,
           1,
           N'Kệ A-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           6,
           300,
           300,
           300,
           30,
           600,
           1,
           N'Kệ B-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           7,
           250,
           250,
           250,
           25,
           500,
           1,
           N'Kệ B-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           8,
           280,
           280,
           280,
           28,
           560,
           1,
           N'Kệ B-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           9,
           260,
           260,
           260,
           26,
           520,
           1,
           N'Kệ B-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           10,
           300,
           300,
           299,
           30,
           600,
           1,
           N'Kệ B-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           11,
           350,
           350,
           345,
           35,
           700,
           1,
           N'Kệ B-06' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           12,
           190,
           190,
           190,
           19,
           380,
           1,
           N'Kệ C-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           13,
           170,
           170,
           170,
           17,
           340,
           1,
           N'Kệ C-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           14,
           140,
           140,
           140,
           14,
           280,
           1,
           N'Kệ C-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           15,
           210,
           210,
           210,
           21,
           420,
           1,
           N'Kệ C-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           16,
           230,
           230,
           230,
           23,
           460,
           1,
           N'Kệ C-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           17,
           200,
           200,
           200,
           20,
           400,
           1,
           N'Kệ C-06' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           18,
           400,
           400,
           400,
           40,
           800,
           1,
           N'Kệ C-07' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           19,
           120,
           120,
           120,
           12,
           240,
           1,
           N'Kệ D-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           20,
           150,
           150,
           150,
           15,
           300,
           1,
           N'Kệ D-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           21,
           180,
           180,
           180,
           18,
           360,
           1,
           N'Kệ D-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           22,
           160,
           160,
           160,
           16,
           320,
           1,
           N'Kệ D-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           23,
           90,
           90,
           90,
           9,
           180,
           1,
           N'Kệ E-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           24,
           110,
           110,
           110,
           11,
           220,
           1,
           N'Kệ E-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           25,
           80,
           80,
           80,
           8,
           160,
           1,
           N'Kệ E-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           26,
           70,
           70,
           70,
           7,
           140,
           1,
           N'Kệ E-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           27,
           130,
           130,
           130,
           13,
           260,
           1,
           N'Kệ E-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           28,
           60,
           60,
           60,
           6,
           120,
           1,
           N'Kệ E-06' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           29,
           50,
           50,
           50,
           5,
           100,
           1,
           N'Kệ E-07' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           30,
           95,
           95,
           95,
           10,
           190,
           1,
           N'Kệ F-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 1,
           31,
           85,
           85,
           85,
           8,
           170,
           1,
           N'Kệ F-02' );
-- KHO HÀNG TRỰC TIẾP
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           1,
           30,
           30,
           30,
           5,
           50,
           1,
           N'Quầy A-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           2,
           25,
           25,
           25,
           4,
           40,
           1,
           N'Quầy A-01' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           5,
           20,
           20,
           20,
           3,
           35,
           1,
           N'Quầy A-02' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           8,
           40,
           40,
           40,
           10,
           80,
           1,
           N'Quầy A-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           10,
           35,
           35,
           35,
           8,
           70,
           1,
           N'Quầy A-03' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           11,
           50,
           50,
           50,
           10,
           100,
           1,
           N'Quầy A-04' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           20,
           15,
           15,
           15,
           3,
           30,
           1,
           N'Quầy A-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           21,
           12,
           12,
           12,
           2,
           25,
           1,
           N'Quầy A-05' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           22,
           18,
           18,
           18,
           3,
           30,
           1,
           N'Quầy A-06' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           30,
           10,
           10,
           10,
           2,
           20,
           1,
           N'Quầy A-07' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 2,
           31,
           8,
           8,
           8,
           2,
           15,
           1,
           N'Quầy A-07' );
-- KHO HÀNG LỖI
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 3,
           26,
           2,
           2,
           0,
           0,
           10,
           0,
           N'Kệ lỗi' );
insert into detailinventory (
   warehouseid,
   productid,
   currentquantity,
   realstock,
   availablestock,
   minstock,
   maxstock,
   isalertenabled,
   storagelocation
) values ( 3,
           21,
           1,
           1,
           0,
           0,
           5,
           0,
           N'Kệ lỗi' );

--select * FROM DETAILINVENTORY;

-- =============================================
-- 17. EXPORTRECEIPT (10 dòng, chỉ dùng EmployeeID 1-4, WarehouseID 1-3)
-- =============================================
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #1',
           N'Đã hoàn thành',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           2,
           N'Trả hàng lỗi về xưởng',
           N'Đã hoàn thành',
           3 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 4,
           1,
           N'Xuất bán đại lý B2B',
           N'Chờ xuất',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 4,
           3,
           N'Xuất luân chuyển sang kho bán hàng',
           N'Đã hoàn thành',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 1,
           1,
           N'Xuất bán đơn hàng Shopee',
           N'Đã hoàn thành',
           2 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 3,
           1,
           N'Xuất bán đơn hàng Tiki',
           N'Đã hủy',
           2 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 1,
           4,
           N'Xuất tặng quà từ thiện',
           N'Đã hoàn thành',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #2',
           N'Đã hoàn thành',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #3',
           N'Chờ lấy hàng',
           1 );
insert into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 4,
           1,
           N'Xuất bán tại quầy',
           N'Đã hoàn thành',
           2 );

--select * FROM EXPORTRECEIPT;

-- =============================================
-- 18. EXPORTRECEIPTDETAIL (10 dòng, ProductID 1-31)
-- =============================================
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 1,
           11,
           5 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 1,
           26,
           2 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 2,
           26,
           1 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 3,
           31,
           50 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 4,
           3,
           20 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 5,
           4,
           5 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 7,
           1,
           100 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 8,
           21,
           10 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 9,
           5,
           2 );
insert into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 10,
           6,
           1 );

--select * FROM EXPORTRECEIPTDETAIL;

-- =============================================
-- 19. INVOICE (10 dòng, EmployeeID 1-4, CustomerID 1-10)
-- =============================================
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 1,
           1,
           1,
           0,
           170000,
           0,
           170000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 2,
           2,
           1,
           1,
           190000,
           0,
           190000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 3,
           4,
           4,
           0,
           195000,
           0,
           195000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 4,
           5,
           4,
           1,
           880000,
           0,
           880000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 5,
           6,
           3,
           0,
           300000,
           0,
           300000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 6,
           7,
           4,
           1,
           125000,
           0,
           125000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 7,
           8,
           4,
           0,
           210000,
           0,
           210000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 8,
           9,
           4,
           1,
           395000,
           0,
           395000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 9,
           10,
           1,
           0,
           3500000,
           0,
           3500000,
           N'Đã thanh toán' );
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 10,
           3,
           4,
           0,
           65000,
           0,
           65000,
           N'Đã thanh toán' );

--select * FROM INVOICE;

-- =============================================
-- 20. ORDERS (10 dòng, các FK hợp lệ)
-- =============================================
-- Order 1 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 1,
           1,
           1,
           null,
           null,
           170000,
           1,
           null,
           null,
           0,
           null );

-- Order 2 (trực tuyến)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 2,
           1,
           2,
           'SPX123456',
           1,
           190000,
           0,
           0,
           N'Giao giờ hành chính',
           30000,
           1 );

-- Order 3 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 4,
           4,
           3,
           null,
           null,
           195000,
           1,
           null,
           null,
           0,
           null );

-- Order 4 (trực tuyến)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 5,
           4,
           4,
           'GHTK888',
           1,
           880000,
           1,
           2,
           N'Gọi trước khi giao',
           50000,
           5 );

-- Order 5 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 6,
           3,
           5,
           null,
           null,
           300000,
           1,
           null,
           null,
           0,
           null );

-- Order 6 (trực tuyến)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 7,
           4,
           6,
           'AHA111',
           5,
           125000,
           1,
           2,
           N'Giao ngay',
           25000,
           8 );

-- Order 7 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 8,
           4,
           7,
           null,
           null,
           210000,
           1,
           null,
           null,
           0,
           null );

-- Order 8 (trực tuyến)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 9,
           4,
           8,
           'JNT222',
           4,
           395000,
           0,
           0,
           N'Giao buổi sáng',
           40000,
           9 );

-- Order 9 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 10,
           1,
           9,
           null,
           null,
           3500000,
           1,
           null,
           null,
           0,
           null );

-- Order 10 (trực tiếp)
insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 3,
           4,
           10,
           null,
           null,
           65000,
           1,
           null,
           null,
           0,
           10 );

--select * FROM ORDERS;

-- =============================================
-- 21. ORDERDETAIL (10 dòng)
-- =============================================
-- Order 1
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 1,
           1,
           2,
           85000,
           0,
           170000 );

-- Order 2
insert into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           null,
           2,
           1,
           150000,
           0,
           150000 );
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           9,
           1,
           40000,
           0,
           40000 );

-- Order 3
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 3,
           4,
           3,
           65000,
           0,
           195000 );

-- Order 4
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 4,
           24,
           4,
           220000,
           0,
           880000 );

-- Order 5
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 5,
           7,
           10,
           30000,
           0,
           300000 );

-- Order 6
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           8,
           2,
           45000,
           0,
           90000 );
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           21,
           1,
           35000,
           0,
           35000 );

-- Order 7
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           28,
           1,
           150000,
           0,
           150000 );
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           25,
           1,
           60000,
           0,
           60000 );

-- Order 8
insert into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 8,
           null,
           5,
           1,
           300000,
           0,
           300000 );
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 8,
           15,
           1,
           95000,
           0,
           95000 );

-- Order 9
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 9,
           10,
           100,
           35000,
           0,
           3500000 );

-- Order 10
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           22,
           1,
           30000,
           0,
           30000 );
insert into orderdetail (
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           26,
           1,
           35000,
           0,
           35000 );

--select * FROM ORDERDETAIL;

-- =============================================
-- 23. INVOICEDETAIL (10 dòng)
-- =============================================
-- Invoice 1
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 1,
           1,
           2,
           85000,
           0,
           170000 );

-- Invoice 2
insert into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           null,
           2,
           1,
           150000,
           0,
           150000 );
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           9,
           1,
           40000,
           0,
           40000 );

-- Invoice 3
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 3,
           4,
           3,
           65000,
           0,
           195000 );

-- Invoice 4
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 4,
           24,
           4,
           220000,
           0,
           880000 );

-- Invoice 5
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 5,
           7,
           10,
           30000,
           0,
           300000 );

-- Invoice 6
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           8,
           2,
           45000,
           0,
           90000 );
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           21,
           1,
           35000,
           0,
           35000 );

-- Invoice 7
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           28,
           1,
           150000,
           0,
           150000 );
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           25,
           1,
           60000,
           0,
           60000 );

-- Invoice 8
insert into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 8,
           null,
           5,
           1,
           300000,
           0,
           300000 );
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 8,
           15,
           1,
           95000,
           0,
           95000 );

-- Invoice 9
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 9,
           10,
           100,
           35000,
           0,
           3500000 );

-- Invoice 10
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           22,
           1,
           30000,
           0,
           30000 );
insert into invoicedetail (
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           26,
           1,
           35000,
           0,
           35000 );


--select * FROM INVOICEDETAIL;


-- =============================================
-- 22. PAYMENT (10 dòng)
-- =============================================
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 1,
           1,
           170000,
           null,
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 2,
           2,
           190000,
           'CK_002',
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 3,
           1,
           195000,
           null,
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 4,
           2,
           880000,
           'CK_004',
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 5,
           1,
           300000,
           null,
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 6,
           2,
           125000,
           'CK_006',
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 7,
           1,
           210000,
           null,
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 8,
           2,
           395000,
           'CK_008',
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 9,
           2,
           3500000,
           'CK_009',
           current_timestamp );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 10,
           1,
           65000,
           null,
           current_timestamp );

--select * FROM PAYMENT;

-- =============================================
-- 24. NOTIFICATION (3 dòng)
-- =============================================
insert into notification (
   employeeid,
   title,
   productid,
   message,
   type,
   status,
   createddate
) values ( 2,
           N'Cảnh báo tồn kho thấp',
           26,
           N'Khăn ăn thêu tay hoa hồng chỉ còn 50 chiếc',
           1,
           0,
           sysdate );
insert into notification (
   employeeid,
   title,
   productid,
   message,
   type,
   status,
   createddate
) values ( 2,
           N'Cảnh báo tồn kho thấp',
           1,
           N'Túi tote sắp hết',
           1,
           0,
           sysdate );
insert into notification (
   employeeid,
   title,
   productid,
   message,
   type,
   status,
   createddate
) values ( 4,
           N'Cảnh báo hết hàng',
           4,
           N'Ví handmade da tái chế',
           1,
           0,
           sysdate );

--select * FROM NOTIFICATION;

-- =============================================
-- 25. REQUESTFORM (10 dòng, EmployeeID 1-4, ApproverID 1-4)
-- =============================================
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-10',
           N'Chờ duyệt',
           null,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-12',
           N'Đã duyệt',
           1,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-13',
           N'Từ chối',
           1,
           N'Số lượng quá lớn, đề nghị chia nhỏ' );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-14',
           N'Đã duyệt',
           1,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 1,
           date '2024-05-15',
           N'Chờ duyệt',
           null,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 3,
           date '2024-05-16',
           N'Đã duyệt',
           2,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-17',
           N'Đã duyệt',
           3,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-18',
           N'Chờ duyệt',
           null,
           null );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-19',
           N'Từ chối',
           2,
           N'Chưa cần thiết' );
insert into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 3,
           date '2024-05-20',
           N'Đã duyệt',
           1,
           null );

--select * FROM REQUESTFORM;


-- =============================================
-- 26. REQUESTDETAIL (10 dòng)
-- =============================================
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           11,
           10 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           1,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 2,
           26,
           20 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 3,
           2,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 4,
           23,
           20 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 5,
           4,
           100 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 6,
           5,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 7,
           10,
           30 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 8,
           21,
           15 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 10,
           16,
           10 );

--select * FROM REQUESTDETAIL;

-- =============================================
-- 27. TRANSFERTICKET (10 dòng, SourceWHID/DestWHID 1-3)
-- =============================================
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           2,
           N'Chờ xuất kho',
           date '2024-05-15' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           2,
           1,
           N'Đang luân chuyển',
           date '2024-05-16' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           1,
           3,
           N'Đã nhập kho',
           date '2024-05-10' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           2,
           1,
           N'Từ chối',
           date '2024-05-11' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 1,
           1,
           2,
           N'Đang luân chuyển',
           date '2024-05-17' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           3,
           N'Chờ xuất kho',
           date '2024-05-18' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           2,
           N'Đã nhập kho',
           date '2024-05-01' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 3,
           2,
           3,
           N'Đã nhập kho',
           date '2024-05-12' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 3,
           1,
           2,
           N'Đang luân chuyển',
           date '2024-05-19' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           1,
           2,
           N'Chờ duyệt',
           date '2024-05-20' );

--select * FROM TRANSFERTICKET;


-- =============================================
-- 26. REQUESTDETAIL (10 dòng)
-- =============================================
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           11,
           10 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           1,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 2,
           26,
           20 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 3,
           2,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 4,
           23,
           20 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 5,
           4,
           100 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 6,
           5,
           50 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 7,
           10,
           30 );
insert into requestdetail (
   requestid,
   productid,
   quantity
) values ( 8,
           21,
           15 );

-- =============================================
-- 27. TRANSFERTICKET (10 dòng, SourceWHID/DestWHID 1-3)
-- =============================================
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           2,
           N'Chờ xuất kho',
           date '2024-05-15' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           2,
           1,
           N'Đang luân chuyển',
           date '2024-05-16' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           1,
           3,
           N'Đã nhập kho',
           date '2024-05-10' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           2,
           1,
           N'Từ chối',
           date '2024-05-11' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 1,
           1,
           2,
           N'Đang luân chuyển',
           date '2024-05-17' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           3,
           N'Chờ xuất kho',
           date '2024-05-18' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           2,
           N'Đã nhập kho',
           date '2024-05-01' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 3,
           2,
           3,
           N'Đã nhập kho',
           date '2024-05-12' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 3,
           1,
           2,
           N'Đang luân chuyển',
           date '2024-05-19' );
insert into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           1,
           2,
           N'Chờ duyệt',
           date '2024-05-20' );

-- =============================================
-- 28. TRANSFERTICKETDETAIL (10 dòng)
-- =============================================
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 1,
           1,
           null,
           null,
           20 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 1,
           11,
           null,
           null,
           15 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 2,
           1,
           10,
           10,
           10 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 3,
           2,
           50,
           50,
           50 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 4,
           14,
           10,
           0,
           10 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 5,
           13,
           100,
           null,
           100 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 6,
           21,
           null,
           null,
           30 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 7,
           10,
           20,
           20,
           20 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 8,
           26,
           5,
           5,
           5 );
insert into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 9,
           15,
           2,
           null,
           2 );

--select * FROM TRANSFERTICKETDETAIL;

-- =============================================
-- 29. IMPORTRECEIPT (10 dòng)
-- =============================================
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 2,
           1,
           N'Bản nháp',
           date '2024-05-18',
           2,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 2,
           1,
           N'Đã nhập kho',
           date '2024-05-20',
           null,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 4,
           1,
           N'Đã nhập kho',
           date '2024-05-15',
           4,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 3,
           2,
           N'Đã nhập kho',
           date '2024-05-17',
           6,
           1 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 4,
           2,
           N'Chờ duyệt',
           date '2024-05-18',
           7,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 1,
           1,
           N'Đã nhập kho',
           date '2024-05-21',
           10,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 2,
           1,
           N'Đã nhập kho',
           date '2024-04-10',
           null,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 4,
           1,
           N'Đã nhập kho',
           date '2024-04-15',
           null,
           1 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 1,
           2,
           N'Bản nháp',
           date '2024-05-22',
           null,
           0 );
insert into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 2,
           2,
           N'Đã nhập kho',
           date '2024-05-23',
           null,
           0 );

--select * FROM IMPORTRECEIPT;

-- =============================================
-- 30. IMPORTRECEIPTDETAIL (10 dòng)
-- =============================================
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 1,
           11,
           100,
           10 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 1,
           1,
           50,
           50 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 2,
           26,
           20,
           20 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 3,
           12,
           200,
           20 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 4,
           5,
           50,
           48 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 5,
           10,
           30,
           30 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 6,
           16,
           1000,
           10 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 7,
           21,
           50,
           50 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 8,
           24,
           100,
           15 );
insert into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 10,
           1,
           30,
           30 );

--select * FROM IMPORTRECEIPTDETAIL;

-- =============================================
-- 31. COUNTSHEET (10 dòng)
-- =============================================
insert into countsheet (
   createddate,
   status
) values ( date '2024-05-25',
           0 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-05-30',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-04-30',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-03-31',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-02-28',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-01-31',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2023-12-31',
           2 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-06-05',
           0 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-06-10',
           1 );
insert into countsheet (
   createddate,
   status
) values ( date '2024-06-15',
           1 );

--select * FROM COUNTSHEET;

-- =============================================
-- 32. COUNTSHEETDETAIL (đã có sẵn từ yêu cầu trước, copy lại)
-- =============================================
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           1,
           199,
           N'Thiếu 1 sản phẩm so với sổ sách (200)' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           11,
           350,
           N'Khớp với sổ sách' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           26,
           70,
           N'Khớp với sổ sách' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           1,
           30,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           20,
           15,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           30,
           10,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           4,
           220,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           21,
           180,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           5,
           158,
           N'Thiếu 2 sản phẩm' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           5,
           20,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           10,
           35,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           21,
           12,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           18,
           400,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           2,
           150,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           29,
           48,
           N'Thiếu 2 sản phẩm (sổ sách 50)' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           6,
           300,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           22,
           160,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           17,
           200,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           1,
           200,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           25,
           80,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           31,
           85,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           13,
           170,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           19,
           120,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           16,
           229,
           N'Thiếu 1 sản phẩm' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           11,
           50,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           22,
           18,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           31,
           8,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           27,
           130,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           28,
           60,
           N'Khớp' );
insert into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           9,
           260,
           N'Khớp' );

--select * FROM COUNTSHEETDETAIL;

-- =============================================
-- 33. ORDERRETURN (10 dòng, EmployeeID 1-4)
-- =============================================
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 2,
           1,
           date '2024-05-28',
           N'Sản phẩm bị lỗi thêu',
           30000,
           null,
           N'Chờ xử lý' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 3,
           4,
           date '2024-05-20',
           N'Giao nhầm mùi hương nến',
           80000,
           'RET_002',
           N'Đã hoàn tiền' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 5,
           3,
           date '2024-05-22',
           N'Hàng hỏng do vận chuyển',
           170000,
           'RET_003',
           N'Đang xử lý' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 7,
           4,
           date '2024-05-23',
           N'Khách không nhận',
           85000,
           'RET_004',
           N'Đã hoàn tất' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 1,
           1,
           date '2024-05-24',
           N'Lỗi đóng gói',
           35000,
           'RET_005',
           N'Từ chối' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 4,
           4,
           date '2024-05-25',
           N'Sổ tay rách bìa',
           45000,
           'RET_006',
           N'Đã hoàn tiền' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 6,
           4,
           date '2024-05-26',
           N'Hủy đơn đột xuất',
           85000,
           'RET_007',
           N'Đã hoàn tất' );

----select * FROM ORDERRETURN;
--
---- =============================================
---- 34. RETURNDETAIL (6 dòng, TargetWarehouseID 1-3)
---- =============================================
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 1,
           9,
           1,
           N'Lỗi nhẹ',
           3,
           N'Nhập kho tái chế' );
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 5,
           1,
           1,
           N'Bình thường',
           1,
           N'Giữ nguyên do từ chối đổi' );

----select * FROM RETURNDETAIL;

-- =============================================
-- 35. LISTDISCOUNT (10 dòng)
-- =============================================
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 2,
           1,
           10 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 3,
           5,
           0 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 5,
           7,
           15 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 6,
           9,
           10 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 9,
           8,
           25 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 1,
           1,
           10 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 4,
           6,
           5 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 8,
           5,
           0 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 10,
           2,
           15 );
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 7,
           5,
           0 );

--select * FROM LISTDISCOUNT;

-- =============================================
-- 36. FEEDBACK (10 dòng)
-- =============================================
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 1,
           2,
           N'Sản phẩm xà phòng thơm, chất lượng tốt',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 3,
           1,
           N'Lót ly đẹp, giao hàng nhanh',
           current_timestamp,
           null,
           4 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 5,
           4,
           N'Nến thơm cam rất tuyệt vời',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 6,
           5,
           N'Sổ tay đẹp nhưng giao hơi chậm',
           current_timestamp,
           null,
           3 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 7,
           6,
           N'Hàng chuẩn B2B, đóng gói chắc chắn',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 8,
           7,
           N'Tốt, sẽ ủng hộ tiếp',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 9,
           8,
           N'Xà phòng dùng bị dị ứng nhé',
           current_timestamp,
           null,
           2 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 10,
           3,
           N'Khách lẻ mua rất ưng',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 4,
           1,
           N'Combo sinh nhật tặng bạn rất hợp lý',
           current_timestamp,
           null,
           5 );
insert into feedback (
   orderdetailid,
   customerid,
   feedbackcomment,
   feedbackdate,
   attachmenturl,
   rating
) values ( 2,
           2,
           N'Khăn thêu đẹp nhưng mỏng',
           current_timestamp,
           null,
           4 );

--select * FROM FEEDBACK;

-- =============================================
-- INSERT THÊM DATA
-- =============================================

insert into orders (
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee,
   exportreceiptid
) values ( 6,
           3,
           1,
           '9U51F6EJSIYEYG5W8CTK',
           2,
           178613.08,
           3,
           2,
           '',
           9119,
           null );
insert into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 1,
           9,
           null,
           2,
           89306.54,
           0,
           178613.08 );
insert into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 1,
           1,
           178613.08,
           null,
           to_timestamp('2026-12-07 18:15:01',
                        'YYYY-MM-DD HH24:MI:SS') );

--select * from orders;

-- 1. THÊM KHÁCH HÀNG MỚI (CustomerID = 11)
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 2,
           N'Trịnh',
           N'Xuân Hòa',
           N'Công ty TNHH XNK Hòa Bình',
           '0911222333',
           N'88 Nguyễn Huệ, Quận 1, TP.HCM',
           'hoa.trinh@hoabinh.vn',
           0 );

-- 2. THÊM HÓA ĐƠN MỚI (InvoiceID = 11)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 11,
           11,
           3,
           1,
           0,
           0,
           0,
           N'Chờ thanh toán' );

---- 3. THÊM ĐƠN HÀNG MỚI
---- 3.1 Đơn hàng trực tuyến (OrderID = 11)
--INSERT INTO ORDERS (OrderID, CustomerID, EmployeeID, InvoiceID, ShipCode, ShipCompanyID, TotalAmount, OrderStatus, ShippingStatus, ShipmentNote, ShippingFee) 
--VALUES (11, 11, 3, 11, 'SPX987654', 1, 240000, 3, 3, N'Giao hành chính', 20000);

-- 3.2 Đơn hàng tại quầy (OrderID = 12)
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shipmentnote,
   shippingfee
) values ( 12,
           11,
           4,
           11,
           null,
           null,
           85000,
           3,
           null,
           null,
           0 );

-- 4. THÊM CHI TIẾT ĐƠN HÀNG (ORDERDETAIL)
-- Sản phẩm cho Order 11: ProductID=3 (Túi xách vải handmade) – tồn kho gốc đủ
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 11,
           11,
           3,
           2,
           120000,
           0,
           240000 );

---- Sản phẩm cho Order 12: ProductID=1 (Túi tote vải canvas) – tồn kho trực tiếp đủ
--INSERT INTO ORDERDETAIL (OrderDetailID, OrderID, ProductID, Quantity, UnitPrice, DiscountAmount, TotalAmount) 
--VALUES (12, 12, 1, 1, 85000, 0, 85000);

-- 5. CẬP NHẬT TỔNG TIỀN HÓA ĐƠN (Invoice 11)
update invoice
   set totalamount = 325000,
       finalamount = 325000
 where invoiceid = 11;

-- 7. THÊM ĐÁNH GIÁ (FEEDBACK) cho sản phẩm mới mua
insert into feedback (
   feedbackid,
   orderdetailid,
   customerid,
   feedbackcomment,
   rating
) values ( 11,
           11,
           11,
           N'Túi xách đẹp, đóng gói cẩn thận',
           5 );

insert into feedback (
   feedbackid,
   orderdetailid,
   customerid,
   feedbackcomment,
   rating
) values ( 12,
           12,
           11,
           N'Túi tote chất lượng tốt, giao nhanh',
           4 );

-- 8. (TÙY CHỌN) THÊM MỘT MÃ GIẢM GIÁ MỚI ĐỂ KIỂM TRA TRIGGER
-- Nếu muốn có ListDiscount, ta tạo Discount mới với thời hạn dài hơn để phù hợp SYSDATE
insert into discount (
   discountid,
   customertypeid,
   discountname,
   value,
   detail,
   status,
   expirydate,
   startdate
) values ( 11,
           null,
           N'Giảm giá mùa hè 2025',
           10,
           N'Giảm 10% cho đơn hàng từ 500k',
           0,
           date '2025-08-31',
           date '2025-06-01' );

-- Gán mã này cho Order 11 (nếu Order 11 có tổng tiền >= 500k? Order 11 mới 240k, chưa đủ, nhưng ta cứ gán để test, trigger C30 chỉ kiểm tra thời hạn và trạng thái, không kiểm tra giá trị đơn hàng)
insert into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 11,
           11,
           10 );

-- 9. (TÙY CHỌN) HOÀN TRẢ MỘT PHẦN ĐƠN HÀNG ĐÃ GIAO (Order 11) để kiểm tra Return
-- Order 11 đã có OrderStatus=3, đủ điều kiện hoàn trả
insert into orderreturn (
   returnid,
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 11,
           11,
           3,
           sysdate,
           N'Sản phẩm bị lỗi đường may',
           120000,
           'RET_011',
           N'Chờ xử lý' );

-- Chi tiết hoàn trả: hoàn 1 sản phẩm ProductID=3 (số lượng mua là 2, hoàn 1)
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 11,
           3,
           1,
           N'Lỗi nhẹ',
           3,
           N'Nhập kho tái chế' );


-- =============================================
-- DỮ LIỆU BỔ SUNG MỚI – KHÔNG TRÙNG LẶP
-- =============================================

-- 1. THÊM KHÁCH HÀNG MỚI (CustomerID = 21)
insert into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email,
   totalaccumulatedspent
) values ( 2,
           N'Ngô',
           N'Minh Tuấn',
           N'Công ty TNHH Thương Mại Tuấn Minh',
           '0911222444',
           N'123 Lê Lợi, Quận 1, TP.HCM',
           'tuan.ngo@tuanminh.vn',
           0 );

-- 8. (TÙY CHỌN) THÊM MÃ GIẢM GIÁ MỚI VÀ ÁP DỤNG
insert into discount (
   discountid,
   customertypeid,
   discountname,
   value,
   detail,
   status,
   expirydate,
   startdate
) values ( 21,
           null,
           N'Giảm giá mùa hè 2025',
           10,
           N'Giảm 10% cho đơn hàng từ 500k',
           0,
           date '2025-08-31',
           date '2025-06-01' );

-- =============================================
-- DỮ LIỆU BỔ SUNG: HÓA ĐƠN TRỰC TIẾP & TRỰC TUYẾN
-- =============================================

-- 1. Hóa đơn trực tiếp (bán tại quầy)
--    Khách hàng: Nguyễn Thị Hoa (CustomerID = 1)
--    Sản phẩm: Túi tote vải canvas trơn (ProductID = 1), số lượng 2
--    Tồn kho trực tiếp (WarehouseID = 2) hiện có 30, đủ điều kiện

-- 1.1 Tạo Invoice
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 100,
           1,
           4,
           0,
           170000,
           0,
           170000,
           N'Đã thanh toán',
           sysdate );

-- 1.2 Tạo Order (liên kết với Invoice)
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 100,
           1,
           4,
           100,
           170000,
           3,
           null );

-- 1.3 Tạo OrderDetail
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 100,
           100,
           1,
           2,
           85000,
           0,
           170000 );

-- 1.4 Tạo InvoiceDetail (tương ứng)
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 100,
           100,
           1,
           2,
           85000,
           0,
           170000 );

-- 1.5 Tạo Payment (thanh toán ngay)
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 100,
           100,
           1,
           170000,
           null,
           sysdate );

-- 2. Hóa đơn trực tuyến
--    Khách hàng: Phạm Văn Bình (CustomerID = 2)
--    Sản phẩm: Túi xách vải handmade (ProductID = 3), số lượng 1
--    Tồn kho gốc (WarehouseID = 1) hiện có 180, đủ điều kiện

-- 2.1 Tạo Invoice
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 101,
           2,
           1,
           1,
           120000,
           0,
           120000,
           N'Chờ thanh toán',
           sysdate );

-- 2.2 Tạo Order
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 101,
           2,
           1,
           101,
           'SPX999999',
           1,
           120000,
           3,
           3,
           20000 );

-- 2.3 Tạo OrderDetail
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 101,
           101,
           3,
           1,
           120000,
           0,
           120000 );

-- 2.4 Tạo InvoiceDetail
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 101,
           101,
           3,
           1,
           120000,
           0,
           120000 );

-- 2.5 Thanh toán hóa đơn trực tuyến (chuyển khoản)
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 101,
           101,
           2,
           120000,
           'CK_TRUCTUYEN_101',
           sysdate );

-- =============================================
-- 2. CHÈN 20 HÓA ĐƠN MỚI (102-121)
-- =============================================

-- Hóa đơn 102 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 102,
           1,
           4,
           0,
           190000,
           0,
           190000,
           N'Đã thanh toán',
           to_date('2026-01-05','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 102,
           1,
           4,
           102,
           190000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 102,
           102,
           2,
           2,
           95000,
           0,
           190000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 102,
           102,
           2,
           2,
           95000,
           0,
           190000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 102,
           102,
           1,
           190000,
           null,
           to_timestamp('2026-01-05 09:30:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 103 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 103,
           2,
           1,
           1,
           110000,
           0,
           110000,
           N'Chờ thanh toán',
           to_date('2026-01-12','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 103,
           2,
           1,
           103,
           'SPX111111',
           1,
           110000,
           3,
           3,
           15000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 103,
           103,
           5,
           1,
           110000,
           0,
           110000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 103,
           103,
           5,
           1,
           110000,
           0,
           110000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 103,
           103,
           2,
           110000,
           'CK_103',
           to_timestamp('2026-01-12 10:15:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 104 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 104,
           4,
           4,
           0,
           45000,
           0,
           45000,
           N'Đã thanh toán',
           to_date('2026-01-20','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 104,
           4,
           4,
           104,
           45000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 104,
           104,
           8,
           1,
           45000,
           0,
           45000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 104,
           104,
           8,
           1,
           45000,
           0,
           45000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 104,
           104,
           1,
           45000,
           null,
           to_timestamp('2026-01-20 11:00:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 105 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 105,
           5,
           1,
           1,
           220000,
           0,
           220000,
           N'Chờ thanh toán',
           to_date('2026-02-01','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 105,
           5,
           1,
           105,
           'GHTK222',
           1,
           220000,
           3,
           3,
           20000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 105,
           105,
           24,
           1,
           220000,
           0,
           220000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 105,
           105,
           24,
           1,
           220000,
           0,
           220000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 105,
           105,
           2,
           220000,
           'CK_105',
           to_timestamp('2026-02-01 08:45:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 106 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 106,
           6,
           4,
           0,
           70000,
           0,
           70000,
           N'Đã thanh toán',
           to_date('2026-02-10','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 106,
           6,
           4,
           106,
           70000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 106,
           106,
           21,
           2,
           35000,
           0,
           70000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 106,
           106,
           21,
           2,
           35000,
           0,
           70000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 106,
           106,
           1,
           70000,
           null,
           to_timestamp('2026-02-10 14:20:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 107 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 107,
           7,
           1,
           1,
           60000,
           0,
           60000,
           N'Chờ thanh toán',
           to_date('2026-02-18','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 107,
           7,
           1,
           107,
           'AHAMOVE333',
           5,
           60000,
           3,
           3,
           10000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 107,
           107,
           25,
           1,
           60000,
           0,
           60000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 107,
           107,
           25,
           1,
           60000,
           0,
           60000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 107,
           107,
           2,
           60000,
           'CK_107',
           to_timestamp('2026-02-18 09:10:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 108 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 108,
           8,
           4,
           0,
           90000,
           0,
           90000,
           N'Đã thanh toán',
           to_date('2026-02-28','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 108,
           8,
           4,
           108,
           90000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 108,
           108,
           22,
           3,
           30000,
           0,
           90000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 108,
           108,
           22,
           3,
           30000,
           0,
           90000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 108,
           108,
           1,
           90000,
           null,
           to_timestamp('2026-02-28 16:30:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 109 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 109,
           9,
           1,
           1,
           180000,
           0,
           180000,
           N'Chờ thanh toán',
           to_date('2026-03-05','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 109,
           9,
           1,
           109,
           'JNT444',
           4,
           180000,
           3,
           3,
           25000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 109,
           109,
           29,
           1,
           180000,
           0,
           180000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 109,
           109,
           29,
           1,
           180000,
           0,
           180000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 109,
           109,
           2,
           180000,
           'CK_109',
           to_timestamp('2026-03-05 11:45:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 110 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 110,
           10,
           4,
           0,
           100000,
           0,
           100000,
           N'Đã thanh toán',
           to_date('2026-03-12','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 110,
           10,
           4,
           110,
           100000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 110,
           110,
           30,
           1,
           100000,
           0,
           100000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 110,
           110,
           30,
           1,
           100000,
           0,
           100000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 110,
           110,
           1,
           100000,
           null,
           to_timestamp('2026-03-12 10:00:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 111 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 111,
           3,
           1,
           1,
           70000,
           0,
           70000,
           N'Chờ thanh toán',
           to_date('2026-03-20','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 111,
           3,
           1,
           111,
           'VNPOST555',
           3,
           70000,
           3,
           3,
           12000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 111,
           111,
           10,
           2,
           35000,
           0,
           70000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 111,
           111,
           10,
           2,
           35000,
           0,
           70000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 111,
           111,
           2,
           70000,
           'CK_111',
           to_timestamp('2026-03-20 13:20:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 112 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 112,
           1,
           4,
           0,
           85000,
           0,
           85000,
           N'Đã thanh toán',
           to_date('2026-03-28','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 112,
           1,
           4,
           112,
           85000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 112,
           112,
           1,
           1,
           85000,
           0,
           85000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 112,
           112,
           1,
           1,
           85000,
           0,
           85000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 112,
           112,
           1,
           85000,
           null,
           to_timestamp('2026-03-28 15:10:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 113 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 113,
           2,
           1,
           1,
           65000,
           0,
           65000,
           N'Chờ thanh toán',
           to_date('2026-04-05','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 113,
           2,
           1,
           113,
           'SPX666',
           1,
           65000,
           3,
           3,
           10000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 113,
           113,
           4,
           1,
           65000,
           0,
           65000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 113,
           113,
           4,
           1,
           65000,
           0,
           65000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 113,
           113,
           2,
           65000,
           'CK_113',
           to_timestamp('2026-04-05 09:00:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 114 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 114,
           4,
           4,
           0,
           75000,
           0,
           75000,
           N'Đã thanh toán',
           to_date('2026-04-12','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 114,
           4,
           4,
           114,
           75000,
           3,
           null );
--INSERT INTO ORDERDETAIL (OrderDetailID, OrderID, ProductID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
--VALUES (114, 114, 12, 1, 75000, 0, 75000);
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 114,
           114,
           12,
           1,
           75000,
           0,
           75000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 114,
           114,
           1,
           75000,
           null,
           to_timestamp('2026-04-12 10:25:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 115 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 115,
           5,
           1,
           1,
           170000,
           0,
           170000,
           N'Chờ thanh toán',
           to_date('2026-04-18','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 115,
           5,
           1,
           115,
           'GHTK777',
           1,
           170000,
           3,
           3,
           18000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 115,
           115,
           13,
           2,
           85000,
           0,
           170000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 115,
           115,
           13,
           2,
           85000,
           0,
           170000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 115,
           115,
           2,
           170000,
           'CK_115',
           to_timestamp('2026-04-18 11:55:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 116 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 116,
           6,
           4,
           0,
           70000,
           0,
           70000,
           N'Đã thanh toán',
           to_date('2026-04-25','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 116,
           6,
           4,
           116,
           70000,
           3,
           null );
--INSERT INTO ORDERDETAIL (OrderDetailID, OrderID, ProductID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
--VALUES (116, 116, 26, 2, 35000, 0, 70000);
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 116,
           116,
           26,
           2,
           35000,
           0,
           70000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 116,
           116,
           1,
           70000,
           null,
           to_timestamp('2026-04-25 14:40:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 117 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 117,
           7,
           1,
           1,
           100000,
           0,
           100000,
           N'Chờ thanh toán',
           to_date('2026-05-01','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 117,
           7,
           1,
           117,
           'AHAMOVE888',
           5,
           100000,
           3,
           3,
           15000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 117,
           117,
           16,
           1,
           100000,
           0,
           100000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 117,
           117,
           16,
           1,
           100000,
           0,
           100000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 117,
           117,
           2,
           100000,
           'CK_117',
           to_timestamp('2026-05-01 08:30:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 118 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 118,
           8,
           4,
           0,
           70000,
           0,
           70000,
           N'Đã thanh toán',
           to_date('2026-05-08','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 118,
           8,
           4,
           118,
           70000,
           3,
           null );
--INSERT INTO ORDERDETAIL (OrderDetailID, OrderID, ProductID, Quantity, UnitPrice, DiscountAmount, TotalAmount)
--VALUES (118, 118, 17, 1, 70000, 0, 70000);
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 118,
           118,
           17,
           1,
           70000,
           0,
           70000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 118,
           118,
           1,
           70000,
           null,
           to_timestamp('2026-05-08 12:15:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 119 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 119,
           9,
           1,
           1,
           220000,
           0,
           220000,
           N'Chờ thanh toán',
           to_date('2026-05-12','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 119,
           9,
           1,
           119,
           'JNT999',
           4,
           220000,
           3,
           3,
           22000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 119,
           119,
           19,
           1,
           220000,
           0,
           220000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 119,
           119,
           19,
           1,
           220000,
           0,
           220000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 119,
           119,
           2,
           220000,
           'CK_119',
           to_timestamp('2026-05-12 16:00:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 120 (trực tiếp)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 120,
           10,
           4,
           0,
           300000,
           0,
           300000,
           N'Đã thanh toán',
           to_date('2026-05-16','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   totalamount,
   orderstatus,
   shippingstatus
) values ( 120,
           10,
           4,
           120,
           300000,
           3,
           null );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 120,
           120,
           31,
           2,
           150000,
           0,
           300000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 120,
           120,
           31,
           2,
           150000,
           0,
           300000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 120,
           120,
           1,
           300000,
           null,
           to_timestamp('2026-05-16 10:45:00',
                        'YYYY-MM-DD HH24:MI:SS') );

-- Hóa đơn 121 (trực tuyến)
insert into invoice (
   invoiceid,
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status,
   invoicedate
) values ( 121,
           3,
           1,
           1,
           90000,
           0,
           90000,
           N'Chờ thanh toán',
           to_date('2026-05-20','YYYY-MM-DD') );
insert into orders (
   orderid,
   customerid,
   employeeid,
   invoiceid,
   shipcode,
   shipcompanyid,
   totalamount,
   orderstatus,
   shippingstatus,
   shippingfee
) values ( 121,
           3,
           1,
           121,
           'VNPOST1010',
           3,
           90000,
           3,
           3,
           11000 );
insert into orderdetail (
   orderdetailid,
   orderid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 121,
           121,
           20,
           3,
           30000,
           0,
           90000 );
insert into invoicedetail (
   invoicedetailid,
   invoiceid,
   productid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 121,
           121,
           20,
           3,
           30000,
           0,
           90000 );
insert into payment (
   paymentid,
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 121,
           121,
           2,
           90000,
           'CK_121',
           to_timestamp('2026-05-20 09:20:00',
                        'YYYY-MM-DD HH24:MI:SS') );

commit;
--select * from orders;

   SET SERVEROUTPUT ON;

declare
   type t_prodlist is
      table of number;
   v_directprods t_prodlist := t_prodlist(
      1,
      2,
      5,
      8,
      10,
      11,
      20,
      21,
      22,
      30,
      31
   );
   v_onlineprods t_prodlist := t_prodlist(
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31
   );
   v_invid       number := 13;
   v_ordid       number := 13;
   v_odtid       number := 13;
   v_idtid       number := 13;
   v_payid       number := 13;
   v_channel     number;
   v_cust        number;
   v_prod        number;
   v_qty         number;
   v_price       number;
   v_availstock  number;
   v_total       number;
   v_date        date;
   v_paymethod   number;
   v_shipfee     number;
   v_skip_count  number := 0;  -- đếm số hóa đơn bị bỏ qua
begin
   for i in 1..87 loop
        -- Mỗi hóa đơn được gói trong khối lồng để bắt lỗi riêng
      begin
            -- Savepoint cho hóa đơn hiện tại
         savepoint sp_invoice;

            -- Xác định kênh: lẻ = trực tiếp (0), chẵn = trực tuyến (1)
         v_channel :=
            case
               when mod(
                  i,
                  2
               ) = 1 then
                  0
               else
                  1
            end;

            -- Chọn khách hàng ngẫu nhiên (1‑10)
         v_cust := trunc(dbms_random.value(
            1,
            11
         ));

            -- Chọn sản phẩm phù hợp kho
         if v_channel = 0 then
            v_prod := v_directprods(trunc(dbms_random.value(
               1,
               v_directprods.count + 1
            )));
         else
            v_prod := v_onlineprods(trunc(dbms_random.value(
               1,
               v_onlineprods.count + 1
            )));
         end if;

            -- Số lượng 1 hoặc 2
         v_qty := trunc(dbms_random.value(
            1,
            3
         ));

            -- Lấy giá sản phẩm và tồn kho khả dụng
         if v_channel = 0 then
            select p.productprice,
                   di.availablestock
              into
               v_price,
               v_availstock
              from product p
              join detailinventory di
            on p.productid = di.productid
             where p.productid = v_prod
               and di.warehouseid = 2;
         else
            select p.productprice,
                   di.availablestock
              into
               v_price,
               v_availstock
              from product p
              join detailinventory di
            on p.productid = di.productid
             where p.productid = v_prod
               and di.warehouseid = 1;
         end if;

            -- Kiểm tra tồn kho, nếu không đủ thì bỏ qua hóa đơn này
         if v_availstock = 0 then
            raise_application_error(
               -20099,
               'Hết hàng, bỏ qua hóa đơn'
            );
         end if;
         if v_qty > v_availstock then
            v_qty := v_availstock;
         end if;
         v_total := v_qty * v_price;
         v_date := to_date ( '2026-01-01',
         'YYYY-MM-DD' ) + trunc(dbms_random.value(
            0,
            140
         ));
         v_paymethod :=
            case
               when dbms_random.value(
                  0,
                  1
               ) < 0.4 then
                  1
               else
                  2
            end;
         v_shipfee :=
            case
               when v_channel = 1 then
                  trunc(dbms_random.value(
                     10000,
                     30000
                  ))
               else
                  0
            end;

            -- Insert INVOICE
         insert into invoice (
            invoiceid,
            customerid,
            employeeid,
            salechannelcode,
            totalamount,
            taxamount,
            finalamount,
            status,
            invoicedate
         ) values ( v_invid,
                    v_cust,
                    case
                       when v_channel = 0 then
                          4
                       else
                          1
                    end,
                    v_channel,
                    v_total,
                    0,
                    v_total,
                    N'Đã thanh toán',
                    v_date );

            -- Insert ORDERS
         insert into orders (
            orderid,
            customerid,
            employeeid,
            invoiceid,
            shipcode,
            shipcompanyid,
            totalamount,
            orderstatus,
            shippingstatus,
            shippingfee
         ) values ( v_ordid,
                    v_cust,
                    case
                       when v_channel = 0 then
                          4
                       else
                          1
                    end,
                    v_invid,
                    case
                       when v_channel = 1 then
                          'AUTO'
                          || lpad(
                             v_ordid,
                             6,
                             '0'
                          )
                       else
                          null
                    end,
                    case
                       when v_channel = 1 then
                          1
                       else
                          null
                    end,
                    v_total,
                    3,
                    case
                       when v_channel = 1 then
                          3
                       else
                          null
                    end,
                    v_shipfee );

            -- Insert ORDERDETAIL
         insert into orderdetail (
            orderdetailid,
            orderid,
            productid,
            quantity,
            unitprice,
            discountamount,
            totalamount
         ) values ( v_odtid,
                    v_ordid,
                    v_prod,
                    v_qty,
                    v_price,
                    0,
                    v_total );

            -- Insert INVOICEDETAIL
         insert into invoicedetail (
            invoicedetailid,
            invoiceid,
            productid,
            quantity,
            unitprice,
            discountamount,
            totalamount
         ) values ( v_idtid,
                    v_invid,
                    v_prod,
                    v_qty,
                    v_price,
                    0,
                    v_total );

            -- Insert PAYMENT
         insert into payment (
            paymentid,
            invoiceid,
            paymentmethodid,
            amountpaid,
            referencecode,
            paymentdate
         ) values ( v_payid,
                    v_invid,
                    v_paymethod,
                    v_total,
                    case
                       when v_paymethod = 2 then
                          'CK_AUTO_' || v_invid
                       else
                          null
                    end,
                    v_date + interval '1' second * trunc(dbms_random.value(
                       0,
                       86400
                    )) );

            -- Nếu không lỗi, tăng ID
         v_invid := v_invid + 1;
         v_ordid := v_ordid + 1;
         v_odtid := v_odtid + 1;
         v_idtid := v_idtid + 1;
         v_payid := v_payid + 1;
      exception
         when others then
                -- Rollback chỉ hóa đơn này
            rollback to sp_invoice;
            v_skip_count := v_skip_count + 1;
            dbms_output.put_line('Bỏ qua hóa đơn lỗi tại vòng '
                                 || i
                                 || ': ' || sqlerrm);
                -- Không tăng ID, dùng lại ID cho lần lặp sau
      end;
   end loop;

   commit;  -- Lưu tất cả hóa đơn thành công
   dbms_output.put_line('Đã tạo '
                        || to_char(87 - v_skip_count)
                        || ' hóa đơn. Bỏ qua '
                        || v_skip_count || ' hóa đơn lỗi.');
end;