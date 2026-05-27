alter session set container = freepdb1;
alter session set current_schema = sgf_admin;

-- Code ở phía sau 2 dòng lệnh trên

-- Tạo sequence (START WITH 1, INCREMENT BY 1)
create sequence customer_type_seq start with 1 increment by 1;
create sequence customer_seq start with 1 increment by 1;
create sequence category_seq start with 1 increment by 1;
create sequence product_type_seq start with 1 increment by 1;
create sequence product_seq start with 1 increment by 1;
create sequence combo_seq start with 1 increment by 1;
create sequence employee_seq start with 1 increment by 1;
create sequence warehouse_seq start with 1 increment by 1;
create sequence shipcompany_seq start with 1 increment by 1;
create sequence invoice_seq start with 1 increment by 1;
create sequence orders_seq start with 1 increment by 1;
create sequence order_detail_seq start with 1 increment by 1;
create sequence invoice_detail_seq start with 1 increment by 1;
create sequence payment_method_seq start with 1 increment by 1;
create sequence payment_seq start with 1 increment by 1;
create sequence return_policy_seq start with 1 increment by 1;
create sequence order_return_seq start with 1 increment by 1;
create sequence notification_seq start with 1 increment by 1;
create sequence request_form_seq start with 1 increment by 1;
create sequence transfer_ticket_seq start with 1 increment by 1;
create sequence import_receipt_seq start with 1 increment by 1;
create sequence export_receipt_seq start with 1 increment by 1;
create sequence countsheet_seq start with 1 increment by 1;
create sequence discount_seq start with 1 increment by 1;
create sequence feedback_seq start with 1 increment by 1;
  
-- =============================================
-- 1. CUSTOMER TYPE TABLE
-- =============================================
create table customertype (
   customertypeid   number default customer_type_seq.nextval primary key,
   customertypename nvarchar2(40) not null check ( customertypename in ( 'Bronze',
                                                                         'Silver',
                                                                         'Gold',
                                                                         'VIP' ) ),
   discount         number(5,2) not null,
   detail           nvarchar2(200) not null,
   spendinglimit    number default 0 not null
);

-- =============================================
-- 2. CUSTOMER TABLE
-- =============================================
create table customer (
   customerid            number default customer_seq.nextval primary key,
   customertypeid        number,
   firstname             nvarchar2(40) not null,
   lastname              nvarchar2(20) not null,
   companyname           nvarchar2(40),
   phone                 varchar2(15) not null unique,
   address               nvarchar2(255),
   email                 varchar2(100) unique,
   createddate           date default sysdate not null,
   totalaccumulatedspent number(19,4) default 0 check ( totalaccumulatedspent >= 0 ),
   constraint fk_customer_customertype foreign key ( customertypeid )
      references customertype ( customertypeid )
);

-- =============================================
-- 3. CATEGORY TABLE
-- =============================================
create table category (
   categoryid   number default category_seq.nextval primary key,
   categoryname nvarchar2(100) not null
);

-- =============================================
-- 4. PRODUCTTYPE TABLE
-- =============================================
create table producttype (
   producttypeid   number default product_type_seq.nextval primary key,
   producttypename varchar2(30) not null,
   categoryid      number not null
);

-- =============================================
-- 5. PRODUCT TABLE
-- =============================================
create table product (
   productid     number default product_seq.nextval primary key,
   productname   nvarchar2(100) not null,
   detail        nvarchar2(200),
   productprice  number check ( productprice > 0 ),
   productstatus number check ( productstatus in ( 0,
                                                   1 ) ),
   categoryid    number,
   allowreturn   number(1) not null check ( allowreturn in ( 0,
                                                           1 ) ),
   imageurl      varchar2(4000),
   producttypeid number,
   constraint fk_product_category foreign key ( categoryid )
      references category ( categoryid ),
   constraint fk_product_producttype foreign key ( producttypeid )
      references producttype ( producttypeid )
);

-- =============================================
-- 6. COMBO TABLE
-- =============================================
create table combo (
   comboid    number default combo_seq.nextval primary key,
   comboprice number(19,4)
);

-- =============================================
-- 7. COMBODETAIL TABLE
-- =============================================
create table combodetail (
   comboid   number,
   productid number,
   quantity  number check ( quantity > 0 ),
   primary key ( comboid,
                 productid ),
   constraint fk_cd_combo foreign key ( comboid )
      references combo ( comboid ),
   constraint fk_cd_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 8. EMPLOYEE TABLE
-- =============================================
create table employee (
   employeeid number default employee_seq.nextval primary key,
   fullname   nvarchar2(100) not null,
   email      varchar2(100) unique,
   phone      varchar2(15) not null check ( length(phone) = 10 ),
   password   varchar2(255) not null,
   status     number(1) default 1 check ( status in ( 0,
                                                  1 ) )
);

-- =============================================
-- 9. WAREHOUSE TABLE
-- =============================================
create table warehouse (
   warehouseid   number default warehouse_seq.nextval primary key,
   warehousename nvarchar2(50) not null,
   managerid     number not null,
   address       nvarchar2(100) not null,
   contactnumber varchar2(15) not null,
   capacity      number not null,
   status        number check ( status in ( 0,
                                     1 ) ),
   warehousetype number check ( warehousetype in ( 1,
                                                   2,
                                                   3 ) ),
   constraint fk_warehouse_employee foreign key ( managerid )
      references employee ( employeeid )
);

-- =============================================
-- 10. ROLE TABLE
-- =============================================
create table role (
   roleid   number primary key check ( roleid in ( 1,
                                                 2,
                                                 3,
                                                 4 ) ),
   rolename varchar2(100) not null
);

-- =============================================
-- 11. EMPLOYEEROLE TABLE
-- =============================================
create table employeerole (
   employeeid number,
   roleid     number,
   primary key ( employeeid,
                 roleid ),
   constraint fk_er_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_er_role foreign key ( roleid )
      references role ( roleid )
);

-- =============================================
-- 12. SHIPCOMPANY TABLE
-- =============================================
create table shipcompany (
   shipcompanyid   number default shipcompany_seq.nextval primary key,
   shipcompanyname nvarchar2(100) not null unique,
   supportedregion varchar2(50) not null,
   phone           varchar2(15) not null,
   email           varchar2(100),
   address         nvarchar2(255),
   notes           nvarchar2(500),
   status          number(1) default 1 check ( status in ( 0,
                                                  1 ) )
);


-- =============================================
-- 22. DETAILINVENTORY TABLE (references Warehouse, Product)
-- =============================================
create table detailinventory (
   warehouseid     number,
   productid       number,
   currentquantity number default 0,
   realstock       number default 0 check ( realstock >= 0 ),
   availablestock  number default 0 check ( availablestock >= 0 ),
   minstock        number check ( minstock >= 0 ),
   maxstock        number check ( maxstock >= 0 ),
   isalertenabled  number(1) default 1 check ( isalertenabled in ( 0,
                                                                  1 ) ),
   storagelocation nvarchar2(100),
   primary key ( warehouseid,
                 productid ),
   constraint fk_di_warehouse foreign key ( warehouseid )
      references warehouse ( warehouseid ),
   constraint fk_di_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 13. INVOICE TABLE (references Employee, Customer)
-- =============================================
create table invoice (
   invoiceid       number default invoice_seq.nextval primary key,
   customerid      number not null,
   employeeid      number,
   salechannelcode number not null check ( salechannelcode in ( 0,
                                                                1 ) ), -- 0: Hóa đơn tại quầy/ 1: Hóa đơn trực tuyến
   totalamount     number(19,4) check ( totalamount >= 0 ),
   taxamount       number(19,4) default 0,
   finalamount     number(19,4) check ( finalamount >= 0 ),
   status          varchar2(20) not null check ( status in ( 'Chờ thanh toán',
                                                    'Đã thanh toán' ) ),
   invoicedate     date default sysdate,
   constraint fk_invoice_customer foreign key ( customerid )
      references customer ( customerid ),
   constraint fk_invoice_employee foreign key ( employeeid )
      references employee ( employeeid )
);

-- =============================================
-- 14. ORDER TABLE (references Customer, Employee, Invoice, ShipCompany)
-- =============================================
create table orders (
   orderid         number default orders_seq.nextval primary key,
   customerid      number not null,
   employeeid      number not null,
   invoiceid       number,
   shipcode        varchar2(20),
   shipcompanyid   number,
   totalamount     number(19,4) check ( totalamount >= 0 ),
   orderstatus     number not null check ( orderstatus in ( 0,
                                                        1,
                                                        2,
                                                        3,
                                                        4,
                                                        5 ) ), -- 0:Chờ xác nhận, 1:Đã xác nhận (chuẩn bị hàng), 2:Đang giao, 3:Giao thành công, 4:Đã hủy, 5:Đổi/trả.
   shippingstatus  number check ( shippingstatus in ( 0,
                                                     1,
                                                     2,
                                                     3,
                                                     4 ) ), -- 0:Cần lên lịch giao, 1:Đang đóng gói, 2:Đã gửi vận chuyển, 3:Khách từ chối giao, 4: Đã đóng gói.
   shipmentnote    varchar2(100),
   shippingfee     number check ( shippingfee >= 0 ),
   exportreceiptid number,
   constraint fk_order_customer foreign key ( customerid )
      references customer ( customerid ),
   constraint fk_order_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_order_invoice foreign key ( invoiceid )
      references invoice ( invoiceid ),
   constraint fk_order_shipcompany foreign key ( shipcompanyid )
      references shipcompany ( shipcompanyid )
);

-- =============================================
-- 15. ORDERDETAIL TABLE (references Order, Product, Combo)
-- =============================================
create table orderdetail (
   orderdetailid  number default order_detail_seq.nextval primary key,
   orderid        number not null,
   productid      number not null,
   comboid        number,
   quantity       number check ( quantity > 0 ),
   unitprice      number(19,4) check ( unitprice >= 0 ),
   discountamount number(19,4) default 0,
   totalamount    number(19,4) not null,
   constraint fk_od_order foreign key ( orderid )
      references orders ( orderid ),
   constraint fk_od_product foreign key ( productid )
      references product ( productid ),
   constraint fk_od_combo foreign key ( comboid )
      references combo ( comboid )
);

-- =============================================
-- 16. INVOICEDETAIL TABLE (references Invoice, Product, Combo)
-- =============================================
create table invoicedetail (
   invoicedetailid number default invoice_detail_seq.nextval primary key,
   invoiceid       number not null,
   productid       number,
   comboid         number,
   quantity        number check ( quantity > 0 ),
   unitprice       number(19,4) check ( unitprice >= 0 ),
   discountamount  number(19,4) default 0,
   totalamount     number(19,4) not null,
   constraint fk_id_invoice foreign key ( invoiceid )
      references invoice ( invoiceid ),
   constraint fk_id_product foreign key ( productid )
      references product ( productid ),
   constraint fk_id_combo foreign key ( comboid )
      references combo ( comboid )
);

-- =============================================
-- 17. PAYMENTMETHOD TABLE
-- =============================================
create table paymentmethod (
   paymentmethodid number default payment_method_seq.nextval primary key,
   paymentname     nvarchar2(100) not null unique,
   status          number(1) check ( status in ( 0,
                                        1 ) ) --0: Không áp dụng 1: Áp dụng
);

-- =============================================
-- 18. PAYMENT TABLE (references Invoice, PaymentMethod)
-- =============================================
create table payment (
   paymentid       number default payment_seq.nextval primary key,
   invoiceid       number not null,
   paymentmethodid number not null,
   amountpaid      number(19,4) check ( amountpaid > 0 ),
   referencecode   varchar2(100),
   paymentdate     timestamp default current_timestamp,
   constraint fk_payment_invoice foreign key ( invoiceid )
      references invoice ( invoiceid ),
   constraint fk_payment_pm foreign key ( paymentmethodid )
      references paymentmethod ( paymentmethodid )
);

-- =============================================
-- 19. RETURNPOLICY TABLE
-- =============================================
create table returnpolicy (
   policyid       number default return_policy_seq.nextval primary key,
   policyname     nvarchar2(100) not null,
   maxreturndays  number check ( maxreturndays >= 0 ),
   penaltyfeerate decimal(5,2) check ( penaltyfeerate >= 0
      and penaltyfeerate <= 100 ),
   effectivedate  date not null,
   isactive       number check ( isactive in ( 0,
                                         1 ) ) --0: Ngưng hoạt động 1: Còn hoạt động
);

-- =============================================
-- 20. ORDERRETURN TABLE (references Order, Employee)
-- =============================================
create table orderreturn (
   returnid      number default order_return_seq.nextval primary key,
   orderid       number not null,
   employeeid    number not null,
   returndate    date default sysdate,
   reason        nvarchar2(255),
   totalrefund   number(19,4) check ( totalrefund >= 0 ),
   returnrefcode varchar2(100),
   status        nvarchar2(50),
   constraint fk_return_order foreign key ( orderid )
      references orders ( orderid ),
   constraint fk_return_employee foreign key ( employeeid )
      references employee ( employeeid )
);

-- =============================================
-- 21. RETURNDETAIL TABLE (references OrderReturn, Product, Warehouse)
-- =============================================
create table returndetail (
   returnid          number,
   productid         number,
   quantity          number check ( quantity > 0 ),
   qc_status         nvarchar2(50),
   targetwarehouseid number,
   actiontaken       nvarchar2(100),
   primary key ( returnid,
                 productid ),
   constraint fk_rtd_return foreign key ( returnid )
      references orderreturn ( returnid ),
   constraint fk_rtd_product foreign key ( productid )
      references product ( productid ),
   constraint fk_rtd_warehouse foreign key ( targetwarehouseid )
      references warehouse ( warehouseid )
);

-- =============================================
-- 23. NOTIFICATION TABLE (references Employee, Product)
-- =============================================
create table notification (
   notificationid number default notification_seq.nextval primary key,
   employeeid     number not null,
   title          nvarchar2(200) not null,
   productid      number,
   message        nvarchar2(1000) not null,
   type           number check ( type between 0 and 2 ),
   status         number(1) check ( status between 0 and 1 ),
   createddate    date default sysdate not null,
   constraint fk_notif_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_notif_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 24. REQUESTFORM TABLE (references Employee)
-- =============================================
create table requestform (
   requestid    number default request_form_seq.nextval primary key,
   employeeid   number not null,
   createddate  date default sysdate,
   status       nvarchar2(50) default 'Chờ duyệt',
   approverid   number,
   rejectreason nvarchar2(255),
   constraint fk_rf_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_rf_approver foreign key ( approverid )
      references employee ( employeeid )
);

-- =============================================
-- 25. REQUESTDETAIL TABLE (references RequestForm, Product)
-- =============================================
create table requestdetail (
   requestid number,
   productid number,
   quantity  number check ( quantity > 0 ),
   primary key ( requestid,
                 productid ),
   constraint fk_rqd_request foreign key ( requestid )
      references requestform ( requestid ),
   constraint fk_rqd_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 26. TRANSFERTICKET TABLE (references Employee, Warehouse)
-- =============================================
create table transferticket (
   transferid  number default transfer_ticket_seq.nextval primary key,
   employeeid  number not null,
   sourcewhid  number not null,
   destwhid    number not null,
   status      nvarchar2(50) default 'Chờ xuất kho' check ( status in ( 'Chờ xuất kho',
                                                                   'Đang luân chuyển',
                                                                   'Hoàn tất',
                                                                   'Từ chối' ) ),
   createddate date default sysdate,
   constraint fk_tt_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_tt_source foreign key ( sourcewhid )
      references warehouse ( warehouseid ),
   constraint fk_tt_dest foreign key ( destwhid )
      references warehouse ( warehouseid )
);

-- =============================================
-- 27. TRANSFERTICKETDETAIL TABLE (references TransferTicket, Product)
-- =============================================
create table transferticketdetail (
   transferid      number,
   productid       number,
   exportquantity  number,
   receivequantity number,
   requestquantity number check ( requestquantity > 0 ),
   primary key ( transferid,
                 productid ),
   constraint fk_ttd_ticket foreign key ( transferid )
      references transferticket ( transferid ),
   constraint fk_ttd_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 28. IMPORTRECEIPT TABLE (references Employee, Warehouse, RequestForm)
-- =============================================
create table importreceipt (
   importreceiptid     number default import_receipt_seq.nextval primary key,
   employeeid          number not null,
   warehouseid         number not null,
   status              nvarchar2(50) default 'Bản nháp',
   createddate         date default sysdate,
   requestid           number,
   discrepancyreason   nvarchar2(255),
   discrepancyimageurl nvarchar2(255),
   hasdiscrepancy      number default 0 check ( hasdiscrepancy in ( 0,
                                                               1 ) ),
   constraint fk_ir_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_ir_warehouse foreign key ( warehouseid )
      references warehouse ( warehouseid ),
   constraint fk_ir_request foreign key ( requestid )
      references requestform ( requestid )
);

-- =============================================
-- 29. IMPORTRECEIPTDETAIL TABLE (references ImportReceipt, Product)
-- =============================================
create table importreceiptdetail (
   importreceiptid  number,
   productid        number,
   expectedquantity number check ( expectedquantity > 0 ),
   actualquantity   number check ( actualquantity >= 0 ),
   primary key ( importreceiptid,
                 productid ),
   constraint fk_ird_receipt foreign key ( importreceiptid )
      references importreceipt ( importreceiptid ),
   constraint fk_ird_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 30. EXPORTRECEIPT TABLE (references Employee)
-- =============================================
create table exportreceipt (
   exportreceiptid number default export_receipt_seq.nextval primary key,
   employeeid      number not null,
   exporttype      number(1) not null check ( exporttype in ( 1,
                                                         2,
                                                         3 ) ), -- 1: Bán hàng, 2: Hủy rác, 3: Sửa chữa
   reason          nvarchar2(255),
   status          nvarchar2(50) default 'Đã hoàn thành' check ( status in ( 'Đã hoàn thành',
                                                                    'Đã hủy' ) ),
   createddate     date default sysdate,
   warehouseid     number not null,
   constraint fk_exportreceipt_employee foreign key ( employeeid )
      references employee ( employeeid ),
   constraint fk_exportreceipt_warehouse foreign key ( warehouseid )
      references warehouse ( warehouseid )
);

-- =============================================
-- 31. EXPORTRECEIPTDETAIL TABLE (references ExportReceipt, Product)
-- =============================================
create table exportreceiptdetail (
   exportreceiptid number,
   productid       number,
   quantity        number check ( quantity > 0 ),
   primary key ( exportreceiptid,
                 productid ),
   constraint fk_erd_receipt foreign key ( exportreceiptid )
      references exportreceipt ( exportreceiptid ),
   constraint fk_erd_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 32. COUNTSHEET TABLE
-- =============================================
create table countsheet (
   countsheetid number default countsheet_seq.nextval primary key,
   createddate  date default sysdate,
   status       number default 0 not null check ( status in ( 0,
                                                        1,
                                                        2,
                                                        3,
                                                        4 ) ) -- - 0: Chưa kiểm kê - 1: Đã kiểm kê, chờ phê duyệt. - 2: Đã phê duyệt. - 3: Đã từ chối, cần kiểm kê lại - 4: Đã hủy.
);

-- =============================================
-- 33. COUNTSHEETDETAIL TABLE (references CountSheet, Warehouse, Product)
-- =============================================
create table countsheetdetail (
   countsheetid number,
   warehouseid  number,
   productid    number,
   quantity     number not null,
   note         nvarchar2(50),
   primary key ( countsheetid,
                 warehouseid,
                 productid ),
   constraint fk_csd_countsheet foreign key ( countsheetid )
      references countsheet ( countsheetid ),
   constraint fk_csd_warehouse foreign key ( warehouseid )
      references warehouse ( warehouseid ),
   constraint fk_csd_product foreign key ( productid )
      references product ( productid )
);

-- =============================================
-- 34. DISCOUNT TABLE
-- =============================================
create table discount (
   discountid        number default discount_seq.nextval primary key,
   customertypeid    number,
   discountname      nvarchar2(100) not null,
   value             number not null,
   detail            varchar2(300) not null,
   appliedproductids varchar2(4000),
   status            number default 0, -- 0: Chờ chạy, 1: Đang chạy, 2: Tạm dừng
   expirydate        date not null,
   startdate         date not null,
   constraint fk_discount_customertype foreign key ( customertypeid )
      references customertype ( customertypeid ),
   constraint chk_discount_dates check ( expirydate > startdate )
);

-- =============================================
-- 35. LISTDISCOUNT TABLE (references Order, Discount)
-- =============================================
create table listdiscount (
   orderid      number,
   discountid   number,
   appliedvalue number not null,
   primary key ( orderid,
                 discountid ),
   constraint fk_ld_order foreign key ( orderid )
      references orders ( orderid ),
   constraint fk_ld_discount foreign key ( discountid )
      references discount ( discountid )
);


-- =============================================
-- 36. FEEDBACK TABLE (references OrderDetail, Customer)
-- =============================================
create table feedback (
   feedbackid      number default feedback_seq.nextval primary key,
   orderdetailid   number,
   customerid      number,
   feedbackcomment varchar2(200) not null,
   feedbackdate    timestamp default current_timestamp,
   attachmenturl   varchar2(4000),
   rating          number not null,
   constraint fk_feedback_orderdetail foreign key ( orderdetailid )
      references orderdetail ( orderdetailid ),
   constraint fk_feedback_customer foreign key ( customerid )
      references customer ( customerid )
);
alter table orders
   add constraint fk_order_exportreceipt foreign key ( exportreceiptid )
      references exportreceipt ( exportreceiptid );