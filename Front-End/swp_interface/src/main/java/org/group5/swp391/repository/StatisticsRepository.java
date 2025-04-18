package org.group5.swp391.repository;

import org.group5.swp391.entity.Statistics;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface StatisticsRepository extends JpaRepository<Statistics, String> {

    @Query("""
        SELECT s
        FROM Statistics s
        WHERE s.store.id IN :storeIds
        AND (:storeName IS NULL OR LOWER(s.store.storeName) LIKE LOWER(CONCAT('%', :storeName, '%')))
        AND (:totalMoneyMin IS NULL OR s.totalMoney >= :totalMoneyMin)
        AND (:totalMoneyMax IS NULL OR s.totalMoney <= :totalMoneyMax)
        AND (:description IS NULL OR s.description = :description)
        AND (:type IS NULL OR s.type = :type)
        AND (:createdBy IS NULL OR LOWER(s.createdBy) LIKE LOWER(CONCAT('%', :createdBy, '%')))
        AND (:createdAtStart IS NULL OR s.createdAt >= :createdAtStart)
        AND (:createdAtEnd IS NULL OR s.createdAt <= :createdAtEnd)
    """)
    Page<Statistics> findStatisticsByStores(
            @Param("storeIds") List<String> storeIds,
            @Param("storeName") String storeName,
            @Param("totalMoneyMin") Double totalMoneyMin,
            @Param("totalMoneyMax") Double totalMoneyMax,
            @Param("description") String description,
            @Param("type") Boolean type,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("createdBy") String createdBy,
            Pageable pageable
    );

    @Query("""
    SELECT s
    FROM Statistics s
    WHERE s.store.id IN :storeIds
    AND (:createdAtStart IS NULL OR s.createdAt >= :createdAtStart)
    AND (:createdAtEnd IS NULL OR s.createdAt <= :createdAtEnd)
    AND (:description IS NULL OR s.description = :description)
""")
    List<Statistics> findStatisticsByDescription(
            @Param("storeIds") List<String> storeIds,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("description") String description
    );

    @Query("""
    SELECT s
    FROM Statistics s
    WHERE s.store.id IN :storeIds
    AND (:createdAtStart IS NULL OR s.createdAt >= :createdAtStart)
    AND (:createdAtEnd IS NULL OR s.createdAt <= :createdAtEnd)
    AND (:type IS NULL OR s.type = :type)
""")
    List<Statistics> findStatisticsByType(
            @Param("storeIds") List<String> storeIds,
            @Param("createdAtStart") LocalDateTime createdAtStart,
            @Param("createdAtEnd") LocalDateTime createdAtEnd,
            @Param("type") Boolean type
    );

    int countByStoreIdIn(List<String> storeIds);

    @Query("""
    SELECT SUM(s.totalMoney)
    FROM Statistics s
    WHERE s.store.id IN :storeIds
    AND LOWER(s.description) LIKE LOWER('Import')
""")
    Double getTotalImport(
            @Param("storeIds") List<String> storeIds
    );

    @Query("""
    SELECT SUM(s.totalMoney)
    FROM Statistics s
    WHERE s.store.id IN :storeIds
    AND LOWER(s.description) LIKE LOWER('Export')
""")
    Double getTotalExport(
            @Param("storeIds") List<String> storeIds
    );
}