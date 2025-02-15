package org.group5.swp391.Repository;

import org.group5.swp391.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, String> {
    List<Customer> findByPhoneNumberContainingIgnoreCase(String customerPhoneNumber);
}