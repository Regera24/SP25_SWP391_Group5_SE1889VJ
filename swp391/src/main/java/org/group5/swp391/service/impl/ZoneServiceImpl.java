package org.group5.swp391.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.group5.swp391.converter.ZoneConverter;
import org.group5.swp391.dto.employee.EmployeeZoneDTO;
import org.group5.swp391.dto.store_owner.detail_zone.StoreZoneDTO;
import org.group5.swp391.entity.Account;
import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.Store;
import org.group5.swp391.entity.Zone;
import org.group5.swp391.repository.AccountRepository;
import org.group5.swp391.repository.ProductRepository;
import org.group5.swp391.repository.StoreRepository;
import org.group5.swp391.repository.ZoneRepository;
import org.group5.swp391.service.ZoneService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ZoneServiceImpl implements ZoneService {
    private final ZoneRepository zoneRepository;
    private final ZoneConverter zoneConverter;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final AccountRepository accountRepository;

    public Page<EmployeeZoneDTO> getAllZone(int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zonePage = zoneRepository.findAll(pageable);
        return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }

    public Page<EmployeeZoneDTO> getFilterZones(int page, int size, String sortBy, boolean descending,
                                                Integer quantityMin, Integer quantityMax, Integer sizeMin, Integer sizeMax, String search) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if (search.equals("")) {
            search = null;
        }
        Page<Zone> zonePage = zoneRepository.findFilteredZones(quantityMin, quantityMax, sizeMin, sizeMax, search, pageable);
        return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }

    public Page<EmployeeZoneDTO> getSearchNameAndLocationZone(int page, int size, String sortBy, boolean descending, String search) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zonePage = zoneRepository.findByNameAndLocationIgnoreCase(search, pageable);
        return zonePage.map(zoneConverter::toEmployeeZoneDTO);
    }

    //Hieu
    @Override
    public Page<StoreZoneDTO> getStoreZones(String zoneName, String storeID, int page, int size, String sortBy, boolean descending) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new Exception("Not authenticated");
        }
        String username = auth.getName();
        Account account = accountRepository.findByUsername(username).orElseThrow(null);
        List<Store> stores = storeRepository.findByStoreAccount(account);
        Sort sort = descending
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Zone> zones;
        if (zoneName != null) {
            zones = zoneRepository.findZoneByNameContainsIgnoreCase(storeID, zoneName, pageable);
        } else {
            zones = zoneRepository.findZonesByStore_StoreID(storeID, pageable);
        }
        return zones.map(zoneConverter::toStoreZoneDTO);
    }

    @Override
    public StoreZoneDTO getZone(String zoneID) {
        Zone zone = zoneRepository.findZoneById(zoneID);
        return zoneConverter.toStoreZoneDTO(zone);
    }

    @Override
    public void addZone(StoreZoneDTO storeZoneDTO) throws Exception {
        Zone newZone = new Zone();
        Store existingStore = storeRepository
                .findById(storeZoneDTO.getStoreID())
                .orElseThrow(() -> new Exception("Store not found"));
        Product existingProduct = productRepository
                .findById(storeZoneDTO.getProductID())
                .orElseThrow(() -> new Exception("Product not found"));
        newZone.setName(storeZoneDTO.getName());
        newZone.setStore(existingStore);
        newZone.setProduct(existingProduct);

        newZone.setLocation(storeZoneDTO.getLocation());
        newZone.setSize(storeZoneDTO.getSize());
        newZone.setQuantity(storeZoneDTO.getQuantity());
        zoneRepository.save(newZone);
    }

    @Override
    public void updateZone(String zoneID, StoreZoneDTO updatedZone) throws Exception {
        Zone updatingZone = zoneRepository.findZoneById(zoneID);
        updatingZone.setUpdatedAt(LocalDateTime.now());
        updatingZone.setQuantity(updatedZone.getQuantity());
        updatingZone.setLocation(updatedZone.getLocation());
        updatingZone.setSize(updatedZone.getSize());
        Product foundProductByID = productRepository.findById(updatedZone.getProductID()).orElseThrow(() -> new Exception());
        updatingZone.setProduct(foundProductByID);
        zoneRepository.save(updatingZone);
    }

    @Override
    public void deleteZone(String zoneID) {

    }
}
