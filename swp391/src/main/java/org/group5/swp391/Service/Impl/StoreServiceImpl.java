package org.group5.swp391.Service.Impl;

import org.group5.swp391.Converter.StoreConverter;
import org.group5.swp391.DTO.StoreOwner.StoreDTO;
import org.group5.swp391.Repository.StoreRepository;
import org.group5.swp391.Service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoreServiceImpl implements StoreService {
        @Autowired
        StoreConverter storeConverter;
        @Autowired
        StoreRepository storeRepository;

        @Override
        public List<StoreDTO> getStores(int page, int size, String sortBy, boolean descending) {
            Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);
            return storeRepository.findAll(pageable).stream().map(storeConverter::toStoreDTO).collect(Collectors.toList());
        }
}
