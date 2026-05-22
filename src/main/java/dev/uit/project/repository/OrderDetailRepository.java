package dev.uit.project.repository;

import dev.uit.project.entity.Orderdetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderDetailRepository extends JpaRepository<Orderdetail, Long> {

    @Query(value = """
        SELECT od.PRODUCTID, p.PRODUCTNAME, SUM(od.QUANTITY) AS QTY, SUM(od.TOTALAMOUNT) AS TOTAL
        FROM ORDERDETAIL od
        JOIN PRODUCT p ON od.PRODUCTID = p.PRODUCTID
        WHERE od.ORDERID IN :orderIds
        GROUP BY od.PRODUCTID, p.PRODUCTNAME
    """, nativeQuery = true)
    List<Object[]> sumByOrderIds(@Param("orderIds") List<Long> orderIds);
}