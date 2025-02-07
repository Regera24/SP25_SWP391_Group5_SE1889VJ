package org.group5.swp391.Repository;

import org.group5.swp391.Entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    Page<Invoice> findByCustomerNameContainingIgnoreCase(String customerName, Pageable pageable);
    Page<Invoice> findAll(Pageable pageable);
}
