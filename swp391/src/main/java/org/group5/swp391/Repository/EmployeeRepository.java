package org.group5.swp391.Repository;

import org.group5.swp391.Entity.Account;
import org.group5.swp391.Entity.Employee;
import org.group5.swp391.Entity.Invoice;
import org.group5.swp391.Entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Page<Employee> findByEmployeeAccountIn(Collection<Account> employeeAccount,Pageable pageable);
    Page<Employee> findByStoreIn(Collection<Store> stores, Pageable pageable);

    @Query("""
    SELECT e 
    FROM Employee e 
    JOIN e.employeeAccount a 
    WHERE e.store IN :stores
      AND (:name IS NULL OR LOWER(a.name) LIKE LOWER(CONCAT('%', :name, '%')))
      AND (:gender IS NULL OR a.gender = :gender)
""")
    Page<Employee> findByStoreInAndNameAndGender(
            @Param("stores") List<Store> stores,
            @Param("name") String name,
            @Param("gender") Boolean gender,
            Pageable pageable
    );
}
