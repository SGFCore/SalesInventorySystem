import random
import string
from datetime import datetime, timedelta

NUMBER_OF_RECORDS = 10000  # Thay đổi số lượng record tại đây
OUTPUT_FILE = "D:\UNI DOCS\SalesInventorySystem\data-test\generated-data.sql"


def random_shipcode(length=20):
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=length))


def random_date_2026():
    # Tháng 3 -> 12 năm 2026
    month = random.randint(3, 12)
    if month in (1, 3, 5, 7, 8, 10, 12):
        day = random.randint(1, 31)
    elif month in (4, 6, 9, 11):
        day = random.randint(1, 30)
    else:
        day = random.randint(1, 28)
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return f"to_timestamp('2026-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}','YYYY-MM-DD HH24:MI:SS')"


def generate_unit_price():
    # UnitPrice sẽ được random để khi nhân qty ra được TotalAmount hợp lý
    return round(random.uniform(20000, 100000), 4)


lines = []

for i in range(1, NUMBER_OF_RECORDS + 1):
    invoice_id = i
    order_id = i
    payment_id = i

    customer_id = random.randint(1, 10)
    employee_id = 3
    ship_code = random_shipcode(20)
    ship_company_id = random.randint(1, 3)
    shipping_fee = random.randint(1000, 20000)
    order_status = 3
    shipping_status = 2
    shipment_note = ''
    invoice_date = random_date_2026()
    sale_channel_code = random.randint(1, 3)

    # --- Generate detail lines (1-3 per order) ---
    num_details = random.randint(1, 3)
    details = []
    order_total = 0
    for _ in range(num_details):
        product_id = random.randint(1, 10)
        quantity = random.randint(1, 2)
        unit_price = round(random.uniform(20000, 100000), 4)
        discount_amount = 0
        total_amount = round(quantity * unit_price, 4)
        order_total += total_amount
        details.append({
            "product_id": product_id,
            "quantity": quantity,
            "unit_price": unit_price,
            "discount_amount": discount_amount,
            "total_amount": total_amount,
        })

    order_total = round(order_total, 4)
    tax_amount = 0
    final_amount = round(order_total + tax_amount, 4)

    # ---- INVOICE ----
    lines.append(
        f"insert into invoice (invoiceid,customerid,employeeid,salechannelcode,totalamount,taxamount,finalamount,status,invoicedate) "
        f"values ({invoice_id},{customer_id},{employee_id},{sale_channel_code},{order_total},{tax_amount},{final_amount},'COMPLETED',{invoice_date});"
    )

    # ---- ORDERS ----
    lines.append(
        f"insert into orders (orderid,customerid,employeeid,invoiceid,shipcode,shipcompanyid,totalamount,orderstatus,shippingstatus,shipmentnote,shippingfee,exportreceiptid) "
        f"values ({order_id},{customer_id},{employee_id},{invoice_id},'{ship_code}',{ship_company_id},{order_total},{order_status},{shipping_status},'{shipment_note}',{shipping_fee},null);"
    )

    # ---- INVOICEDETAIL & ORDERDETAIL ----
    for j, d in enumerate(details, start=1):
        inv_detail_id = (i - 1) * 3 + j
        ord_detail_id = (i - 1) * 3 + j

        lines.append(
            f"insert into invoicedetail (invoicedetailid,invoiceid,productid,comboid,quantity,unitprice,discountamount,totalamount) "
            f"values ({inv_detail_id},{invoice_id},{d['product_id']},null,{d['quantity']},{d['unit_price']},{d['discount_amount']},{d['total_amount']});"
        )
        lines.append(
            f"insert into orderdetail (orderdetailid,orderid,productid,comboid,quantity,unitprice,discountamount,totalamount) "
            f"values ({ord_detail_id},{order_id},{d['product_id']},null,{d['quantity']},{d['unit_price']},{d['discount_amount']},{d['total_amount']});"
        )

    # ---- PAYMENT ----
    payment_method_id = random.randint(1, 3)
    lines.append(
        f"insert into payment (paymentid,invoiceid,paymentmethodid,amountpaid,referencecode,paymentdate) "
        f"values ({payment_id},{invoice_id},{payment_method_id},{final_amount},null,{invoice_date});"
    )

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Done! Generated {NUMBER_OF_RECORDS} records -> {OUTPUT_FILE}")
print(f"Total INSERT statements: {len(lines)}")