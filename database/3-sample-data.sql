-- =============================================
-- DỮ LIỆU MẪU CHO HỆ THỐNG SGF
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
           50000000 ) select *
             from dual;

-- 2. ROLE (không FK)
insert all into role (
   roleid,
   rolename
) values ( 0,
           'Admin' ) into role (
   roleid,
   rolename
) values ( 1,
           N'Thủ kho' ) into role (
   roleid,
   rolename
) values ( 2,
           N'Kế toán' ) select *
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
) values ( N'Nguyễn Văn Hòa',
           'hoa.nguyen@sgf.vn',
           '0988111222',
           'hashed_admin',
           1 ) into employee (
   fullname,
   email,
   phone,
   passwordhash,
   status
) values ( N'Trần Thị Nhân Ái',
           'ai.tran@sgf.vn',
           '0988222333',
           'hashed_kho',
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
           2 ) select *
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
           N'123 Láng Hạ, Đống Đa, Hà Nội',
           '02435551234',
           5000,
           1,
           2 ) into warehouse (
   warehousename,
   managerid,
   address,
   contactnumber,
   capacity,
   status,
   warehousetype
) values ( N'Kho bán hàng SGF',
           2,
           N'45 Trần Duy Hưng, Cầu Giấy, Hà Nội',
           '02435556789',
           500,
           1,
           1 ) into warehouse (
   warehousename,
   managerid,
   address,
   contactnumber,
   capacity,
   status,
   warehousetype
) values ( N'Kho tái chế SGF',
           2,
           N'78 Giải Phóng, Hai Bà Trưng',
           '02435554321',
           200,
           1,
           3 ) select *
      from dual;

-- 7. PRODUCTTYPE (phụ thuộc CATEGORY)
-- Danh mục con theo đúng mô tả
insert all
  -- Túi xách / Ví (CategoryID=1)
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
           1 )
  -- Khẩu trang (CategoryID=2)
            into producttype (
   producttypename,
   categoryid
) values ( N'Khẩu trang vải',
           2 )
  -- Xà phòng (CategoryID=3)
            into producttype (
   producttypename,
   categoryid
) values ( N'Xà phòng handmade',
           3 )
  -- Nghệ thuật Napkin (CategoryID=4)
            into producttype (
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
           4 )
  -- Miếng lót ly (CategoryID=5)
            into producttype (
   producttypename,
   categoryid
) values ( N'Lót ly handmade',
           5 )
  -- Quần jean (CategoryID=6)
            into producttype (
   producttypename,
   categoryid
) values ( N'Quần jean tái chế',
           6 )
  -- Sản phẩm thêu (CategoryID=7)
            into producttype (
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
           7 )
  -- Combo quà (CategoryID=8)
            into producttype (
   producttypename,
   categoryid
) values ( N'Combo quà tặng',
           8 ) select *
      from dual;

-- =============================================
-- 8. PRODUCT (đã cập nhật ImageURL)
-- =============================================
insert all
  -- Túi xách / Ví
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
           N'Túi tote làm từ vải canvas tái chế, kích thước 40x35cm',
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
           N'Túi tote in hoa sen thân thiện môi trường',
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
           N'Túi xách may từ vải vụn ghép họa tiết dân tộc',
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
           N'Ví nhỏ gọn, da tái chế từ quần jean cũ',
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
           N'Túi xách làm từ quần jean cũ, quai chắc chắn',
           110000,
           1,
           1,
           1,
           'https://picsum.photos/1000?random=105',
           4 )

  -- Khẩu trang
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khẩu trang trẻ em thêu họa tiết con thỏ',
           N'Khẩu trang vải cotton 2 lớp, thêu tay hình thỏ',
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
) values ( N'Khẩu trang 3D kháng khuẩn hoa mai',
           N'Khẩu trang 3D 3 lớp, vải kháng khuẩn, họa tiết hoa mai',
           30000,
           1,
           2,
           0,
           'https://picsum.photos/1000?random=107',
           5 )

  -- Xà phòng
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Xà phòng nhân sâm đỏ handmade',
           N'Xà phòng từ nhân sâm đỏ, dưỡng da',
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
) values ( N'Xà phòng hoa oải hương handmade',
           N'Xà phòng thiên nhiên hoa oải hương thư giãn',
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
) values ( N'Xà phòng sả chanh handmade',
           N'Xà phòng sả chanh kháng khuẩn, tươi mát',
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
) values ( N'Xà phòng cà phê handmade',
           N'Xà phòng tẩy tế bào chết từ bã cà phê',
           40000,
           1,
           3,
           1,
           'https://picsum.photos/1000?random=111',
           6 )

  -- Nghệ thuật Napkin
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khung hình để bàn gỗ decoupage',
           N'Khung hình từ gỗ tái chế, trang trí decoupage hoa',
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
) values ( N'Hộp đựng giấy decoupage hoa cỏ',
           N'Hộp đựng giấy ăn bằng gỗ, sơn decoupage',
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
) values ( N'Tranh trang trí decoupage phong cảnh',
           N'Tranh ghép vải vụn và decoupage trên gỗ',
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
) values ( N'Chai rượu tái chế đèn LED',
           N'Chai rượu cũ trang trí đèn LED, napkin hoa',
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
) values ( N'Kệ sách để bàn mini decoupage',
           N'Kệ sách nhỏ xinh từ gỗ pallet',
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
) values ( N'Chậu cây mini decoupage hoa hồng',
           N'Chậu cây bằng gỗ trang trí, kèm cây sen đá giả',
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
) values ( N'Hộp đựng bút decoupage',
           N'Hộp bút từ lon sữa tái chế, bọc vải decoupage',
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
) values ( N'Set handmade napkin (khung + hộp giấy + tranh nhỏ)',
           N'Bộ 3 sản phẩm decoupage đồng bộ',
           220000,
           1,
           4,
           1,
           'https://picsum.photos/1000?random=119',
           14 )

  -- Miếng lót ly
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Miếng lót ly handmade SGF MLL 001 (chủ đề củ quả)',
           N'Lót ly thêu tay chủ đề củ quả dễ thương',
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
) values ( N'Miếng lót ly handmade SGF MLL 002 (chủ đề hải sản)',
           N'Lót ly thêu tay chủ đề seafood ngộ nghĩnh',
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
) values ( N'Miếng lót ly handmade SGF MLL 003 (chủ đề cà phê)',
           N'Lót ly thêu tay họa tiết cà phê',
           30000,
           1,
           5,
           1,
           'https://picsum.photos/1000?random=122',
           15 )

  -- Quần jean
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Quần jean tái chế ống suông',
           N'Quần jean cũ được làm mới, ống suông thoải mái',
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
) values ( N'Quần jean thêu hoa mặt trời',
           N'Quần jean tái chế thêu tay họa tiết mặt trời',
           220000,
           1,
           6,
           1,
           'https://picsum.photos/1000?random=124',
           16 )

  -- Sản phẩm thêu
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Khăn ăn thêu tay hoa hồng',
           N'Khăn ăn vải linen thêu tay hoa hồng tinh tế',
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
) values ( N'Cúc áo thêu tay gỗ',
           N'Bộ 5 cúc áo gỗ thêu chỉ màu',
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
) values ( N'Túi rút thêu họa tiết dân tộc',
           N'Túi rút nhỏ xinh thêu tay, dùng đựng quà',
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
) values ( N'Thêu tay SGF TT 001 (hoa sen)',
           N'Tranh thêu tay hoa sen trên nền vải',
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
) values ( N'Thêu tay SGF TT 002 (phong cảnh quê hương)',
           N'Tranh thêu phong cảnh làng quê Việt Nam',
           180000,
           1,
           7,
           1,
           'https://picsum.photos/1000?random=129',
           20 )

  -- Combo quà
            into product (
   productname,
   detail,
   productprice,
   productstatus,
   categoryid,
   allowreturn,
   imageurl,
   producttypeid
) values ( N'Combo quà tặng yêu thương',
           N'Set quà gồm xà phòng handmade và khăn thêu',
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
) values ( N'Combo quà tặng sinh nhật',
           N'Set quà sinh nhật: túi rút thêu + xà phòng + lót ly',
           150000,
           1,
           8,
           1,
           'https://picsum.photos/1000?random=131',
           21 ) select *
       from dual;

commit;

-- 9. COMBO (không FK)
insert all into combo ( comboprice ) values ( 100000 )  -- Combo yêu thương
 into combo ( comboprice ) values ( 150000 )  -- Combo sinh nhật
 select *
                                                                                                    from dual;

-- 10. COMBODETAIL (phụ thuộc COMBO, PRODUCT)
-- Combo 1: Xà phòng sả chanh (ProductID 11) + Khăn ăn thêu tay hoa hồng (ProductID 26)
-- Combo 2: Túi rút thêu (ProductID 28) + Xà phòng hoa oải hương (ProductID 10) + Lót ly MLL 001 (ProductID 21)
insert all into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           11,
           1 ) -- xà phòng sả chanh
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 1,
           26,
           1 ) -- khăn ăn thêu
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           28,
           1 ) -- túi rút thêu
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           10,
           1 ) -- xà phòng oải hương
            into combodetail (
   comboid,
   productid,
   quantity
) values ( 2,
           21,
           1 ) -- lót ly MLL 001
            select *
      from dual;

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
           N'Đối tác vận chuyển chính',
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
           N'Giao hàng nhanh',
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
           N'Nhà hàng chay Tâm An',
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
           null ) select *
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
           N'Giảm 10% cho tất cả sản phẩm',
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
           N'Giảm 15% cho đơn từ 300k',
           null,
           0,
           date '2024-06-30',
           date '2024-05-01' ) select *
                      from dual;

-- 16. DETAILINVENTORY (phụ thuộc WAREHOUSE, PRODUCT)
-- Kho tổng (ID=1) có sẵn nhiều hàng, kho bán hàng (ID=2) ít hàng, kho tái chế (ID=3) không có hàng bán thường
insert all
  -- Kho tổng: sản phẩm tiêu biểu
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
           11,
           300,
           300,
           300,
           30,
           600,
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
           26,
           50,
           50,
           50,
           10,
           100,
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
           21,
           100,
           100,
           100,
           20,
           200,
           1,
           N'Kệ D-01' )
  -- Kho bán hàng
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
           N'Tủ kính 1' ) into detailinventory (
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
           40,
           40,
           40,
           10,
           80,
           1,
           N'Tủ kính 2' )
  -- Kho tái chế: có vài sản phẩm lỗi
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
           N'Kệ lỗi' ) select *
              from dual;

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
           3 ) select *
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
           1 )  -- trả hàng lỗi
            select *
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
           N'Đã thanh toán' )  -- mua trực tiếp
            into invoice (
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
           N'Chờ thanh toán' ) -- mua online
            select *
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
           null )  -- tại quầy, không vận chuyển
            select *
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
           150000 ) -- combo sinh nhật
            select *
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
           current_timestamp ) -- thanh toán 1 phần
            select *
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
           150000 ) -- combo sinh nhật (giá combo)
            select *
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
           null ) select *
         from dual;

-- 26. REQUESTDETAIL (phụ thuộc REQUESTFORM, PRODUCT)
insert all into requestdetail (
   requestid,
   productid,
   quantity
) values ( 1,
           11,
           100 ) into requestdetail (
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
           20 ) select *
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
           date '2024-05-16' ) select *
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
           10 ) -- hoàn thành
            select *
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
           100 ) into importreceiptdetail (
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
           20 ) select *
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
           2 ) select *
      from dual;

-- 32. COUNTSHEETDETAIL (phụ thuộc COUNTSHEET, WAREHOUSE, PRODUCT)
insert all into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           1,
           199,
           N'Thiếu 1 sản phẩm' ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 1,
           1,
           11,
           300,
           null ) into countsheetdetail (
   countsheetid,
   warehouseid,
   productid,
   quantity,
   note
) values ( 2,
           2,
           1,
           30,
           N'Khớp' ) select *
            from dual;

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
           N'Nhập kho tái chế' ) select *
                        from dual;

-- 35. LISTDISCOUNT (phụ thuộc ORDERS, DISCOUNT)
insert all into listdiscount (
   orderid,
   discountid,
   appliedvalue
) values ( 2,
           1,
           10 ) select *
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
           4 ) select *
      from dual;

commit;