package org.group5.swp391.Service.Impl;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.Converter.StatisticsConverter;
import org.group5.swp391.DTO.StoreOwnerDTO.StoreStatisticDTO;
import org.group5.swp391.Entity.Account;
import org.group5.swp391.Entity.Statistics;
import org.group5.swp391.Entity.Store;
import org.group5.swp391.Repository.AccountRepository;
import org.group5.swp391.Repository.StatisticsRepository;
import org.group5.swp391.Repository.StoreRepository;
import org.group5.swp391.Service.StatisticsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsRepository statisticsRepository;
    private final StatisticsConverter statisticsConverter;
    private final AccountRepository accountRepository;
    private final StoreRepository storeRepository;

    @Override
    public Page<StoreStatisticDTO> getStatistics(String storeName, int page, int size, String sortBy, boolean descending) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Bạn chưa đăng nhập!");
        }
        String username = authentication.getName();
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Tài khoản không tồn tại"));
        List<Store> stores = storeRepository.findByStoreAccount(account);
        if (stores.isEmpty()) {
            throw new ResponseStatusException(NOT_FOUND, "Không có cửa hàng nào thuộc tài khoản này.");
        }
        List<String> storeIds = stores.stream()
                .map(Store::getStoreID)
                .toList();
        boolean isStoreFilterDisabled = storeIds.isEmpty();
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Statistics> statisticsPage = statisticsRepository.findStatisticsByStores(
                storeIds,
                storeName,
                isStoreFilterDisabled,
                pageable
        );
        return statisticsPage.map(statisticsConverter::toStoreStatisticDTO);
    }
}