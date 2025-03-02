package org.group5.swp391.service;

import org.group5.swp391.dto.employee.EmployeeZoneDTO;
import org.group5.swp391.dto.store_owner.detail_zone.StoreZoneDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface ZoneService {
    public Page<EmployeeZoneDTO> getAllZone(int page, int size, String sortBy, boolean descending);
    public Page<EmployeeZoneDTO>getFilterZones(int page, int size, String sortBy, boolean descending,
                                               Integer quantityMin, Integer quantityMax, Integer sizeMin, Integer sizeMax,String search);
    public Page<EmployeeZoneDTO>getSearchNameAndLocationZone(int page, int size, String sortBy, boolean descending, String search);

    //Hieu
    public Page<StoreZoneDTO> getStoreZones(String storeID, int page, int size, String sortBy, boolean descending);
}
