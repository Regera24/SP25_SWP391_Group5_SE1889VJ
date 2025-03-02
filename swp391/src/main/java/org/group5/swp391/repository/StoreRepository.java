package org.group5.swp391.repository;

import org.group5.swp391.entity.Account;
import org.group5.swp391.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, String> {
    Page<Store> findByStoreAccount(Account storeAccount, Pageable pageable);
    Page<Store> findByStoreAccountAndStoreNameContainingIgnoreCase(Account account, String storeName, Pageable pageable);
    List<Store> findByStoreAccount(Account storeAccount);
}