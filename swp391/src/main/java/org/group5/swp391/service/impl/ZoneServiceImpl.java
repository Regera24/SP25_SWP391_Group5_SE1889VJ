package org.group5.swp391.service.impl;


import lombok.RequiredArgsConstructor;
import org.group5.swp391.converter.ZoneConverter;
import org.group5.swp391.dto.employee.EmployeeZoneDTO;
import org.group5.swp391.dto.store_owner.store_detail.StoreDetailZoneDTO;
import org.group5.swp391.entity.*;
import org.group5.swp391.dto.store_owner.all_product.StoreZoneIdAndNameDTO;
import org.group5.swp391.repository.*;
import org.group5.swp391.service.ZoneService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZoneServiceImpl implements ZoneService {
    private final ZoneRepository zoneRepository;
    private final ZoneConverter zoneConverter;
    private final AccountRepository accountRepository;
    private final EmployeeRepository employeeRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    public Page<EmployeeZoneDTO> getAllZone(int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zonePage = zoneRepository.findAll(pageable);
        return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }

    public Page<EmployeeZoneDTO>getFilterZones(int page, int size, String sortBy, boolean descending,
                                               String search){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Bạn chưa đăng nhập!");
        }
        String username = authentication.getName();
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Tài khoản không tồn tại"));
        Employee a = employeeRepository.findStoreIdByAccountEmpId(account.getId());
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if (search.equals("")) {
            search = null;
        }else{
            search = search.toLowerCase();
            search = capitalizeFirstLetters(search);
        }
        Page<Zone> zonePage = zoneRepository.findFilteredZones( search,a.getStore().getId(), pageable);
    return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }

    public Page<EmployeeZoneDTO>getSearchNameAndLocationZone(int page, int size, String sortBy, boolean descending, String search){
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zonePage=zoneRepository.findByNameAndLocationIgnoreCase(search,pageable);
        System.out.println(zonePage.getTotalElements());
        zonePage.forEach(zone -> System.out.println(zone.getName()));
        return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }


    @Override
    public List<StoreZoneIdAndNameDTO> getZoneIdAndNameForStore(String storeId) {
        return zoneRepository.findByStoreId(storeId).stream().map(zoneConverter::toStoreZoneIdAndNameDTO).collect(Collectors.toList());
    }

    //hàm cắt chuỗi in hoa chữ đầu cho mọi người
    public String capitalizeFirstLetters(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        String[] words = input.split("\\s+");
        StringBuilder capitalizedString = new StringBuilder();
        for (String word : words) {
            if (word.length() > 0) {
                capitalizedString.append(word.substring(0, 1).toUpperCase())
                        .append(word.substring(1).toLowerCase())
                        .append(" ");
            }
        }
        return capitalizedString.toString().trim();
    }

    //Hieu
    @Override
    public Page<StoreDetailZoneDTO> getStoreZones(String search, String storeID, int page, int size, String sortBy, boolean descending) throws Exception {

        Sort sort = descending
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zones;
        if (search != null) {
            zones = zoneRepository.findZoneByNameAndInformationContainsIgnoreCase(storeID, search, pageable);
        } else {
            zones = zoneRepository.findZonesByStore_StoreID(storeID, pageable);
        }
        return zones.map(zoneConverter::toStoreZoneDTO);
    }

    @Override
    public StoreDetailZoneDTO getZone(String zoneID) {
        Zone zone = zoneRepository.findZoneById(zoneID);
        return zoneConverter.toStoreZoneDTO(zone);
    }

    @Override
    public void addZone(StoreDetailZoneDTO storeZoneDTO) throws Exception {

        Zone newZone = new Zone();
        Store existingStore = storeRepository
                .findById(storeZoneDTO.getStoreID())
                .orElseThrow(() -> new Exception("Store not found"));
        if(storeZoneDTO.getProductID() != null) {
            Product existingProduct = productRepository
                    .findById(storeZoneDTO.getProductID())
                    .orElseThrow(() -> new Exception("Product not found"));
            newZone.setProduct(existingProduct);
        }
        newZone.setName(storeZoneDTO.getName());
        newZone.setStore(existingStore);
        newZone.setLocation(storeZoneDTO.getLocation());
        zoneRepository.save(newZone);
    }

    @Override
    public void updateZone(String zoneID, StoreDetailZoneDTO updatedZone) throws Exception {
        Zone updatingZone = zoneRepository.findZoneById(zoneID);
        updatingZone.setName(updatedZone.getName());
        updatingZone.setUpdatedAt(LocalDateTime.now());
        updatingZone.setLocation(updatedZone.getLocation());
        if(updatedZone.getProductID() != null) {
            Product foundProductByID = productRepository.findById(updatedZone.getProductID()).orElseThrow(() -> new Exception());
            updatingZone.setProduct(foundProductByID);
        }
        zoneRepository.save(updatingZone);
    }

    @Override
    public Page<StoreDetailZoneDTO> getZonesByFilter(
            String storeID, String name, String location, LocalDate fromCreatedAt,
            LocalDate toCreatedAt, LocalDate fromUpdateAt, LocalDate toUpdateAt,
            int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        LocalDateTime startCreatedDateTime = fromCreatedAt != null ? fromCreatedAt.atStartOfDay() : null;
        LocalDateTime endCreatedDateTime = toCreatedAt != null ? toCreatedAt.atTime(LocalTime.MAX) : null;
        LocalDateTime startUpdatedDateTime = fromUpdateAt != null ? fromUpdateAt.atStartOfDay() : null;
        LocalDateTime endUpdatedDateTime = toUpdateAt != null ? toUpdateAt.atTime(LocalTime.MAX) : null;
        Page<Zone> zones = zoneRepository.findZonesByFilters(storeID, name, location, startCreatedDateTime, endCreatedDateTime, startUpdatedDateTime, endUpdatedDateTime, pageable);
        return zones.map(zoneConverter::toStoreZoneDTO);
    }

    @Override
    public List<StoreZoneIdAndNameDTO> getEmptyZoneIdAndNameForStore(String storeId) {
        return zoneRepository.findByStoreIdAndProductIsNull(storeId).stream().map(zoneConverter::toStoreZoneIdAndNameDTO).collect(Collectors.toList());
    }

}
