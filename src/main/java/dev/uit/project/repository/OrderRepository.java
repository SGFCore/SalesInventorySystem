package dev.uit.project.repository;

import dev.uit.project.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = """
        SELECT o.ORDERID, o.TOTALAMOUNT, i.INVOICEDATE,
               CASE WHEN o.SHIPCOMPANYID IS NOT NULL THEN 'Online' ELSE 'Direct' END AS CHANNEL
        FROM "ORDER" o
        JOIN INVOICE i ON o.INVOICEID = i.INVOICEID
        WHERE i.STATUS = 'PAID'
        AND TRUNC(i.INVOICEDATE) = TRUNC(:date)
    """, nativeQuery = true)
    List<Object[]> findPaidOrdersByDate(@Param("date") LocalDate date);

    @Query(value = """
        SELECT o.ORDERID, o.TOTALAMOUNT, i.INVOICEDATE,
               CASE WHEN o.SHIPCOMPANYID IS NOT NULL THEN 'Online' ELSE 'Direct' END AS CHANNEL
        FROM "ORDER" o
        JOIN INVOICE i ON o.INVOICEID = i.INVOICEID
        WHERE i.STATUS = 'PAID'
        AND EXTRACT(MONTH FROM i.INVOICEDATE) = :month
        AND EXTRACT(YEAR FROM i.INVOICEDATE) = :year
    """, nativeQuery = true)
    List<Object[]> findPaidOrdersByMonth(@Param("month") int month, @Param("year") int year);

    @Query(value = """
        SELECT o.ORDERID, o.TOTALAMOUNT, i.INVOICEDATE,
               CASE WHEN o.SHIPCOMPANYID IS NOT NULL THEN 'Online' ELSE 'Direct' END AS CHANNEL
        FROM "ORDER" o
        JOIN INVOICE i ON o.INVOICEID = i.INVOICEID
        WHERE i.STATUS = 'PAID'
        AND EXTRACT(YEAR FROM i.INVOICEDATE) = :year
    """, nativeQuery = true)
    List<Object[]> findPaidOrdersByYear(@Param("year") int year);
}