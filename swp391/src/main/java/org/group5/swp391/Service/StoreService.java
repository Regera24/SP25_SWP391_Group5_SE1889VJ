package org.group5.swp391.Service;

import org.group5.swp391.DTO.StoreOwner.StoreDTO;

import java.util.List;

public interface StoreService {
    public List<StoreDTO> getStores(int page, int size, String sortBy, boolean descending);
}
