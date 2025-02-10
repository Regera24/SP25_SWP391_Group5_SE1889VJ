package org.group5.swp391.Repository;

import org.group5.swp391.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, String> {
    public Optional<Account> findByUsername(String username);
    public Optional<Account> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);
//    public Account findByUsername(String username);

    // Tìm tài khoản theo role
    public List<Account> findByRole_Code(String roleCode);

    // Tìm tài khoản theo Account ID
    Optional<Account> findByAccountID(String accountID);

}
