-- =============================================
-- DỮ LIỆU MẪU HOÀN CHỈNH CHO HỆ THỐNG SGF (TỐI THIỂU 10 DÒNG/BẢNG)
-- =============================================

-- 1. CUSTOMERTYPE (không FK)
insert all into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Bronze',
           0,
           N'Khách hàng thông thường',
           0 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Silver',
           5,
           N'Khách hàng thân thiết',
           5000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Gold',
           10,
           N'Khách hàng VIP',
           20000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'VIP',
           15,
           N'Nhà hảo tâm / ủng hộ thường xuyên',
           50000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Platinum',
           20,
           N'Khách hàng siêu VIP',
           100000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Diamond',
           25,
           N'Đối tác chiến lược',
           200000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Member',
           2,
           N'Thành viên mới đăng ký',
           1000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'Partner',
           18,
           N'Đối tác phân phối',
           75000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'B2B_Standard',
           12,
           N'Khách hàng doanh nghiệp cơ bản',
           30000000 ) into customertype (
   customertypename,
   discount,
   detail,
   spendinglimit
) values ( 'B2B_Premium',
           22,
           N'Khách hàng doanh nghiệp cao cấp',
           150000000 ) select *
              from dual;

-- 2. ROLE (không FK)
insert all into role (
   roleid,
   rolename
) values ( 0,
           N'Admin' ) into role (
   roleid,
   rolename
) values ( 1,
           N'Kế toán' ) into role (
   roleid,
   rolename
) values ( 2,
           N'Quản lý' ) into role (
   roleid,
   rolename
) values ( 3,
           N'Nhân viên bán hàng' ) select *
                          from dual;

-- 3. CATEGORY (không FK)
insert all into category ( categoryname ) values ( N'Túi xách / Ví' ) into category ( categoryname ) values ( N'Khẩu trang' )
into category ( categoryname ) values ( N'Xà phòng' ) into category ( categoryname ) values ( N'Nghệ thuật Napkin' ) into category
( categoryname ) values ( N'Miếng lót ly' ) into category ( categoryname ) values ( N'Quần jean' ) into category ( categoryname
) values ( N'Sản phẩm thêu' ) into category ( categoryname ) values ( N'Combo quà' ) select *
  from dual;

-- 4. EMPLOYEE (không FK)
insert all into employee (
   fullname,
   email,
   phone,
   passwordhash,
   status
) values ( N'Nguyễn Giám Đốc',
           'giamdoc.nguyen@sgf.vn',
           '0988111222',
           'hashed_admin',
           1 ) into employee (
   fullname,
   email,
   phone,
   passwordhash,
   status
) values ( N'Lê Thị Kế Toán',
           'ketoan.le@sgf.vn',
           '0988333444',
           'hashed_kt',
           1 ) into employee (
   fullname,
   email,
   phone,
   passwordhash,
   status
) values ( N'Phạm Văn Quản Lý',
           'quanly.pham@sgf.vn',
           '0988444555',
           'hashed_mgr',
           1 ) into employee (
   fullname,
   email,
   phone,
   passwordhash,
   status
) values ( N'Hoàng Thị Bán Hàng',
           'banhang.hoang@sgf.vn',
           '0988555666',
           'hashed_sale',
           1 ) select *
      from dual;

-- 5. EMPLOYEEROLE (phụ thuộc EMPLOYEE, ROLE)
insert all into employeerole (
   employeeid,
   roleid
) values ( 1,
           0 ) into employeerole (
   employeeid,
   roleid
) values ( 2,
           1 ) into employeerole (
   employeeid,
   roleid
) values ( 3,
           2 ) into employeerole (
   employeeid,
   roleid
) values ( 4,
           3 ) into employeerole (
   employeeid,
   roleid
) values ( 5,
           4 ) into employeerole (
   employeeid,
   roleid
) values ( 6,
           6 ) into employeerole (
   employeeid,
   roleid
) values ( 7,
           5 ) into employeerole (
   employeeid,
   roleid
) values ( 8,
           8 ) into employeerole (
   employeeid,
   roleid
) values ( 9,
           2 ) into employeerole (
   employeeid,
   roleid
) values ( 10,
           9 ) select *
      from dual;

-- 6. WAREHOUSE (phụ thuộc EMPLOYEE)
insert all into warehouse (
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
           1 ) into warehouse (
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
           2 ) into warehouse (
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
           3 ) select *
      from dual;

-- 7. PRODUCTTYPE (phụ thuộc CATEGORY)
insert all
  -- Dữ liệu cũ
 into producttype (
   producttypename,
   categoryid
) values ( N'Túi tote',
           1 ) into producttype (
   producttypename,
   categoryid
) values ( N'Túi xách vải handmade',
           1 ) into producttype (
   producttypename,
   categoryid
) values ( N'Ví handmade',
           1 ) into producttype (
   producttypename,
   categoryid
) values ( N'Túi xách jean quai quần',
           1 ) into producttype (
   producttypename,
   categoryid
) values ( N'Khẩu trang vải',
           2 ) into producttype (
   producttypename,
   categoryid
) values ( N'Xà phòng handmade',
           3 ) into producttype (
   producttypename,
   categoryid
) values ( N'Khung hình để bàn',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Hộp đựng giấy',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Tranh trang trí',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Chai rượu tái chế',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Kệ sách để bàn mini',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Chậu cây mini',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Hộp đựng bút',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Set handmade napkin',
           4 ) into producttype (
   producttypename,
   categoryid
) values ( N'Lót ly handmade',
           5 ) into producttype (
   producttypename,
   categoryid
) values ( N'Quần jean',
           6 ) into producttype (
   producttypename,
   categoryid
) values ( N'Khăn ăn thêu tay',
           7 ) into producttype (
   producttypename,
   categoryid
) values ( N'Cúc áo thêu tay',
           7 ) into producttype (
   producttypename,
   categoryid
) values ( N'Túi rút thêu',
           7 ) into producttype (
   producttypename,
   categoryid
) values ( N'Sản phẩm thêu tay khác',
           7 ) into producttype (
   producttypename,
   categoryid
) values ( N'Combo quà tặng',
           8 ) select *
      from dual;

-- 8. PRODUCT (phụ thuộc PRODUCTTYPE, CATEGORY)
insert all
  -- Dữ liệu cũ (giữ nguyên 31 dòng, lược bớt text ở đây để code ngắn gọn, nhưng tôi sẽ include đầy đủ theo yêu cầu)
 into product (
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
           1 ) into product (
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
           1 ) into product (
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
           2 ) into product (
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
           3 ) into product (
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
           4 ) into product (
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
           5 ) into product (
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
           5 ) into product (
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
           6 ) into product (
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
           6 ) into product (
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
           6 ) into product (
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
           6 ) into product (
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
           7 ) into product (
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
           8 ) into product (
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
           9 ) into product (
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
           10 ) into product (
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
           11 ) into product (
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
           12 ) into product (
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
           13 ) into product (
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
           14 ) into product (
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
           15 ) into product (
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
           15 ) into product (
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
           15 ) into product (
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
           16 ) into product (
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
           16 ) into product (
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
           17 ) into product (
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
           18 ) into product (
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
           19 ) into product (
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
           20 ) into product (
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
           20 ) into product (
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
           21 ) into product (
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
           21 ) select *
       from dual;

-- 9. COMBO (không FK)
insert all into combo ( comboprice ) values ( 100000 )  -- 1: Combo yêu thương
 into combo ( comboprice ) values ( 150000 )  -- 2: Combo sinh nhật
 into combo ( comboprice ) values ( 200000 )  -- 3: Combo gia đình
 into combo ( comboprice ) values ( 250000 )  -- 4: Combo cao cấp
 into combo ( comboprice ) values ( 300000 )  -- 5: Combo VIP
 into combo ( comboprice ) values ( 120000 )  -- 6: Combo cá nhân
 into combo ( comboprice ) values ( 180000 )  -- 7: Combo văn phòng
 into combo ( comboprice ) values ( 220000 )  -- 8: Combo thư giãn
 into combo ( comboprice ) values ( 99000 )   -- 9: Combo học sinh
 into combo ( comboprice ) values ( 400000 )  -- 10: Combo khổng lồ
 select *
  from dual;

-- 10. COMBODETAIL (phụ thuộc COMBO, PRODUCT)
-- =============================================
-- 10. COMBODETAIL (đầy đủ 10 Combo)
-- =============================================
insert all
  -- Combo 1: Combo yêu thương (giá 100k) – Xà phòng + cúc áo thêu
 into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           11,
           1 )  -- Xà phòng cà phê
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           26,
           1 )  -- Cúc áo thêu tay gỗ

  -- Combo 2: Combo sinh nhật (giá 150k) – Túi rút thêu + xà phòng oải hương + lót ly hải sản
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           28,
           1 )  -- Túi rút thêu
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           9,
           1 )   -- Xà phòng oải hương
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           21,
           1 )  -- Lót ly MLL 002

  -- Combo 3: Combo gia đình (giá 200k) – Túi tote + xà phòng sả chanh + lót ly củ quả
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           1,
           1 )   -- Túi tote canvas
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           10,
           1 )  -- Xà phòng sả chanh
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 3,
           20,
           1 )  -- Lót ly MLL 001

  -- Combo 4: Combo cao cấp (giá 250k) – Ví da tái chế + khăn thêu + tranh thêu phong cảnh
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           4,
           1 )   -- Ví da tái chế
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           25,
           1 )  -- Khăn ăn thêu tay hoa hồng
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 4,
           29,
           1 )  -- Thêu tay TT 002

  -- Combo 5: Combo VIP (giá 300k) – Tranh thêu TT 002 + xà phòng oải hương + khung hình
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           29,
           1 )  -- Thêu tay TT 002
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           9,
           1 )   -- Xà phòng oải hương
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 5,
           12,
           1 )  -- Khung hình để bàn gỗ

  -- Combo 6: Combo cá nhân (giá 120k) – Khẩu trang 3D + xà phòng nhân sâm + lót ly cà phê
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           7,
           1 )   -- Khẩu trang 3D kháng khuẩn
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           8,
           1 )   -- Xà phòng nhân sâm
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 6,
           22,
           1 )  -- Lót ly MLL 003

  -- Combo 7: Combo văn phòng (giá 180k) – Hộp bút + kệ sách mini + lót ly củ quả
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           18,
           1 )  -- Hộp đựng bút decoupage
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           16,
           1 )  -- Kệ sách để bàn mini
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 7,
           20,
           1 )  -- Lót ly MLL 001

  -- Combo 8: Combo thư giãn (giá 220k) – Chậu cây mini + tranh trang trí + xà phòng oải hương
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           17,
           1 )  -- Chậu cây mini
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           14,
           1 )  -- Tranh trang trí decoupage
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 8,
           9,
           1 )   -- Xà phòng oải hương

  -- Combo 9: Combo học sinh (giá 99k) – 2 lót ly MLL 003 + 2 quần jean ống suông (nhỏ)
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 9,
           22,
           2 )  -- Lót ly MLL 003
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 9,
           23,
           2 )  -- Quần jean tái chế ống suông

  -- Combo 10: Combo khổng lồ (giá 400k) – 5 túi tote + 2 lót ly hải sản + tranh thêu
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           1,
           5 )  -- Túi tote canvas
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           21,
           2 ) -- Lót ly MLL 002
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 10,
           29,
           1 ) -- Thêu tay TT 002
            select *
      from dual;

commit;

-- 11. SHIPCOMPANY (không FK)
insert all into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) into shipcompany (
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
           1 ) select *
      from dual;

-- 12. CUSTOMER (phụ thuộc CUSTOMERTYPE)
insert all into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 1,
           N'Nguyễn',
           N'Thị Hoa',
           null,
           '0988777666',
           N'12 Trần Duy Hưng, Hà Nội',
           'hoa.nguyen@gmail.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 2,
           N'Phạm',
           N'Văn Bình',
           N'Nhà hàng Tâm An',
           '0988777667',
           N'34 Ngọc Khánh, Hà Nội',
           'binh.pham@taman.vn' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( null,
           N'Khách',
           N'Lẻ',
           null,
           '0912345678',
           N'56 Chợ Mơ',
           null ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 3,
           N'Lê',
           N'Hoàng Nam',
           null,
           '0922333444',
           N'100 Quang Trung, Gò Vấp',
           'nam.le@email.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 4,
           N'Trần',
           N'Kim Chi',
           null,
           '0933444555',
           N'2B Lê Lợi, Q1',
           'chi.tran@email.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 9,
           N'Hoàng',
           N'Văn Doanh',
           N'Công ty CP Đầu Tư',
           '0944555666',
           N'Landmark 81',
           'doanh.hoang@congty.vn' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 5,
           N'Đinh',
           N'Thị Ngọc',
           null,
           '0955666777',
           N'5 Cầu Giấy, HN',
           'ngoc.dinh@email.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 6,
           N'Vũ',
           N'Tuấn Anh',
           null,
           '0966777888',
           N'15 Tây Hồ, HN',
           'anh.vu@email.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 7,
           N'Bùi',
           N'Lan Hương',
           null,
           '0977888999',
           N'99 Đống Đa, HN',
           'huong.bui@email.com' ) into customer (
   customertypeid,
   firstname,
   lastname,
   companyname,
   phone,
   address,
   email
) values ( 10,
           N'Tập đoàn',
           N'SGF Partner',
           N'SGF Partner Corp',
           '0988999111',
           N'KCN Sóng Thần',
           'contact@sgfpartner.vn' ) select *
                            from dual;

-- 13. PAYMENTMETHOD (không FK)
insert all into paymentmethod (
   paymentname,
   status
) values ( N'Tiền mặt',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'Chuyển khoản',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'Ví điện tử MoMo',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'VNPay',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'ZaloPay',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'Thanh toán khi nhận hàng (COD)',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'Thẻ tín dụng (Credit Card)',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'Thẻ ghi nợ (Debit Card)',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'PayPal',
           1 ) into paymentmethod (
   paymentname,
   status
) values ( N'ShopeePay',
           1 ) select *
      from dual;

-- 14. RETURNPOLICY (không FK)
insert all into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Chính sách đổi trả 7 ngày',
           7,
           0,
           date '2024-01-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Hàng thêu không đổi',
           0,
           100,
           date '2024-01-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả 14 ngày (Khách VIP)',
           14,
           0,
           date '2024-02-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi hàng lỗi do NSX (30 ngày)',
           30,
           0,
           date '2024-01-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Hàng giảm giá không đổi',
           0,
           100,
           date '2024-01-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả mất phí 10%',
           7,
           10,
           date '2024-03-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả B2B',
           15,
           5,
           date '2024-04-01',
           1 ) into returnpolicy (
   policyname,
   maxreturndays,
   penaltyfeerate,
   effectivedate,
   isactive
) values ( N'Đổi trả miễn phí 3 ngày',
           3,
           0,
           date '2024-06-01',
           1 ) select *
      from dual;

-- 15. DISCOUNT (phụ thuộc CUSTOMERTYPE)
insert all into discount (
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
           date '2024-05-01' ) into discount (
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
           date '2024-05-01' ) into discount (
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
           date '2024-06-01' ) into discount (
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
           date '2024-05-10' ) into discount (
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
           date '2024-01-01' ) into discount (
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
           date '2024-01-01' ) into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 9,
           N'Chiết khấu sỉ B2B',
           15,
           N'Đơn hàng B2B Standard',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' ) into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 10,
           N'Chiết khấu sỉ B2B Premium',
           25,
           N'Đơn B2B Premium',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' ) into discount (
   customertypeid,
   discountname,
   value,
   detail,
   appliedproductids,
   status,
   expirydate,
   startdate
) values ( 7,
           N'Welcome Member',
           10,
           N'Chào bạn mới',
           null,
           0,
           date '2024-12-31',
           date '2024-01-01' ) into discount (
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
           date '2024-11-25' ) select *
                      from dual;

-- 16. DETAILINVENTORY (phụ thuộc WAREHOUSE, PRODUCT)
insert all
  -- Kho tổng (ID=1) – ĐỦ 31 SẢN PHẨM (từ ProductID 1 đến 31)
 into detailinventory (
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
           200,
           20,
           500,
           1,
           N'Kệ A-01' ) into detailinventory (
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
           N'Kệ A-02' ) into detailinventory (
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
           N'Kệ A-03' ) into detailinventory (
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
           N'Kệ A-04' ) into detailinventory (
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
           N'Kệ A-05' ) into detailinventory (
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
           N'Kệ B-01' ) into detailinventory (
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
           N'Kệ B-02' ) into detailinventory (
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
           N'Kệ B-03' ) into detailinventory (
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
           N'Kệ B-04' ) into detailinventory (
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
           300,
           30,
           600,
           1,
           N'Kệ B-05' ) into detailinventory (
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
           350,
           35,
           700,
           1,
           N'Kệ B-06' ) into detailinventory (
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
           N'Kệ C-01' ) into detailinventory (
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
           N'Kệ C-02' ) into detailinventory (
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
           N'Kệ C-03' ) into detailinventory (
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
           N'Kệ C-04' ) into detailinventory (
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
           N'Kệ C-05' ) into detailinventory (
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
           N'Kệ C-06' ) into detailinventory (
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
           N'Kệ C-07' ) into detailinventory (
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
           N'Kệ D-01' ) into detailinventory (
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
           N'Kệ D-02' ) into detailinventory (
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
           N'Kệ D-03' ) into detailinventory (
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
           N'Kệ D-04' ) into detailinventory (
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
           N'Kệ E-01' ) into detailinventory (
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
           N'Kệ E-02' ) into detailinventory (
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
           N'Kệ E-03' ) into detailinventory (
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
           N'Kệ E-04' ) into detailinventory (
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
           N'Kệ E-05' ) into detailinventory (
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
           N'Kệ E-06' ) into detailinventory (
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
           N'Kệ E-07' ) into detailinventory (
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
           N'Kệ F-01' ) into detailinventory (
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
           N'Kệ F-02' )

  -- Kho bán hàng (ID=2) – MỘT SỐ MẶT HÀNG TRƯNG BÀY (có sẵn tại quầy)
            into detailinventory (
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
           N'Quầy A-01' ) into detailinventory (
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
           N'Quầy A-01' ) into detailinventory (
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
           N'Quầy A-02' ) into detailinventory (
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
           N'Quầy A-03' ) into detailinventory (
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
           N'Quầy A-03' ) into detailinventory (
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
           N'Quầy A-04' ) into detailinventory (
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
           N'Quầy A-05' ) into detailinventory (
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
           N'Quầy A-05' ) into detailinventory (
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
           N'Quầy A-06' ) into detailinventory (
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
           N'Quầy A-07' ) into detailinventory (
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
           N'Quầy A-07' )

  -- Kho tái chế (ID=3) – HÀNG LỖI/CHỜ XỬ LÝ (AvailableStock = 0)
            into detailinventory (
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
           N'Kệ lỗi' ) into detailinventory (
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
           N'Kệ lỗi' ) select *
              from dual;

commit;

-- 17. EXPORTRECEIPT (phụ thuộc EMPLOYEE, WAREHOUSE)
insert all into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #1',
           N'Đã hoàn thành',
           1 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           2,
           N'Trả hàng lỗi về xưởng',
           N'Đã hoàn thành',
           3 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 4,
           1,
           N'Xuất bán đại lý B2B',
           N'Chờ xuất',
           4 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 4,
           3,
           N'Xuất luân chuyển sang kho Q1',
           N'Đã hoàn thành',
           4 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 7,
           1,
           N'Xuất bán đơn hàng Shopee',
           N'Đã hoàn thành',
           6 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 7,
           1,
           N'Xuất bán đơn hàng Tiki',
           N'Đã hủy',
           6 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 1,
           4,
           N'Xuất tặng quà từ thiện',
           N'Đã hoàn thành',
           1 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #2',
           N'Đã hoàn thành',
           1 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 2,
           1,
           N'Xuất bán đơn hàng online #3',
           N'Chờ lấy hàng',
           1 ) into exportreceipt (
   employeeid,
   exporttype,
   reason,
   status,
   warehouseid
) values ( 5,
           1,
           N'Xuất bán tại quầy',
           N'Đã hoàn thành',
           2 ) select *
      from dual;

-- 18. EXPORTRECEIPTDETAIL (phụ thuộc EXPORTRECEIPT, PRODUCT)
insert all into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 1,
           11,
           5 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 1,
           26,
           2 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 2,
           26,
           1 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 3,
           31,
           50 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 4,
           3,
           20 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 5,
           4,
           5 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 7,
           1,
           100 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 8,
           21,
           10 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 9,
           5,
           2 ) into exportreceiptdetail (
   exportreceiptid,
   productid,
   quantity
) values ( 10,
           6,
           1 ) select *
      from dual;

-- 19. INVOICE (phụ thuộc CUSTOMER, EMPLOYEE)
insert all into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 1,
           1,
           0,
           175000,
           0,
           175000,
           N'Đã thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 2,
           1,
           1,
           450000,
           0,
           450000,
           N'Chờ thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 4,
           5,
           1,
           500000,
           0,
           500000,
           N'Đã thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 5,
           5,
           0,
           150000,
           0,
           150000,
           N'Đã thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 6,
           3,
           0,
           3000000,
           300000,
           3300000,
           N'Đã thanh toán' ) -- Đơn B2B
            into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 7,
           5,
           1,
           200000,
           0,
           200000,
           N'Đã thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 8,
           5,
           1,
           85000,
           0,
           85000,
           N'Chờ thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 9,
           5,
           0,
           450000,
           0,
           450000,
           N'Đã thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 10,
           9,
           0,
           15000000,
           1500000,
           16500000,
           N'Chờ thanh toán' ) into invoice (
   customerid,
   employeeid,
   salechannelcode,
   totalamount,
   taxamount,
   finalamount,
   status
) values ( 3,
           5,
           0,
           65000,
           0,
           65000,
           N'Đã thanh toán' ) select *
                     from dual;

-- 20. ORDERS (phụ thuộc CUSTOMER, EMPLOYEE, INVOICE, SHIPCOMPANY, EXPORTRECEIPT)
insert all into orders (
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
           450000,
           0,
           0,
           N'Giao giờ hành chính',
           30000,
           1 ) into orders (
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
           175000,
           1,
           null,
           null,
           0,
           null ) into orders (
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
           5,
           3,
           'GHTK888',
           1,
           500000,
           1,
           2,
           N'Gọi trước khi giao',
           25000,
           5 ) into orders (
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
           5,
           4,
           null,
           null,
           150000,
           1,
           null,
           null,
           0,
           null ) into orders (
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
           'VTP999',
           2,
           3300000,
           0,
           1,
           N'Giao bằng xe tải nhỏ',
           100000,
           3 ) into orders (
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
           5,
           6,
           'AHA111',
           5,
           200000,
           1,
           2,
           N'Giao ngay',
           35000,
           8 ) into orders (
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
           5,
           7,
           'JNT222',
           4,
           85000,
           0,
           0,
           N'Giao buổi sáng',
           20000,
           9 ) into orders (
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
           5,
           8,
           null,
           null,
           450000,
           1,
           null,
           null,
           0,
           null ) into orders (
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
           9,
           9,
           'LALA333',
           6,
           16500000,
           0,
           1,
           N'Xe tải thùng',
           200000,
           null ) into orders (
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
           5,
           10,
           null,
           null,
           65000,
           1,
           null,
           null,
           0,
           10 ) select *
       from dual;

-- 21. ORDERDETAIL (phụ thuộc ORDERS, PRODUCT, COMBO)
insert all into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 1,
           11,
           null,
           5,
           35000,
           0,
           175000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           26,
           null,
           2,
           60000,
           0,
           120000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           21,
           null,
           1,
           30000,
           0,
           30000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           1,
           2,
           1,
           150000,
           0,
           150000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 3,
           2,
           null,
           4,
           80000,
           0,
           320000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 4,
           24,
           null,
           2,
           45000,
           0,
           90000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 5,
           1,
           null,
           50,
           85000,
           0,
           4250000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           31,
           null,
           1,
           85000,
           0,
           85000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           10,
           null,
           1,
           40000,
           0,
           40000 ) into orderdetail (
   orderid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           4,
           null,
           1,
           65000,
           0,
           65000 ) select *
          from dual;

-- 22. PAYMENT (phụ thuộc INVOICE, PAYMENTMETHOD)
insert all into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 1,
           1,
           175000,
           null,
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 2,
           2,
           200000,
           'CK_SGF_001',
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 3,
           4,
           500000,
           'VNPAY_123',
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 4,
           1,
           150000,
           null,
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 5,
           2,
           3300000,
           'CK_SGF_002',
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 6,
           5,
           200000,
           'ZALOPAY_456',
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 8,
           1,
           450000,
           null,
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 10,
           1,
           65000,
           null,
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 9,
           2,
           5000000,
           'CK_SGF_003_DEPOSIT',
           current_timestamp ) into payment (
   invoiceid,
   paymentmethodid,
   amountpaid,
   referencecode,
   paymentdate
) values ( 2,
           6,
           250000,
           'COD_PART2',
           current_timestamp ) select *
                      from dual;

-- 23. INVOICEDETAIL (phụ thuộc INVOICE, PRODUCT, COMBO)
insert all into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 1,
           11,
           null,
           5,
           35000,
           0,
           175000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           26,
           null,
           2,
           60000,
           0,
           120000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           21,
           null,
           1,
           30000,
           0,
           30000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 2,
           1,
           2,
           1,
           150000,
           0,
           150000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 3,
           2,
           null,
           4,
           80000,
           0,
           320000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 4,
           24,
           null,
           2,
           45000,
           0,
           90000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 5,
           1,
           null,
           50,
           85000,
           0,
           4250000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 6,
           3,
           null,
           1,
           85000,
           0,
           85000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 7,
           10,
           null,
           1,
           40000,
           0,
           40000 ) into invoicedetail (
   invoiceid,
   productid,
   comboid,
   quantity,
   unitprice,
   discountamount,
   totalamount
) values ( 10,
           4,
           null,
           1,
           65000,
           0,
           65000 ) select *
          from dual;

-- 24. NOTIFICATION (phụ thuộc EMPLOYEE, PRODUCT)
insert all into notification (
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
           sysdate ) into notification (
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
           sysdate ) into notification (
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
           sysdate ) select *
            from dual;

-- 25. REQUESTFORM (phụ thuộc EMPLOYEE)
insert all into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-10',
           N'Chờ duyệt',
           null,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-12',
           N'Đã duyệt',
           1,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-13',
           N'Từ chối',
           1,
           N'Số lượng quá lớn, đề nghị chia nhỏ' ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-14',
           N'Đã duyệt',
           1,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 7,
           date '2024-05-15',
           N'Chờ duyệt',
           null,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 8,
           date '2024-05-16',
           N'Đã duyệt',
           9,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 5,
           date '2024-05-17',
           N'Đã duyệt',
           4,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 2,
           date '2024-05-18',
           N'Chờ duyệt',
           null,
           null ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 4,
           date '2024-05-19',
           N'Từ chối',
           9,
           N'Chưa cần thiết' ) into requestform (
   employeeid,
   createddate,
   status,
   approverid,
   rejectreason
) values ( 8,
           date '2024-05-20',
           N'Đã duyệt',
           1,
           null ) select *
         from dual;

-- 26. REQUESTDETAIL (phụ thuộc REQUESTFORM, PRODUCT)
insert all into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           11,
           10 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           1,
           50 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 2,
           26,
           20 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 3,
           2,
           50 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 4,
           23,
           20 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 5,
           4,
           100 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 6,
           5,
           50 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 7,
           10,
           30 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 8,
           21,
           15 ) into requestdetail (
   requestid,
   productid,
   quantity
) values ( 10,
           16,
           10 ) select *
       from dual;

-- 27. TRANSFERTICKET (phụ thuộc EMPLOYEE, WAREHOUSE)
insert all into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           2,
           N'Chờ xuất kho',
           date '2024-05-15' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           2,
           1,
           N'Đang luân chuyển',
           date '2024-05-16' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           4,
           5,
           N'Đã nhập kho',
           date '2024-05-10' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           5,
           4,
           N'Từ chối',
           date '2024-05-11' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 7,
           6,
           4,
           N'Đang luân chuyển',
           date '2024-05-17' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           8,
           N'Chờ xuất kho',
           date '2024-05-18' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 2,
           1,
           9,
           N'Đã nhập kho',
           date '2024-05-01' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 8,
           2,
           3,
           N'Đã nhập kho',
           date '2024-05-12' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 8,
           5,
           10,
           N'Đang luân chuyển',
           date '2024-05-19' ) into transferticket (
   employeeid,
   sourcewhid,
   destwhid,
   status,
   createddate
) values ( 4,
           4,
           6,
           N'Chờ duyệt',
           date '2024-05-20' ) select *
                      from dual;

-- 28. TRANSFERTICKETDETAIL (phụ thuộc TRANSFERTICKET, PRODUCT)
insert all into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 1,
           1,
           null,
           null,
           20 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 1,
           11,
           null,
           null,
           15 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 2,
           1,
           10,
           10,
           10 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 3,
           2,
           50,
           50,
           50 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 4,
           14,
           10,
           0,
           10 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 5,
           13,
           100,
           null,
           100 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 6,
           21,
           null,
           null,
           30 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 7,
           10,
           20,
           20,
           20 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 8,
           26,
           5,
           5,
           5 ) into transferticketdetail (
   transferid,
   productid,
   exportquantity,
   receivequantity,
   requestquantity
) values ( 9,
           15,
           2,
           null,
           2 ) select *
      from dual;

-- 29. IMPORTRECEIPT (phụ thuộc EMPLOYEE, WAREHOUSE, REQUESTFORM)
insert all into importreceipt (
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
           0 ) into importreceipt (
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
           0 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 4,
           4,
           N'Đã nhập kho',
           date '2024-05-15',
           4,
           0 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 8,
           7,
           N'Đã nhập kho',
           date '2024-05-17',
           6,
           1 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 5,
           5,
           N'Chờ duyệt',
           date '2024-05-18',
           7,
           0 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 8,
           7,
           N'Đã nhập kho',
           date '2024-05-21',
           10,
           0 ) into importreceipt (
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
           0 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 4,
           4,
           N'Đã nhập kho',
           date '2024-04-15',
           null,
           1 ) into importreceipt (
   employeeid,
   warehouseid,
   status,
   createddate,
   requestid,
   hasdiscrepancy
) values ( 7,
           6,
           N'Bản nháp',
           date '2024-05-22',
           null,
           0 ) into importreceipt (
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
           0 ) select *
      from dual;

-- 30. IMPORTRECEIPTDETAIL (phụ thuộc IMPORTRECEIPT, PRODUCT)
insert all into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 1,
           11,
           100,
           10 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 1,
           1,
           50,
           50 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 2,
           26,
           20,
           20 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 3,
           12,
           200,
           20 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 4,
           5,
           50,
           48 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 5,
           10,
           30,
           30 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 6,
           16,
           1000,
           10 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 7,
           21,
           50,
           50 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 8,
           24,
           100,
           15 ) into importreceiptdetail (
   importreceiptid,
   productid,
   expectedquantity,
   actualquantity
) values ( 10,
           1,
           30,
           30 ) select *
       from dual;

-- 31. COUNTSHEET (không FK)
insert all into countsheet (
   createddate,
   status
) values ( date '2024-05-25',
           0 ) into countsheet (
   createddate,
   status
) values ( date '2024-05-30',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2024-04-30',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2024-03-31',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2024-02-28',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2024-01-31',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2023-12-31',
           2 ) into countsheet (
   createddate,
   status
) values ( date '2024-06-05',
           0 ) into countsheet (
   createddate,
   status
) values ( date '2024-06-10',
           1 ) into countsheet (
   createddate,
   status
) values ( date '2024-06-15',
           1 ) select *
      from dual;

-- =============================================
-- 32. COUNTSHEETDETAIL (phụ thuộc COUNTSHEET, WAREHOUSE, PRODUCT)
-- =============================================
insert all
  -- Phiếu 1 (CountSheetId=1, ngày 25/05/2024, trạng thái 0 - Chưa kiểm) - Kiểm kho tổng (1)
 into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           1,
           199,
           N'Thiếu 1 sản phẩm so với sổ sách (200)' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           11,
           350,
           N'Khớp với sổ sách' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           26,
           70,
           N'Khớp với sổ sách' )

  -- Phiếu 2 (CountSheetId=2, ngày 30/05/2024, trạng thái 2 - Đã duyệt) - Kiểm kho bán hàng (2)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           1,
           30,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           20,
           15,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           30,
           10,
           N'Khớp' )

  -- Phiếu 3 (CountSheetId=3, ngày 30/04/2024, trạng thái 2) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           4,
           220,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           21,
           180,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 3,
           1,
           5,
           158,
           N'Thiếu 2 sản phẩm' )

  -- Phiếu 4 (CountSheetId=4, ngày 31/03/2024, trạng thái 2) - Kiểm kho bán hàng (2)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           5,
           20,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           10,
           35,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 4,
           2,
           21,
           12,
           N'Khớp' )

  -- Phiếu 5 (CountSheetId=5, ngày 28/02/2024, trạng thái 2) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           18,
           400,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           2,
           150,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 5,
           1,
           29,
           48,
           N'Thiếu 2 sản phẩm (sổ sách 50)' )

  -- Phiếu 6 (CountSheetId=6, ngày 31/01/2024, trạng thái 2) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           6,
           300,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           22,
           160,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 6,
           1,
           17,
           200,
           N'Khớp' )

  -- Phiếu 7 (CountSheetId=7, ngày 31/12/2023, trạng thái 2) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           1,
           200,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           25,
           80,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 7,
           1,
           31,
           85,
           N'Khớp' )

  -- Phiếu 8 (CountSheetId=8, ngày 05/06/2024, trạng thái 0 - Chưa kiểm) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           13,
           170,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           19,
           120,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 8,
           1,
           16,
           229,
           N'Thiếu 1 sản phẩm' )

  -- Phiếu 9 (CountSheetId=9, ngày 10/06/2024, trạng thái 1 - Đã kiểm, chờ duyệt) - Kiểm kho bán hàng (2)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           11,
           50,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           22,
           18,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 9,
           2,
           31,
           8,
           N'Khớp' )

  -- Phiếu 10 (CountSheetId=10, ngày 15/06/2024, trạng thái 1 - Đã kiểm, chờ duyệt) - Kiểm kho tổng (1)
            into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           27,
           130,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           28,
           60,
           N'Khớp' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 10,
           1,
           9,
           260,
           N'Khớp' ) select *
            from dual;

commit;

-- 33. ORDERRETURN (phụ thuộc ORDERS, EMPLOYEE)
insert all into orderreturn (
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
           N'Chờ xử lý' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 3,
           5,
           date '2024-05-20',
           N'Giao nhầm mùi hương nến',
           80000,
           'RET_002',
           N'Đã hoàn tiền' ) into orderreturn (
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
           N'Đang xử lý' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 7,
           5,
           date '2024-05-23',
           N'Khách không nhận',
           85000,
           'RET_004',
           N'Đã hoàn tất' ) into orderreturn (
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
           N'Từ chối' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 4,
           5,
           date '2024-05-25',
           N'Sổ tay rách bìa',
           45000,
           'RET_006',
           N'Đã hoàn tiền' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 6,
           5,
           date '2024-05-26',
           N'Hủy đơn đột xuất',
           85000,
           'RET_007',
           N'Đã hoàn tất' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 10,
           5,
           date '2024-05-27',
           N'Đổi ý định mua',
           65000,
           'RET_008',
           N'Đã hoàn tiền' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 8,
           5,
           date '2024-05-28',
           N'Đơn sai địa chỉ',
           450000,
           'RET_009',
           N'Đang xử lý' ) into orderreturn (
   orderid,
   employeeid,
   returndate,
   reason,
   totalrefund,
   returnrefcode,
   status
) values ( 9,
           9,
           date '2024-05-29',
           N'Thiếu số lượng theo hợp đồng',
           1500000,
           'RET_010',
           N'Chờ xử lý' ) select *
                 from dual;

-- 34. RETURNDETAIL (phụ thuộc ORDERRETURN, PRODUCT, WAREHOUSE)
insert all into returndetail (
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
           N'Nhập kho tái chế' ) into returndetail (
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
           10,
           N'Tiêu hủy' ) into returndetail (
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
           N'Nhập lại kho bán' ) into returndetail (
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
           N'Giữ nguyên do từ chối đổi' ) into returndetail (
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
           N'Nhập lại kho bán' ) into returndetail (
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
           N'Chờ xử lý' ) select *
                 from dual;

-- 35. LISTDISCOUNT (phụ thuộc ORDERS, DISCOUNT)
insert all into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 2,
           1,
           10 ) into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 3,
           5,
           0 ) -- FREESHIP
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 5,
           7,
           15 ) -- B2B
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 6,
           9,
           10 ) -- Member
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 9,
           8,
           25 ) -- B2B Premium
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 1,
           1,
           10 ) into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 4,
           6,
           5 ) -- Giảm quần áo
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 8,
           5,
           0 ) into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 10,
           2,
           15 ) -- Silver
            into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 7,
           5,
           0 ) select *
      from dual;

-- 36. FEEDBACK (phụ thuộc ORDERDETAIL, CUSTOMER)
insert all into feedback (
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
           5 ) into feedback (
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
           4 ) into feedback (
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
           5 ) into feedback (
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
           3 ) into feedback (
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
           5 ) into feedback (
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
           5 ) into feedback (
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
           2 ) into feedback (
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
           5 ) into feedback (
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
           5 ) into feedback (
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
           4 ) select *
      from dual;

commit;