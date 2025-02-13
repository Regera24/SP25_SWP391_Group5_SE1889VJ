package org.group5.swp391.Service.StoreOwnerService;

import org.group5.swp391.DTO.StoreOwnerDTO.StoreDTO;
import org.springframework.data.domain.Page;

public interface StoreService {
    public Page<StoreDTO> getStores(String storeName, int page, int size, String sortBy, boolean descending);
}
