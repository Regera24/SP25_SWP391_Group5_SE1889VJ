package org.group5.swp391.repository;

import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository("storeOwnerProductRepository")
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "JOIN p.store s " +
            "JOIN s.storeAccount sa " +
            "JOIN p.category c " +
            "WHERE (:productID IS NULL OR p.id = :productID) " +
            "AND (:productName IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :productName, '%'))) " +
            "AND (:priceMin IS NULL OR p.price >= :priceMin) " +
            "AND (:priceMax IS NULL OR p.price <= :priceMax) " +
            "AND (:categoryName IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :categoryName, '%'))) " +
            "AND (:quantityMin IS NULL OR p.quantity >= :quantityMin) " +
            "AND (:quantityMax IS NULL OR p.quantity <= :quantityMax) " +
            "AND ((:storeIds) IS NULL OR s.id IN (:storeIds))" +
            "AND sa.username = :username")
    Page<Product> findProducts(String productID,
                               String productName,
                               Double priceMin,
                               Double priceMax,
                               String categoryName,
                               List<String> storeIds,
                               Integer quantityMin,
                               Integer quantityMax,
                               String username,
                               Pageable pageable);

    int countByStoreIdIn(List<String> storeIds);

    Boolean existsByNameAndStoreIn(String name, List<Store> stores);

    //minh
    @Query("SELECT p FROM Product p " +
            "WHERE (:name IS NULL OR LOWER(p.name) LIKE %:name%) " +
            "AND (p.store.id = :storeId) " +
            "AND (:minQuantity IS NULL OR p.quantity >= :minQuantity) " +
            "AND (:maxQuantity IS NULL OR p.quantity <= :maxQuantity) " +
            "AND (:attributes IS NULL OR " +
            "p IN (SELECT p2 FROM Product p2 JOIN p2.productAttributes pa " +
            "WHERE pa.value IN :attributes " +
            "GROUP BY p2 " +
            "HAVING COUNT(pa) = :attributeCount))")
    Page<Product> findByNameAndStoreIdContainingIgnoreCase(
            @Param("name") String name,
            @Param("storeId") String storeId,
            Pageable pageable,
            @Param("minQuantity") Long minQuantity,
            @Param("maxQuantity") Long maxQuantity,
            @Param("attributes") List<String> attributes,
            @Param("attributeCount") Long attributeCount);

    @Query("SELECT s FROM Product s WHERE s.store.id = :id " +
            "AND (:name IS NULL OR :name = '' " +
            "OR LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Product> findByNameAndStoreIdContainingIgnoreCaseInList(@Param("name") String name,
                                                                 @Param("id") String storeid);

    @Query("Select s from Product  s where s.category.id = ?1")
    List<Product> findAllByCategoryId(String categoryId);

    @Query("Select s from Product s where s.category.id = :categoryId")
    Page<Product> findAllByCategoryId(Pageable pageable, String categoryId);

    @Query("SELECT s FROM Product s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')) and s.category.id = :categoryId")
    Page<Product> findByNameIgnoreCase(String name, String categoryId, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "p.name LIKE CONCAT('%',:query, '%') ")
//            "OR p.information LIKE CONCAT('%',:query, '%')")
    Page<Product> searchProducts(String query, Pageable pageable);

    List<Product> findByNameContainingAndPriceBetween(String name, Double minPrice, Double maxPrice, Pageable pageable);

    @Query("select  p from Product p where p.id = :stringId")
    Product findByStringId(String stringId);

    Optional<Product> findById(String id);

    @Query("""
                SELECT p 
                FROM Product p 
                JOIN p.store s 
                JOIN s.storeAccount a 
                WHERE a.username = :username 
                AND p.id = :productId
            """)
    Optional<Product> findProductForUser(@Param("username") String username, @Param("productId") String productId);

    @Query("SELECT p FROM Product p WHERE p.store.id = :storeID")
    List<Product> findProductsByStoreID(String storeID, Pageable pageable);
    @Query("SELECT p FROM Product p WHERE p.store.id = :storeID AND (p.name LIKE %:search% OR p.information LIKE %:search%)")
    List<Product> findProductsByInformationAndNameContainingIgnoreCase(String search, String storeID, Pageable pageable);
    long countByStore_Id(String storeID);
    long countByInformationAndNameContainingIgnoreCase(String search, String storeID);

    boolean existsProductByNameAndStore_Id(String name, String storeId);

    boolean existsProductByNameAndStore_IdAndIdNot(String name, String storeId, String id);

    @Query("SELECT p FROM Product p " +
            "WHERE p.store.id = :storeId " +
            "AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "AND (p.price >= :priceAfter) " +
            "AND (p.price <= :priceBefore)")
    Page<Product> findByNameContainingAndPriceBetweenInStoreID(String name, String storeId, Double priceAfter, Double priceBefore, Pageable pageable);

    @Query("Select s from Product  s where s.category.id = :categoryId AND s.store.id = :storeID")
    Page<Product> findAllProductStoreByCategoryId(String storeID, String categoryId, Pageable pageable);


    @Query("""
        SELECT p FROM Product p
        WHERE (:storeID IS NULL OR p.store.id = :storeID)
        AND (:name IS NULL OR TRIM(:name) <> '' AND LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')))
        AND (:fromPrice IS NULL OR p.price >= :fromPrice)
        AND (:toPrice IS NULL OR p.price <= :toPrice)
        AND (:information IS NULL OR TRIM(:information) <> '' AND LOWER(p.information) LIKE LOWER(CONCAT('%', :information, '%')))
        AND (:fromCreatedAt IS NULL OR p.createdAt >= :fromCreatedAt)
        AND (:toCreatedAt IS NULL OR p.createdAt <= :toCreatedAt)
        AND (:fromUpdatedAt IS NULL OR p.updatedAt >= :fromUpdatedAt)
        AND (:toUpdatedAt IS NULL OR p.updatedAt <= :toUpdatedAt)
    """)
    Page<Product> findProducts(@Param("storeID") String storeID,
                               @Param("name") String name,
                               @Param("fromPrice") Double fromPrice,
                               @Param("toPrice") Double toPrice,
                               @Param("information") String information,
                               @Param("fromCreatedAt") LocalDateTime fromCreatedAt,
                               @Param("toCreatedAt") LocalDateTime toCreatedAt,
                               @Param("fromUpdatedAt") LocalDateTime fromUpdateAt,
                               @Param("toUpdatedAt") LocalDateTime toUpdatedAt,
                               Pageable pageable
    );
}