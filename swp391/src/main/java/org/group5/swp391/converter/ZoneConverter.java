package org.group5.swp391.converter;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.customer_requirement.CustomerZoneDTO;
import org.group5.swp391.dto.employee.EmployeeStoreDTO;
import org.group5.swp391.dto.employee.EmployeeZoneDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreZoneIdAndNameDTO;
import org.group5.swp391.dto.store_owner.store_detail.StoreDetailZoneDTO;
import org.group5.swp391.entity.Zone;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ZoneConverter {

    private final ModelMapper modelMapper;
    public CustomerZoneDTO toZoneDTO(Zone zone) {
        return modelMapper.map(zone, CustomerZoneDTO.class);
    }

    public EmployeeZoneDTO toEmployeeZoneDTO(Zone zone) {
        EmployeeZoneDTO EmployeeZoneDTO = new EmployeeZoneDTO();
        EmployeeZoneDTO.setZoneID(zone.getId());
        EmployeeZoneDTO.setName(zone.getName());
        EmployeeZoneDTO.setCreated_by(zone.getCreatedBy());
        EmployeeZoneDTO.setCreated_at(zone.getCreatedAt());
        EmployeeZoneDTO.setLocation(zone.getLocation());
        EmployeeZoneDTO.setUpdated_at(zone.getUpdatedAt());

        if (zone.getStore() != null) {
            EmployeeStoreDTO employeeStoreDTO = new EmployeeStoreDTO();
            employeeStoreDTO.setStoreID(zone.getStore().getId());
            employeeStoreDTO.setStoreName(zone.getStore().getStoreName());
            employeeStoreDTO.setAddress(zone.getStore().getAddress());
            employeeStoreDTO.setHotline(zone.getStore().getHotline());
            employeeStoreDTO.setDescription(zone.getStore().getDescription());
            employeeStoreDTO.setImage(zone.getStore().getImage());
            employeeStoreDTO.setExpireAt(zone.getStore().getExpireAt());
            employeeStoreDTO.setOperatingHour(zone.getStore().getOperatingHour());
            EmployeeZoneDTO.setEmployeeStoreDTO(employeeStoreDTO);
        }
        return EmployeeZoneDTO;
    }

    public StoreZoneIdAndNameDTO toStoreZoneIdAndNameDTO(Zone zone) {
        return modelMapper.map(zone, StoreZoneIdAndNameDTO.class);
    }

    public StoreDetailZoneDTO toStoreZoneDTO(Zone zone){
        StoreDetailZoneDTO storeDetailZoneDTO = modelMapper.map(zone, StoreDetailZoneDTO.class);
        storeDetailZoneDTO.setProductID(zone.getProduct().getId());
        storeDetailZoneDTO.setStoreID(zone.getStore().getId());
        storeDetailZoneDTO.setProductName(zone.getProduct().getName());
        storeDetailZoneDTO.setCreatedAt(zone.getCreatedAt());
        storeDetailZoneDTO.setUpdatedAt(zone.getUpdatedAt());
        return storeDetailZoneDTO;
    }
}
