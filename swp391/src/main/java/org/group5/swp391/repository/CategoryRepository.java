package org.group5.swp391.repository;

import org.group5.swp391.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {


    Page<Category> findAll(Pageable pageable);
    @Query("SELECT s FROM Category s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Category> findByNameIgnoreCase(String name, Pageable pageable);
}
