ALTER SESSION SET CONTAINER = FREEPDB1;
ALTER SESSION SET CURRENT_SCHEMA = sgf_admin;

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (1,10,4,0,205000,0,205000,N'Đã thanh toán',TO_DATE('2026-09-16 13:42:09','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (1,10,4,1,205000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (1,1,5,null,2,110000,15000,205000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (1,1,5,null,2,110000,15000,205000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (1,1,3,205000,null,TO_DATE('2026-09-16 13:42:09','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (2,4,4,1,805000,0,805000,N'Đã thanh toán',TO_DATE('2026-02-19 01:40:18','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (2,4,4,2,805000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (2,2,31,null,3,150000,5000,445000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (2,2,31,null,3,150000,5000,445000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (3,2,11,null,2,40000,0,80000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (3,2,11,null,2,40000,0,80000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (4,2,30,null,3,100000,20000,280000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (4,2,30,null,3,100000,20000,280000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (2,2,2,805000,null,TO_DATE('2026-02-19 01:40:18','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (3,4,4,1,370000,0,370000,N'Đã thanh toán',TO_DATE('2026-12-02 21:23:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (3,4,4,3,370000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (5,3,2,null,3,95000,0,285000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (5,3,2,null,3,95000,0,285000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (6,3,21,null,3,35000,20000,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (6,3,21,null,3,35000,20000,85000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (3,3,2,370000,null,TO_DATE('2026-12-02 21:23:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (4,10,1,0,525000,0,525000,N'Đã thanh toán',TO_DATE('2026-02-22 04:27:23','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (4,10,1,4,525000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (7,4,5,null,1,110000,0,110000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (7,4,5,null,1,110000,0,110000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (8,4,31,null,2,150000,5000,295000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (8,4,31,null,2,150000,5000,295000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (9,4,3,null,1,120000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (9,4,3,null,1,120000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (4,4,10,525000,null,TO_DATE('2026-02-22 04:27:23','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (5,4,1,0,80000,0,80000,N'Đã thanh toán',TO_DATE('2026-08-03 04:40:40','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (5,4,1,5,80000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (10,5,9,null,2,40000,0,80000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (10,5,9,null,2,40000,0,80000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (5,5,7,80000,null,TO_DATE('2026-08-03 04:40:40','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (6,4,3,0,310000,0,310000,N'Đã thanh toán',TO_DATE('2026-05-25 18:55:13','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (6,4,3,6,310000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (11,6,5,null,2,110000,0,220000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (11,6,5,null,2,110000,0,220000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (12,6,22,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (12,6,22,null,3,30000,0,90000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (6,6,6,310000,null,TO_DATE('2026-05-25 18:55:13','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (7,3,4,0,180000,0,180000,N'Đã thanh toán',TO_DATE('2026-10-20 15:26:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (7,3,4,7,180000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (13,7,9,null,3,40000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (13,7,9,null,3,40000,0,120000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (14,7,22,null,2,30000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (14,7,22,null,2,30000,0,60000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (7,7,2,180000,null,TO_DATE('2026-10-20 15:26:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (8,7,3,0,465000,0,465000,N'Đã thanh toán',TO_DATE('2026-03-30 11:10:10','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (8,7,3,8,465000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (15,8,15,null,3,95000,15000,270000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (15,8,15,null,3,95000,15000,270000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (16,8,6,null,3,25000,0,75000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (16,8,6,null,3,25000,0,75000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (17,8,14,null,1,120000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (17,8,14,null,1,120000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (8,8,8,465000,null,TO_DATE('2026-03-30 11:10:10','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (9,9,4,0,475000,0,475000,N'Đã thanh toán',TO_DATE('2026-01-21 12:35:17','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (9,9,4,9,475000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (18,9,5,null,3,110000,0,330000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (18,9,5,null,3,110000,0,330000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (19,9,7,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (19,9,7,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (20,9,27,null,1,55000,0,55000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (20,9,27,null,1,55000,0,55000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (9,9,5,475000,null,TO_DATE('2026-01-21 12:35:17','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (10,8,3,0,170000,0,170000,N'Đã thanh toán',TO_DATE('2026-04-10 08:18:24','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (10,8,3,10,170000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (21,10,13,null,2,85000,0,170000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (21,10,13,null,2,85000,0,170000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (10,10,8,170000,null,TO_DATE('2026-04-10 08:18:24','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (11,1,1,0,55000,0,55000,N'Đã thanh toán',TO_DATE('2026-06-09 21:03:30','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (11,1,1,11,55000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (22,11,27,null,1,55000,0,55000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (22,11,27,null,1,55000,0,55000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (11,11,5,55000,null,TO_DATE('2026-06-09 21:03:30','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (12,4,3,1,640000,0,640000,N'Đã thanh toán',TO_DATE('2026-08-05 13:42:15','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (12,4,3,12,640000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (23,12,23,null,2,180000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (23,12,23,null,2,180000,0,360000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (24,12,24,null,1,220000,0,220000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (24,12,24,null,1,220000,0,220000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (25,12,25,null,1,60000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (25,12,25,null,1,60000,0,60000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (12,12,3,640000,null,TO_DATE('2026-08-05 13:42:15','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (13,2,4,0,505000,0,505000,N'Đã thanh toán',TO_DATE('2026-02-22 13:25:04','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (13,2,4,13,505000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (26,13,17,null,1,70000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (26,13,17,null,1,70000,0,70000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (27,13,19,null,2,220000,5000,435000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (27,13,19,null,2,220000,5000,435000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (13,13,8,505000,null,TO_DATE('2026-02-22 13:25:04','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (14,1,1,0,45000,0,45000,N'Đã thanh toán',TO_DATE('2026-05-08 21:31:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (14,1,1,14,45000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (28,14,8,null,1,45000,0,45000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (28,14,8,null,1,45000,0,45000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (14,14,9,45000,null,TO_DATE('2026-05-08 21:31:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (15,9,4,1,65000,0,65000,N'Đã thanh toán',TO_DATE('2026-04-23 11:22:22','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (15,9,4,15,65000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (29,15,6,null,3,25000,10000,65000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (29,15,6,null,3,25000,10000,65000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (15,15,7,65000,null,TO_DATE('2026-04-23 11:22:22','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (16,2,3,1,595000,0,595000,N'Đã thanh toán',TO_DATE('2026-05-07 17:01:47','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (16,2,3,16,595000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (30,16,27,null,1,55000,0,55000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (30,16,27,null,1,55000,0,55000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (31,16,23,null,3,180000,0,540000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (31,16,23,null,3,180000,0,540000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (16,16,5,595000,null,TO_DATE('2026-05-07 17:01:47','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (17,6,3,1,150000,0,150000,N'Đã thanh toán',TO_DATE('2026-09-20 06:41:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (17,6,3,17,150000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (32,17,12,null,2,75000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (32,17,12,null,2,75000,0,150000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (17,17,6,150000,null,TO_DATE('2026-09-20 06:41:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (18,1,4,0,85000,0,85000,N'Đã thanh toán',TO_DATE('2026-02-25 09:50:02','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (18,1,4,18,85000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (33,18,13,null,1,85000,0,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (33,18,13,null,1,85000,0,85000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (18,18,7,85000,null,TO_DATE('2026-02-25 09:50:02','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (19,8,3,0,135000,0,135000,N'Đã thanh toán',TO_DATE('2026-12-16 13:15:00','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (19,8,3,19,135000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (34,19,30,null,1,100000,0,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (34,19,30,null,1,100000,0,100000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (35,19,26,null,1,35000,0,35000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (35,19,26,null,1,35000,0,35000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (19,19,8,135000,null,TO_DATE('2026-12-16 13:15:00','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (20,2,3,1,300000,0,300000,N'Đã thanh toán',TO_DATE('2026-06-11 19:35:20','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (20,2,3,20,300000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (36,20,13,null,1,85000,0,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (36,20,13,null,1,85000,0,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (37,20,25,null,2,60000,5000,115000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (37,20,25,null,2,60000,5000,115000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (38,20,16,null,1,100000,0,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (38,20,16,null,1,100000,0,100000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (20,20,10,300000,null,TO_DATE('2026-06-11 19:35:20','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (21,9,4,0,560000,0,560000,N'Đã thanh toán',TO_DATE('2026-10-05 20:50:42','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (21,9,4,21,560000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (39,21,19,null,2,220000,0,440000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (39,21,19,null,2,220000,0,440000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (40,21,9,null,3,40000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (40,21,9,null,3,40000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (21,21,6,560000,null,TO_DATE('2026-10-05 20:50:42','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (22,8,4,0,550000,0,550000,N'Đã thanh toán',TO_DATE('2026-01-03 19:11:28','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (22,8,4,22,550000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (41,22,15,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (41,22,15,null,2,95000,0,190000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (42,22,1,null,2,85000,0,170000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (42,22,1,null,2,85000,0,170000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (43,22,2,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (43,22,2,null,2,95000,0,190000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (22,22,9,550000,null,TO_DATE('2026-01-03 19:11:28','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (23,1,4,0,760000,0,760000,N'Đã thanh toán',TO_DATE('2026-08-10 06:09:40','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (23,1,4,23,760000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (44,23,29,null,3,180000,0,540000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (44,23,29,null,3,180000,0,540000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (45,23,22,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (45,23,22,null,1,30000,0,30000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (46,23,2,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (46,23,2,null,2,95000,0,190000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (23,23,5,760000,null,TO_DATE('2026-08-10 06:09:40','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (24,4,3,1,210000,0,210000,N'Đã thanh toán',TO_DATE('2026-12-04 10:15:57','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (24,4,3,24,210000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (47,24,20,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (47,24,20,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (48,24,9,null,3,40000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (48,24,9,null,3,40000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (24,24,1,210000,null,TO_DATE('2026-12-04 10:15:57','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (25,9,3,0,615000,0,615000,N'Đã thanh toán',TO_DATE('2026-04-21 02:47:02','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (25,9,3,25,615000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (49,25,12,null,2,75000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (49,25,12,null,2,75000,0,150000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (50,25,23,null,2,180000,15000,345000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (50,25,23,null,2,180000,15000,345000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (51,25,11,null,3,40000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (51,25,11,null,3,40000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (25,25,5,615000,null,TO_DATE('2026-04-21 02:47:02','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (26,2,3,1,450000,0,450000,N'Đã thanh toán',TO_DATE('2026-05-30 10:07:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (26,2,3,26,450000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (52,26,28,null,3,150000,0,450000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (52,26,28,null,3,150000,0,450000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (26,26,4,450000,null,TO_DATE('2026-05-30 10:07:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (27,10,3,0,660000,0,660000,N'Đã thanh toán',TO_DATE('2026-03-31 12:27:01','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (27,10,3,27,660000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (53,27,24,null,3,220000,0,660000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (53,27,24,null,3,220000,0,660000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (27,27,9,660000,null,TO_DATE('2026-03-31 12:27:01','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (28,10,1,0,295000,0,295000,N'Đã thanh toán',TO_DATE('2026-11-21 02:08:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (28,10,1,28,295000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (54,28,31,null,2,150000,5000,295000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (54,28,31,null,2,150000,5000,295000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (28,28,1,295000,null,TO_DATE('2026-11-21 02:08:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (29,1,4,0,105000,0,105000,N'Đã thanh toán',TO_DATE('2026-12-01 13:56:48','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (29,1,4,29,105000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (55,29,10,null,2,35000,10000,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (55,29,10,null,2,35000,10000,60000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (56,29,8,null,1,45000,0,45000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (56,29,8,null,1,45000,0,45000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (29,29,10,105000,null,TO_DATE('2026-12-01 13:56:48','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (30,2,1,1,70000,0,70000,N'Đã thanh toán',TO_DATE('2026-09-25 10:36:26','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (30,2,1,30,70000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (57,30,26,null,2,35000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (57,30,26,null,2,35000,0,70000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (30,30,7,70000,null,TO_DATE('2026-09-25 10:36:26','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (31,5,1,1,220000,0,220000,N'Đã thanh toán',TO_DATE('2026-05-10 20:43:36','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (31,5,1,31,220000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (58,31,14,null,1,120000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (58,31,14,null,1,120000,0,120000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (59,31,10,null,3,35000,5000,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (59,31,10,null,3,35000,5000,100000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (31,31,1,220000,null,TO_DATE('2026-05-10 20:43:36','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (32,8,1,1,35000,0,35000,N'Đã thanh toán',TO_DATE('2026-03-10 04:57:31','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (32,8,1,32,35000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (60,32,21,null,1,35000,0,35000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (60,32,21,null,1,35000,0,35000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (32,32,10,35000,null,TO_DATE('2026-03-10 04:57:31','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (33,9,3,0,25000,0,25000,N'Đã thanh toán',TO_DATE('2026-03-12 08:42:32','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (33,9,3,33,25000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (61,33,20,null,1,30000,5000,25000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (61,33,20,null,1,30000,5000,25000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (33,33,4,25000,null,TO_DATE('2026-03-12 08:42:32','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (34,6,1,0,105000,0,105000,N'Đã thanh toán',TO_DATE('2026-10-04 07:57:32','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (34,6,1,34,105000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (62,34,10,null,3,35000,0,105000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (62,34,10,null,3,35000,0,105000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (34,34,5,105000,null,TO_DATE('2026-10-04 07:57:32','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (35,7,3,0,140000,0,140000,N'Đã thanh toán',TO_DATE('2026-01-16 02:41:25','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (35,7,3,35,140000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (63,35,16,null,1,100000,0,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (63,35,16,null,1,100000,0,100000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (64,35,9,null,1,40000,0,40000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (64,35,9,null,1,40000,0,40000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (35,35,2,140000,null,TO_DATE('2026-01-16 02:41:25','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (36,8,4,0,530000,0,530000,N'Đã thanh toán',TO_DATE('2026-10-03 20:16:04','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (36,8,4,36,530000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (65,36,25,null,3,60000,0,180000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (65,36,25,null,3,60000,0,180000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (66,36,14,null,2,120000,0,240000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (66,36,14,null,2,120000,0,240000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (67,36,5,null,1,110000,0,110000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (67,36,5,null,1,110000,0,110000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (36,36,9,530000,null,TO_DATE('2026-10-03 20:16:04','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (37,5,4,1,300000,0,300000,N'Đã thanh toán',TO_DATE('2026-09-21 04:04:03','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (37,5,4,37,300000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (68,37,22,null,2,30000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (68,37,22,null,2,30000,0,60000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (69,37,2,null,2,95000,5000,185000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (69,37,2,null,2,95000,5000,185000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (70,37,27,null,1,55000,0,55000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (70,37,27,null,1,55000,0,55000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (37,37,10,300000,null,TO_DATE('2026-09-21 04:04:03','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (38,10,4,1,625000,0,625000,N'Đã thanh toán',TO_DATE('2026-05-16 03:22:05','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (38,10,4,38,625000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (71,38,31,null,1,150000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (71,38,31,null,1,150000,0,150000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (72,38,8,null,3,45000,20000,115000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (72,38,8,null,3,45000,20000,115000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (73,38,14,null,3,120000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (73,38,14,null,3,120000,0,360000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (38,38,8,625000,null,TO_DATE('2026-05-16 03:22:05','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (39,4,1,1,270000,0,270000,N'Đã thanh toán',TO_DATE('2026-08-06 02:51:35','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (39,4,1,39,270000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (74,39,25,null,3,60000,0,180000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (74,39,25,null,3,60000,0,180000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (75,39,8,null,2,45000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (75,39,8,null,2,45000,0,90000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (39,39,6,270000,null,TO_DATE('2026-08-06 02:51:35','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (40,10,3,0,85000,0,85000,N'Đã thanh toán',TO_DATE('2026-11-04 16:24:14','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (40,10,3,40,85000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (76,40,1,null,1,85000,0,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (76,40,1,null,1,85000,0,85000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (40,40,10,85000,null,TO_DATE('2026-11-04 16:24:14','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (41,3,1,0,110000,0,110000,N'Đã thanh toán',TO_DATE('2026-12-10 09:31:11','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (41,3,1,41,110000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (77,41,5,null,1,110000,0,110000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (77,41,5,null,1,110000,0,110000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (41,41,9,110000,null,TO_DATE('2026-12-10 09:31:11','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (42,9,3,1,70000,0,70000,N'Đã thanh toán',TO_DATE('2026-12-24 17:28:07','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (42,9,3,42,70000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (78,42,21,null,2,35000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (78,42,21,null,2,35000,0,70000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (42,42,5,70000,null,TO_DATE('2026-12-24 17:28:07','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (43,6,3,0,150000,0,150000,N'Đã thanh toán',TO_DATE('2026-07-26 07:43:54','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (43,6,3,43,150000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (79,43,31,null,1,150000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (79,43,31,null,1,150000,0,150000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (43,43,2,150000,null,TO_DATE('2026-07-26 07:43:54','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (44,4,4,1,360000,0,360000,N'Đã thanh toán',TO_DATE('2026-04-18 15:52:53','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (44,4,4,44,360000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (80,44,1,null,2,85000,0,170000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (80,44,1,null,2,85000,0,170000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (81,44,2,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (81,44,2,null,2,95000,0,190000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (44,44,2,360000,null,TO_DATE('2026-04-18 15:52:53','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (45,7,4,1,315000,0,315000,N'Đã thanh toán',TO_DATE('2026-06-13 16:01:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (45,7,4,45,315000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (82,45,15,null,3,95000,0,285000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (82,45,15,null,3,95000,0,285000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (83,45,20,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (83,45,20,null,1,30000,0,30000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (45,45,7,315000,null,TO_DATE('2026-06-13 16:01:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (46,4,3,1,530000,0,530000,N'Đã thanh toán',TO_DATE('2026-08-02 09:37:53','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (46,4,3,46,530000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (84,46,23,null,1,180000,0,180000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (84,46,23,null,1,180000,0,180000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (85,46,5,null,2,110000,0,220000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (85,46,5,null,2,110000,0,220000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (86,46,12,null,2,75000,20000,130000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (86,46,12,null,2,75000,20000,130000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (46,46,7,530000,null,TO_DATE('2026-08-02 09:37:53','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (47,6,4,0,326000,0,326000,N'Đã thanh toán',TO_DATE('2026-01-25 18:56:23','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (47,6,4,47,326000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (87,47,31,null,1,150000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (87,47,31,null,1,150000,0,150000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (88,47,8,null,1,45000,9000,36000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (88,47,8,null,1,45000,9000,36000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (89,47,17,null,2,70000,0,140000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (89,47,17,null,2,70000,0,140000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (47,47,3,326000,null,TO_DATE('2026-01-25 18:56:23','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (48,4,3,0,340000,0,340000,N'Đã thanh toán',TO_DATE('2026-05-04 01:45:31','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (48,4,3,48,340000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (90,48,1,null,2,85000,0,170000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (90,48,1,null,2,85000,0,170000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (91,48,7,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (91,48,7,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (92,48,11,null,2,40000,0,80000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (92,48,11,null,2,40000,0,80000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (48,48,2,340000,null,TO_DATE('2026-05-04 01:45:31','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (49,2,3,0,35000,0,35000,N'Đã thanh toán',TO_DATE('2026-10-23 10:58:10','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (49,2,3,49,35000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (93,49,10,null,1,35000,0,35000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (93,49,10,null,1,35000,0,35000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (49,49,1,35000,null,TO_DATE('2026-10-23 10:58:10','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (50,3,4,1,95000,0,95000,N'Đã thanh toán',TO_DATE('2026-03-28 13:21:12','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (50,3,4,50,95000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (94,50,5,null,1,110000,15000,95000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (94,50,5,null,1,110000,15000,95000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (50,50,8,95000,null,TO_DATE('2026-03-28 13:21:12','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (51,9,1,0,400000,0,400000,N'Đã thanh toán',TO_DATE('2026-04-23 01:41:44','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (51,9,1,51,400000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (95,51,21,null,3,35000,20000,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (95,51,21,null,3,35000,20000,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (96,51,15,null,3,95000,0,285000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (96,51,15,null,3,95000,0,285000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (97,51,7,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (97,51,7,null,1,30000,0,30000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (51,51,6,400000,null,TO_DATE('2026-04-23 01:41:44','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (52,2,1,1,105000,0,105000,N'Đã thanh toán',TO_DATE('2026-02-12 19:55:27','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (52,2,1,52,105000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (98,52,21,null,3,35000,0,105000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (98,52,21,null,3,35000,0,105000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (52,52,6,105000,null,TO_DATE('2026-02-12 19:55:27','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (53,8,1,1,255000,0,255000,N'Đã thanh toán',TO_DATE('2026-11-18 16:59:28','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (53,8,1,53,255000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (99,53,13,null,3,85000,0,255000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (99,53,13,null,3,85000,0,255000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (53,53,5,255000,null,TO_DATE('2026-11-18 16:59:28','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (54,5,1,1,520000,0,520000,N'Đã thanh toán',TO_DATE('2026-09-02 17:25:34','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (54,5,1,54,520000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (100,54,15,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (100,54,15,null,2,95000,0,190000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (101,54,5,null,3,110000,0,330000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (101,54,5,null,3,110000,0,330000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (54,54,2,520000,null,TO_DATE('2026-09-02 17:25:34','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (55,5,3,0,339000,0,339000,N'Đã thanh toán',TO_DATE('2026-04-28 02:10:40','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (55,5,3,55,339000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (102,55,20,null,1,30000,6000,24000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (102,55,20,null,1,30000,6000,24000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (103,55,13,null,3,85000,0,255000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (103,55,13,null,3,85000,0,255000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (104,55,7,null,2,30000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (104,55,7,null,2,30000,0,60000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (55,55,6,339000,null,TO_DATE('2026-04-28 02:10:40','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (56,2,3,0,720000,0,720000,N'Đã thanh toán',TO_DATE('2026-01-08 19:34:44','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (56,2,3,56,720000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (105,56,24,null,3,220000,0,660000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (105,56,24,null,3,220000,0,660000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (106,56,17,null,1,70000,10000,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (106,56,17,null,1,70000,10000,60000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (56,56,9,720000,null,TO_DATE('2026-01-08 19:34:44','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (57,5,3,1,190000,0,190000,N'Đã hủy',TO_DATE('2026-07-29 10:52:38','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (57,5,3,57,190000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (107,57,15,null,2,95000,0,190000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (107,57,15,null,2,95000,0,190000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (58,6,4,0,490000,0,490000,N'Đã thanh toán',TO_DATE('2026-08-12 22:31:53','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (58,6,4,58,490000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (108,58,7,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (108,58,7,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (109,58,28,null,2,150000,0,300000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (109,58,28,null,2,150000,0,300000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (110,58,27,null,2,55000,10000,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (110,58,27,null,2,55000,10000,100000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (58,58,2,490000,null,TO_DATE('2026-08-12 22:31:53','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (59,1,3,0,565000,0,565000,N'Đã thanh toán',TO_DATE('2026-07-29 04:07:41','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (59,1,3,59,565000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (111,59,17,null,2,70000,15000,125000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (111,59,17,null,2,70000,15000,125000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (112,59,16,null,2,100000,0,200000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (112,59,16,null,2,100000,0,200000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (113,59,3,null,2,120000,0,240000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (113,59,3,null,2,120000,0,240000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (59,59,3,565000,null,TO_DATE('2026-07-29 04:07:41','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (60,2,3,0,480000,0,480000,N'Đã thanh toán',TO_DATE('2026-11-10 02:18:44','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (60,2,3,60,480000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (114,60,29,null,2,180000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (114,60,29,null,2,180000,0,360000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (115,60,9,null,3,40000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (115,60,9,null,3,40000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (60,60,2,480000,null,TO_DATE('2026-11-10 02:18:44','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (61,3,1,0,571000,0,571000,N'Đã thanh toán',TO_DATE('2026-04-29 17:18:52','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (61,3,1,61,571000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (116,61,31,null,3,150000,0,450000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (116,61,31,null,3,150000,0,450000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (117,61,18,null,1,45000,9000,36000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (117,61,18,null,1,45000,9000,36000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (118,61,26,null,3,35000,20000,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (118,61,26,null,3,35000,20000,85000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (61,61,1,571000,null,TO_DATE('2026-04-29 17:18:52','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (62,4,1,1,75000,0,75000,N'Đã hủy',TO_DATE('2026-01-23 02:39:39','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (62,4,1,62,75000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (119,62,12,null,1,75000,0,75000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (119,62,12,null,1,75000,0,75000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (63,9,3,1,875000,0,875000,N'Đã hủy',TO_DATE('2026-08-28 12:00:26','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (63,9,3,63,875000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (120,63,23,null,3,180000,0,540000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (120,63,23,null,3,180000,0,540000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (121,63,28,null,1,150000,15000,135000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (121,63,28,null,1,150000,15000,135000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (122,63,30,null,2,100000,0,200000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (122,63,30,null,2,100000,0,200000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (64,5,4,1,40000,0,40000,N'Đã thanh toán',TO_DATE('2026-01-28 09:20:36','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (64,5,4,64,40000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (123,64,9,null,1,40000,0,40000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (123,64,9,null,1,40000,0,40000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (64,64,10,40000,null,TO_DATE('2026-01-28 09:20:36','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (65,9,3,1,645000,0,645000,N'Đã hủy',TO_DATE('2026-01-15 22:30:23','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (65,9,3,65,645000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (124,65,15,null,3,95000,0,285000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (124,65,15,null,3,95000,0,285000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (125,65,23,null,2,180000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (125,65,23,null,2,180000,0,360000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (66,6,1,0,1030000,0,1030000,N'Đã thanh toán',TO_DATE('2026-08-07 23:48:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (66,6,1,66,1030000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (126,66,2,null,3,95000,20000,265000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (126,66,2,null,3,95000,20000,265000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (127,66,19,null,3,220000,0,660000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (127,66,19,null,3,220000,0,660000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (128,66,26,null,3,35000,0,105000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (128,66,26,null,3,35000,0,105000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (66,66,5,1030000,null,TO_DATE('2026-08-07 23:48:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (67,2,4,1,795000,0,795000,N'Đã thanh toán',TO_DATE('2026-02-19 01:09:30','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (67,2,4,67,795000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (129,67,24,null,3,220000,0,660000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (129,67,24,null,3,220000,0,660000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (130,67,18,null,3,45000,0,135000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (130,67,18,null,3,45000,0,135000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (67,67,2,795000,null,TO_DATE('2026-02-19 01:09:30','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (68,6,3,1,250000,0,250000,N'Đã hủy',TO_DATE('2026-08-14 20:02:45','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (68,6,3,68,250000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (131,68,5,null,1,110000,15000,95000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (131,68,5,null,1,110000,15000,95000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (132,68,7,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (132,68,7,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (133,68,10,null,2,35000,5000,65000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (133,68,10,null,2,35000,5000,65000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (69,10,4,1,810000,0,810000,N'Đã hủy',TO_DATE('2026-03-18 02:00:47','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (69,10,4,69,810000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (134,69,30,null,2,100000,0,200000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (134,69,30,null,2,100000,0,200000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (135,69,2,null,1,95000,10000,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (135,69,2,null,1,95000,10000,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (136,69,29,null,3,180000,15000,525000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (136,69,29,null,3,180000,15000,525000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (70,6,4,0,95000,0,95000,N'Đã thanh toán',TO_DATE('2026-04-29 00:18:10','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (70,6,4,70,95000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (137,70,2,null,1,95000,0,95000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (137,70,2,null,1,95000,0,95000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (70,70,1,95000,null,TO_DATE('2026-04-29 00:18:10','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (71,6,1,1,570000,0,570000,N'Đã hủy',TO_DATE('2026-03-01 00:20:27','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (71,6,1,71,570000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (138,71,24,null,2,220000,5000,435000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (138,71,24,null,2,220000,5000,435000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (139,71,1,null,1,85000,0,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (139,71,1,null,1,85000,0,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (140,71,6,null,2,25000,0,50000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (140,71,6,null,2,25000,0,50000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (72,9,4,0,440000,0,440000,N'Đã thanh toán',TO_DATE('2026-10-26 15:23:35','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (72,9,4,72,440000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (141,72,19,null,2,220000,0,440000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (141,72,19,null,2,220000,0,440000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (72,72,9,440000,null,TO_DATE('2026-10-26 15:23:35','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (73,9,1,1,845000,0,845000,N'Đã thanh toán',TO_DATE('2026-07-05 18:44:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (73,9,1,73,845000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (142,73,18,null,1,45000,0,45000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (142,73,18,null,1,45000,0,45000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (143,73,3,null,3,120000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (143,73,3,null,3,120000,0,360000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (144,73,19,null,2,220000,0,440000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (144,73,19,null,2,220000,0,440000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (73,73,9,845000,null,TO_DATE('2026-07-05 18:44:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (74,1,4,1,425000,0,425000,N'Đã thanh toán',TO_DATE('2026-09-13 02:22:09','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (74,1,4,74,425000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (145,74,14,null,3,120000,10000,350000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (145,74,14,null,3,120000,10000,350000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (146,74,6,null,3,25000,0,75000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (146,74,6,null,3,25000,0,75000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (74,74,2,425000,null,TO_DATE('2026-09-13 02:22:09','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (75,4,1,1,150000,0,150000,N'Đã thanh toán',TO_DATE('2026-05-09 10:23:51','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (75,4,1,75,150000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (147,75,12,null,2,75000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (147,75,12,null,2,75000,0,150000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (75,75,4,150000,null,TO_DATE('2026-05-09 10:23:51','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (76,4,4,1,720000,0,720000,N'Đã hủy',TO_DATE('2026-11-07 07:56:20','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (76,4,4,76,720000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (148,76,18,null,3,45000,0,135000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (148,76,18,null,3,45000,0,135000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (149,76,12,null,3,75000,0,225000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (149,76,12,null,3,75000,0,225000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (150,76,23,null,2,180000,0,360000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (150,76,23,null,2,180000,0,360000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (77,6,3,1,795000,0,795000,N'Đã thanh toán',TO_DATE('2026-12-09 19:31:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (77,6,3,77,795000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (151,77,19,null,3,220000,0,660000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (151,77,19,null,3,220000,0,660000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (152,77,8,null,3,45000,0,135000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (152,77,8,null,3,45000,0,135000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (77,77,6,795000,null,TO_DATE('2026-12-09 19:31:50','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (78,3,3,1,60000,0,60000,N'Đã hủy',TO_DATE('2026-08-11 16:51:49','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (78,3,3,78,60000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (153,78,25,null,1,60000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (153,78,25,null,1,60000,0,60000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (79,6,1,1,485000,0,485000,N'Đã thanh toán',TO_DATE('2026-11-10 08:32:08','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (79,6,1,79,485000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (154,79,19,null,1,220000,0,220000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (154,79,19,null,1,220000,0,220000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (155,79,9,null,1,40000,0,40000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (155,79,9,null,1,40000,0,40000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (156,79,12,null,3,75000,0,225000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (156,79,12,null,3,75000,0,225000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (79,79,1,485000,null,TO_DATE('2026-11-10 08:32:08','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (80,5,3,0,70000,0,70000,N'Đã thanh toán',TO_DATE('2026-09-12 19:44:30','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (80,5,3,80,70000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (157,80,17,null,1,70000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (157,80,17,null,1,70000,0,70000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (80,80,3,70000,null,TO_DATE('2026-09-12 19:44:30','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (81,10,1,0,195000,0,195000,N'Đã thanh toán',TO_DATE('2026-06-22 04:41:42','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (81,10,1,81,195000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (158,81,27,null,3,55000,0,165000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (158,81,27,null,3,55000,0,165000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (159,81,7,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (159,81,7,null,1,30000,0,30000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (81,81,3,195000,null,TO_DATE('2026-06-22 04:41:42','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (82,9,4,1,84000,0,84000,N'Đã hủy',TO_DATE('2026-02-01 12:30:57','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (82,9,4,82,84000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (160,82,7,null,2,30000,0,60000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (160,82,7,null,2,30000,0,60000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (161,82,22,null,1,30000,6000,24000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (161,82,22,null,1,30000,6000,24000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (83,7,3,0,80000,0,80000,N'Đã thanh toán',TO_DATE('2026-06-30 05:54:37','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (83,7,3,83,80000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (162,83,20,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (162,83,20,null,1,30000,0,30000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (163,83,6,null,2,25000,0,50000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (163,83,6,null,2,25000,0,50000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (83,83,10,80000,null,TO_DATE('2026-06-30 05:54:37','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (84,1,1,0,90000,0,90000,N'Đã thanh toán',TO_DATE('2026-03-27 11:19:17','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (84,1,1,84,90000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (164,84,20,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (164,84,20,null,3,30000,0,90000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (84,84,2,90000,null,TO_DATE('2026-03-27 11:19:17','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (85,10,1,1,280000,0,280000,N'Đã thanh toán',TO_DATE('2026-11-10 18:30:22','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (85,10,1,85,280000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (165,85,20,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (165,85,20,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (166,85,26,null,2,35000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (166,85,26,null,2,35000,0,70000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (167,85,25,null,2,60000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (167,85,25,null,2,60000,0,120000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (85,85,9,280000,null,TO_DATE('2026-11-10 18:30:22','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (86,9,4,0,135000,0,135000,N'Đã thanh toán',TO_DATE('2026-08-29 14:40:32','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (86,9,4,86,135000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (168,86,15,null,1,95000,10000,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (168,86,15,null,1,95000,10000,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (169,86,7,null,2,30000,10000,50000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (169,86,7,null,2,30000,10000,50000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (86,86,9,135000,null,TO_DATE('2026-08-29 14:40:32','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (87,1,1,0,320000,0,320000,N'Đã thanh toán',TO_DATE('2026-03-15 03:31:17','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (87,1,1,87,320000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (170,87,27,null,2,55000,0,110000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (170,87,27,null,2,55000,0,110000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (171,87,17,null,3,70000,0,210000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (171,87,17,null,3,70000,0,210000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (87,87,3,320000,null,TO_DATE('2026-03-15 03:31:17','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (88,2,4,1,195000,0,195000,N'Đã thanh toán',TO_DATE('2026-07-14 06:45:00','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (88,2,4,88,195000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (172,88,13,null,1,85000,0,85000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (172,88,13,null,1,85000,0,85000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (173,88,4,null,1,65000,0,65000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (173,88,4,null,1,65000,0,65000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (174,88,8,null,1,45000,0,45000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (174,88,8,null,1,45000,0,45000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (88,88,7,195000,null,TO_DATE('2026-07-14 06:45:00','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (89,8,4,1,114000,0,114000,N'Đã thanh toán',TO_DATE('2026-12-31 20:09:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (89,8,4,89,114000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (175,89,2,null,1,95000,5000,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (175,89,2,null,1,95000,5000,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (176,89,7,null,1,30000,6000,24000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (176,89,7,null,1,30000,6000,24000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (89,89,4,114000,null,TO_DATE('2026-12-31 20:09:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (90,4,1,0,45000,0,45000,N'Đã thanh toán',TO_DATE('2026-02-03 04:50:42','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (90,4,1,90,45000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (177,90,6,null,2,25000,5000,45000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (177,90,6,null,2,25000,5000,45000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (90,90,8,45000,null,TO_DATE('2026-02-03 04:50:42','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (91,9,1,1,236000,0,236000,N'Đã hủy',TO_DATE('2026-08-19 19:05:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (91,9,1,91,236000,4);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (178,91,21,null,2,35000,14000,56000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (178,91,21,null,2,35000,14000,56000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (179,91,2,null,2,95000,10000,180000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (179,91,2,null,2,95000,10000,180000);

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (92,10,1,0,105000,0,105000,N'Đã thanh toán',TO_DATE('2026-01-06 01:23:08','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (92,10,1,92,105000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (180,92,21,null,3,35000,0,105000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (180,92,21,null,3,35000,0,105000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (92,92,6,105000,null,TO_DATE('2026-01-06 01:23:08','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (93,1,3,1,540000,0,540000,N'Đã thanh toán',TO_DATE('2026-01-10 11:56:19','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (93,1,3,93,540000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (181,93,18,null,2,45000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (181,93,18,null,2,45000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (182,93,28,null,3,150000,0,450000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (182,93,28,null,3,150000,0,450000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (93,93,4,540000,null,TO_DATE('2026-01-10 11:56:19','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (94,1,1,0,150000,0,150000,N'Đã thanh toán',TO_DATE('2026-11-19 15:02:03','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (94,1,1,94,150000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (183,94,12,null,2,75000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (183,94,12,null,2,75000,0,150000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (94,94,5,150000,null,TO_DATE('2026-11-19 15:02:03','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (95,2,3,1,370000,0,370000,N'Đã thanh toán',TO_DATE('2026-11-29 23:47:16','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (95,2,3,95,370000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (184,95,16,null,1,100000,0,100000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (184,95,16,null,1,100000,0,100000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (185,95,25,null,3,60000,0,180000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (185,95,25,null,3,60000,0,180000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (186,95,20,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (186,95,20,null,3,30000,0,90000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (95,95,9,370000,null,TO_DATE('2026-11-29 23:47:16','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (96,9,3,0,70000,0,70000,N'Đã thanh toán',TO_DATE('2026-10-30 03:58:07','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (96,9,3,96,70000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (187,96,10,null,2,35000,0,70000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (187,96,10,null,2,35000,0,70000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (96,96,5,70000,null,TO_DATE('2026-10-30 03:58:07','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (97,1,1,1,440000,0,440000,N'Đã thanh toán',TO_DATE('2026-06-18 10:09:16','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (97,1,1,97,440000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (188,97,14,null,1,120000,0,120000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (188,97,14,null,1,120000,0,120000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (189,97,15,null,2,95000,20000,170000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (189,97,15,null,2,95000,20000,170000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (190,97,12,null,2,75000,0,150000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (190,97,12,null,2,75000,0,150000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (97,97,2,440000,null,TO_DATE('2026-06-18 10:09:16','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (98,2,3,1,30000,0,30000,N'Đã thanh toán',TO_DATE('2026-10-31 19:03:58','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (98,2,3,98,30000,0);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (191,98,20,null,1,30000,0,30000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (191,98,20,null,1,30000,0,30000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (98,98,10,30000,null,TO_DATE('2026-10-31 19:03:58','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (99,7,4,0,75000,0,75000,N'Đã thanh toán',TO_DATE('2026-02-15 12:42:48','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (99,7,4,99,75000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (192,99,26,null,1,35000,0,35000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (192,99,26,null,1,35000,0,35000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (193,99,9,null,1,40000,0,40000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (193,99,9,null,1,40000,0,40000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (99,99,7,75000,null,TO_DATE('2026-02-15 12:42:48','YYYY-MM-DD HH24:MI:SS'));

insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) values (100,8,1,0,341000,0,341000,N'Đã thanh toán',TO_DATE('2026-01-14 02:18:50','YYYY-MM-DD HH24:MI:SS'));
insert into orders (orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values (100,8,1,100,341000,1);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (194,100,20,null,3,30000,0,90000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (194,100,20,null,3,30000,0,90000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (195,100,30,null,2,100000,5000,195000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (195,100,30,null,2,100000,5000,195000);
insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (196,100,21,null,2,35000,14000,56000);
insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) values (196,100,21,null,2,35000,14000,56000);
insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values (100,100,3,341000,null,TO_DATE('2026-01-14 02:18:50','YYYY-MM-DD HH24:MI:SS'));
