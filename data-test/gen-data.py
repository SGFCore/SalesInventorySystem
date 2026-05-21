import random
import string

# =============================================
# CONFIGURATION
# =============================================
NUMBER_OF_RECORDS   = 100

# New start ID for export receipts

OUTPUT_FILE         = r"D:\UNI DOCS\SalesInventorySystem\database\3.1-order-data.sql"

# Bắt đầu từ ID nào (demo data đã dùng 1-10 cho invoice/order/payment)
# Nếu demo INVOICE/ORDERS bị comment thì để START = 1
START_INVOICE_ID    = 1
START_ORDER_ID      = 1
START_PAYMENT_ID    = 1

# invoicedetail & orderdetail trong demo bị comment → bắt đầu từ 1
START_INV_DETAIL_ID = 1
START_ORD_DETAIL_ID = 1

# Prepare export receipt IDs list


# =============================================
# LOOKUP DATA (đồng bộ hoàn toàn với demo SQL không bị comment)
# =============================================

# CustomerID 1-10 (đã insert đủ trong demo CUSTOMER)
CUSTOMER_IDS = list(range(1, 11))

# EmployeeID bán hàng hợp lệ (demo có 4 nhân viên)
# 1=Quản lý, 2=Thủ kho, 3=Nhân viên bán hàng, 4=Kế toán
# Đơn hàng nên do quản lý, bán hàng hoặc kế toán xử lý
EMPLOYEE_IDS = [1, 3, 4]

# ShipCompanyID 1-10 (demo đã insert 10 công ty)
SHIP_COMPANY_IDS = list(range(1, 11))

# PaymentMethodID 1-10 (demo đã insert 10 phương thức thanh toán)
PAYMENT_METHOD_IDS = list(range(1, 11))

# ExportReceiptID 1-10 (demo đã insert 10 phiếu xuất kho)
EXPORT_RECEIPT_IDS = list(range(1, 11))

# SaleChannelCode:
#   0 = Tại quầy (trực tiếp)   → không có ship, exportreceipt = null
#   1 = Online / TMĐT           → có ship, exportreceipt có thể có
SALE_CHANNELS = [0, 1]

# Giá sản phẩm thực tế từ bảng PRODUCT (productid: productprice)
# Trùng khớp 100% với 31 sản phẩm mẫu không bị comment trong 3-sample-data.sql
PRODUCT_PRICES = {
    1:  85000,   # Túi tote vải canvas trơn
    2:  95000,   # Túi tote họa tiết hoa sen
    3: 120000,   # Túi xách vải handmade hoa văn dân tộc
    4:  65000,   # Ví handmade da tái chế
    5: 110000,   # Túi xách jean quai quần
    6:  25000,   # Khẩu trang trẻ em thêu con thỏ
    7:  30000,   # Khẩu trang 3D kháng khuẩn
    8:  45000,   # Xà phòng nhân sâm đỏ
    9:  40000,   # Xà phòng hoa oải hương
    10: 35000,   # Xà phòng sả chanh
    11: 40000,   # Xà phòng cà phê
    12: 75000,   # Khung hình để bàn
    13: 85000,   # Hộp đựng giấy
    14:120000,   # Tranh trang trí
    15: 95000,   # Chai rượu tái chế
    16:100000,   # Kệ sách mini
    17: 70000,   # Chậu cây mini
    18: 45000,   # Hộp đựng bút
    19:220000,   # Set napkin
    20: 30000,   # Lót ly rau củ
    21: 35000,   # Lót ly hải sản
    22: 30000,   # Lót ly cà phê
    23:180000,   # Quần jean suông
    24:220000,   # Quần jean thêu
    25: 60000,   # Khăn ăn hoa hồng
    26: 35000,   # Cúc áo thêu
    27: 55000,   # Túi rút thêu
    28:150000,   # Tranh thêu sen
    29:180000,   # Tranh thêu làng quê
    30:100000,   # Combo yêu thương
    31:150000,   # Combo sinh nhật
}

PRODUCT_IDS = list(PRODUCT_PRICES.keys())

# =============================================
# HELPERS
# =============================================

def random_shipcode() -> str:
    """Sinh mã vận đơn ngẫu nhiên an toàn (độ dài 12 ký tự, tránh vượt quá VARCHAR2(20))."""
    chars = string.ascii_uppercase + string.digits
    return "SPX" + "".join(random.choices(chars, k=9))


def random_date_2026() -> str:
    """Trả về chuỗi TO_DATE Oracle trong năm 2026."""
    month = random.randint(1, 12)
    max_day = (
        31 if month in (1, 3, 5, 7, 8, 10, 12)
        else 30 if month in (4, 6, 9, 11)
        else 28  # Tháng 2 (2026 không phải năm nhuận)
    )
    day    = random.randint(1, max_day)
    hour   = random.randint(0, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return (
        f"TO_DATE('2026-{month:02d}-{day:02d} "
        f"{hour:02d}:{minute:02d}:{second:02d}',"
        f"'YYYY-MM-DD HH24:MI:SS')"
    )


def oracle_str(text: str) -> str:
    """Wrap chuỗi unicode cho Oracle (dùng N'...')."""
    return f"N'{text}'"

# =============================================
# GENERATE
# =============================================

lines = []

inv_detail_id = START_INV_DETAIL_ID
ord_detail_id = START_ORD_DETAIL_ID

for i in range(NUMBER_OF_RECORDS):

    invoice_id = START_INVOICE_ID + i
    order_id   = START_ORDER_ID   + i
    payment_id = START_PAYMENT_ID + i

    customer_id      = random.choice(CUSTOMER_IDS)
    employee_id      = random.choice(EMPLOYEE_IDS)
    sale_channel     = random.choice(SALE_CHANNELS)
    ts               = random_date_2026()

    # --------------------------------------------------
    # Phân biệt đơn tại quầy (0) và đơn online (1)
    # --------------------------------------------------
    is_online = (sale_channel == 1)

    if is_online:
        ship_code_sql      = f"'{random_shipcode()}'"
        ship_company_sql   = str(random.choice(SHIP_COMPANY_IDS))
        shipping_fee       = random.randint(15000, 50000)
        
        # Ràng buộc CHECK (ShippingStatus IN (0,1,2,3))
        # 0: Chờ giao, 1: Đang giao, 2: Đã giao, 3: Trả lại/Thất bại
        shipping_status = random.choice([0, 1, 2, 3])
        shipping_status_sql = str(shipping_status)
        
        # Ánh xạ trạng thái đơn hàng (OrderStatus) và phiếu xuất kho (ExportReceiptID) nhất quán
        if shipping_status == 2:  # Đã giao
            order_status = 1      # Đã hoàn thành (Ràng buộc CHECK (OrderStatus IN (0,1,2,3,4,5)))
            export_receipt_sql = "null"
        elif shipping_status == 3: # Giao thất bại
            order_status = 4      # Đã huỷ
            export_receipt_sql = "null"
        elif shipping_status == 1: # Đang giao
            order_status = 1      # Đã hoàn thành
            export_receipt_sql = "null"
        else:                      # Chờ giao (0)
            order_status = 0      # Chờ duyệt / Mới tạo
            export_receipt_sql = "null"
            
        shipment_note_sql  = random.choice([
            oracle_str("Giao giờ hành chính"),
            oracle_str("Gọi trước khi giao"),
            oracle_str("Giao nhanh"),
            "null"
        ])
    else:
        # Tại quầy: không có vận chuyển
        ship_code_sql       = "null"
        ship_company_sql    = "null"
        shipping_fee        = 0
        shipping_status_sql = "null"
        export_receipt_sql  = "null"
        shipment_note_sql   = "null"
        order_status        = 1  # Bán tại quầy mặc định luôn hoàn thành (1)

    # --------------------------------------------------
    # Sinh chi tiết đơn hàng (1-3 sản phẩm, không trùng)
    # --------------------------------------------------
    num_details      = random.randint(1, 3)
    chosen_products  = random.sample(PRODUCT_IDS, num_details)

    details      = []
    order_total  = 0

    for product_id in chosen_products:
        base_price    = PRODUCT_PRICES[product_id]
        unit_price    = base_price          # Dùng đúng giá niêm yết
        quantity      = random.randint(1, 3)
        
        # Ngẫu nhiên giảm giá (20% cơ hội giảm giá, tối đa 20% tổng giá trị dòng)
        if random.random() < 0.20:
            max_discount = int(unit_price * quantity * 0.20)
            discount_amt = random.choice([5000, 10000, 15000, 20000])
            discount_amt = min(discount_amt, max_discount)
            # Làm tròn về nghìn đồng
            discount_amt = (discount_amt // 1000) * 1000
        else:
            discount_amt = 0
            
        line_total    = (unit_price * quantity) - discount_amt
        order_total  += line_total
        
        details.append({
            "product_id":      product_id,
            "quantity":        quantity,
            "unit_price":      unit_price,
            "discount_amount": discount_amt,
            "total_amount":    line_total,
        })

    tax_amount   = 0
    final_amount = order_total

    # Trạng thái hóa đơn: đồng bộ N'Đã thanh toán' hoặc N'Đã hủy'
    if order_status == 4:
        invoice_status_sql = oracle_str("Đã hủy")
    else:
        invoice_status_sql = oracle_str("Đã thanh toán")

    # --------------------------------------------------
    # INSERT INVOICE
    # --------------------------------------------------
    lines.append(
        f"insert into invoice "
        f"(invoiceid,customerid,employeeid,salechannelcode,"
        f"totalamount,taxamount,finalamount,status,invoicedate) values "
        f"({invoice_id},{customer_id},{employee_id},{sale_channel},"
        f"{order_total},{tax_amount},{final_amount},"
        f"{invoice_status_sql},{ts});"
    )

    # --------------------------------------------------
    # INSERT ORDERS
    # --------------------------------------------------
    lines.append(
        f"insert into orders "
        f"(orderid,customerid,employeeid,invoiceid,totalamount,orderstatus) values "
        f"({order_id},{customer_id},{employee_id},{invoice_id},"
        f"{order_total},{order_status});"
    )

    # --------------------------------------------------
    # INSERT INVOICEDETAIL + ORDERDETAIL
    # --------------------------------------------------
    for d in details:
        lines.append(
            f"insert into invoicedetail "
            f"(invoicedetailid,invoiceid,productid,comboid,"
            f"quantity,unitprice,discountamount,totalamount) values "
            f"({inv_detail_id},{invoice_id},{d['product_id']},null,"
            f"{d['quantity']},{d['unit_price']},{d['discount_amount']},{d['total_amount']});"
        )
        inv_detail_id += 1

        lines.append(
            f"insert into orderdetail "
            f"(orderdetailid,orderid,productid,comboid,"
            f"quantity,unitprice,discountamount,totalamount) values "
            f"({ord_detail_id},{order_id},{d['product_id']},null,"
            f"{d['quantity']},{d['unit_price']},{d['discount_amount']},{d['total_amount']});"
        )
        ord_detail_id += 1

    # --------------------------------------------------
    # INSERT PAYMENT (Đồng bộ với các đơn không bị huỷ)
    # --------------------------------------------------
    if order_status != 4:
        payment_method_id = random.choice(PAYMENT_METHOD_IDS)
        lines.append(
            f"insert into payment "
            f"(paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) values "
            f"({payment_id},{invoice_id},{payment_method_id},{final_amount},null,{ts});"
        )

    lines.append("")  # Dòng trống ngăn cách mỗi record

# =============================================
# WRITE FILE
# =============================================
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("ALTER SESSION SET CONTAINER = FREEPDB1;\nALTER SESSION SET CURRENT_SCHEMA = sgf_admin;\n\n")
    f.write("\n".join(lines))

total_inserts = (
    NUMBER_OF_RECORDS * 2                     # invoice + orders
    + (inv_detail_id - START_INV_DETAIL_ID)   # invoicedetail thực tế
    + (ord_detail_id - START_ORD_DETAIL_ID)   # orderdetail thực tế
)
# Cộng thêm số payment thực tế được sinh
payments_count = sum(1 for line in lines if "insert into payment" in line)
total_inserts += payments_count

print(f"SUCCESS: Generated {NUMBER_OF_RECORDS} records -> {OUTPUT_FILE}")
print(f"  Invoice ID   : {START_INVOICE_ID} -> {START_INVOICE_ID + NUMBER_OF_RECORDS - 1}")
print(f"  Order ID     : {START_ORDER_ID}   -> {START_ORDER_ID + NUMBER_OF_RECORDS - 1}")
print(f"  InvDetail ID : {START_INV_DETAIL_ID} -> {inv_detail_id - 1}  ({inv_detail_id - START_INV_DETAIL_ID} rows)")
print(f"  OrdDetail ID : {START_ORD_DETAIL_ID} -> {ord_detail_id - 1}  ({ord_detail_id - START_ORD_DETAIL_ID} rows)")
print(f"  Payments     : {payments_count} rows")
print(f"  Total INSERT : {total_inserts}")

