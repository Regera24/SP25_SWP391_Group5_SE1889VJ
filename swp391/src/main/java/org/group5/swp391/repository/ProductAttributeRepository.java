package org.group5.swp391.repository;

import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, String> {
    @Query("""
    SELECT a
    FROM ProductAttribute a 
    WHERE a.store IN (SELECT s FROM Account a JOIN a.stores s WHERE a.username = :username) 
""")
    List<ProductAttribute> findProductAttributeForUser(@Param("username") String username);
}
