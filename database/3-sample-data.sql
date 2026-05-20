ALTER SESSION SET CONTAINER = FREEPDB1;
ALTER SESSION SET CURRENT_SCHEMA = sgf_admin;

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

select *
  from customertype;
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
select * from employee;

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

select *
  from employeerole;

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

select *
  from warehouse;

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

select *
  from producttype;

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

select *
  from product;

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

select *
  from combo;

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

select *
  from combodetail;

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

select *
  from shipcompany;

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

select *
  from customer;

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

select *
  from paymentmethod;

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

select *
  from returnpolicy;

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

select *
  from discount;

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

select *
  from detailinventory;

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

select *
  from exportreceipt;

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

select *
  from exportreceiptdetail;

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

select *
  from invoice;

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

select *
  from orders;

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
           2,
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
           3,
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

select *
  from orderdetail;

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


select *
  from invoicedetail;
alter table invoicedetail modify (
   invoicedetailid generated by default as identity ( start with 1 )
);
truncate table invoicedetail;

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

select *
  from payment;

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

select *
  from notification;

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

select *
  from requestform;


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

select *
  from requestdetail;

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

select *
  from transferticket;


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

select *
  from transferticketdetail;

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
           N'Đã hoàn thành',
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
           N'Đã hoàn thành',
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
           N'Đã hoàn thành',
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
           N'Bản nháp',
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
           N'Đã hoàn thành',
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
           N'Đã hoàn thành',
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
           N'Đã hoàn thành',
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
           N'Đã hoàn thành',
           date '2024-05-23',
           null,
           0 );

select *
  from importreceipt;

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

select *
  from importreceiptdetail;

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

select *
  from countsheet;

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

select *
  from countsheetdetail;

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
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 10,
           4,
           date '2024-05-27',
           N'Đổi ý định mua',
           65000,
           'RET_008',
           N'Đã hoàn tiền' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 8,
           4,
           date '2024-05-28',
           N'Đơn sai địa chỉ',
           450000,
           'RET_009',
           N'Đang xử lý' );
insert into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 9,
           1,
           date '2024-05-29',
           N'Thiếu số lượng theo hợp đồng',
           1500000,
           'RET_010',
           N'Chờ xử lý' );

select *
  from orderreturn;

-- =============================================
-- 34. RETURNDETAIL (6 dòng, TargetWarehouseID 1-3)
-- =============================================
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 1,
           21,
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
) values ( 3,
           1,
           2,
           N'Hư hỏng nặng',
           3,
           N'Tiêu hủy' );
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 4,
           10,
           1,
           N'Còn nguyên vẹn',
           2,
           N'Nhập lại kho bán' );
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 5,
           11,
           1,
           N'Bình thường',
           1,
           N'Giữ nguyên do từ chối đổi' );
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 8,
           4,
           1,
           N'Còn nguyên vẹn',
           2,
           N'Nhập lại kho bán' );
insert into returndetail (
   returnid,
   productid,
   quantity,
   qc_status,
   targetwarehouseid,
   actiontaken
) values ( 9,
           1,
           5,
           N'Còn nguyên vẹn',
           1,
           N'Chờ xử lý' );

select *
  from returndetail;

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

select *
  from listdiscount;

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

select *
  from feedback;

commit;
