package org.group5.swp391.repository;

import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository("storeOwnerProductRepository")
public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findAll(Pageable pageable);

    Page<Product> findByStoreInAndNameContainingIgnoreCase(Collection<Store> stores, String name, Pageable pageable);

    @Query("Select s from Product  s where s.category.id = ?1")
    List<Product> findAllByCategoryId(String categoryId);

    @Query("Select s from Product s where s.category.id = :categoryId")
    Page<Product> findAllByCategoryId(Pageable pageable,String categoryId);

    @Query("SELECT s FROM Product s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%')) and s.category.id = :categoryId")
    Page<Product> findByNameIgnoreCase(String name,String categoryId,Pageable pageable);

    @Query("SELECT p FROM Product p WHERE "  +
            "p.name LIKE CONCAT('%',:query, '%') ")
//            "OR p.information LIKE CONCAT('%',:query, '%')")
    Page<Product> searchProducts(String query, Pageable pageable);

    List<Product> findByNameContainingAndPriceBetween(String name, Double minPrice, Double maxPrice, Pageable pageable);
}