package org.group5.swp391.converter;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.customer_requirement.CustomerCategoryDTO;
import org.group5.swp391.dto.customer_requirement.CustomerProductAttributeDTO;
import org.group5.swp391.dto.customer_requirement.CustomerProductDTO;
import org.group5.swp391.dto.customer_requirement.CustomerZoneDTO;
import org.group5.swp391.dto.employee.EmployeeCategoryDTO;
import org.group5.swp391.dto.employee.EmployeeProductDTO;
import org.group5.swp391.dto.employee.EmployeeZoneDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreInfoIdAndNameDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductAttributeDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDetailDTO;
import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.ProductAttribute;
import org.group5.swp391.entity.Zone;
import org.group5.swp391.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductConverter {
    private final ModelMapper modelMapper;
    private final ProductAttributeConverter productAttributeConverter;
    private final ZoneConverter zoneConverter;
    private final CategoryConverter categoryConverter;
    private final StoreConverter storeConverter;
    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final ZoneRepository zoneRepository;

    public CustomerProductDTO toCustomerProductDTO(Product product) {
        CustomerProductDTO customerProductDTO = modelMapper.map(product, CustomerProductDTO.class);
        customerProductDTO.setProductID(product.getId());
        List<CustomerProductAttributeDTO> pads = product.getProductAttributes().stream().map(productAttributeConverter::toProductAttributeDTO).collect(Collectors.toList());
        customerProductDTO.setProductAttributes(pads);

        List<CustomerZoneDTO> zds = product.getZones().stream().map(zoneConverter::toZoneDTO).collect(Collectors.toList());
        customerProductDTO.setZones(zds);

        CustomerCategoryDTO cd = categoryConverter.toCategoryDTO(product.getCategory());
        customerProductDTO.setCustomerCategoryDTO(cd);
        return customerProductDTO;
    }

    public StoreProductDTO toStoreProductDTO(Product product){
        StoreProductDTO storeProductDTO = modelMapper.map(product, StoreProductDTO.class);
        storeProductDTO.setCategoryName(product.getCategory().getName());
        storeProductDTO.setProductID(product.getId());
        storeProductDTO.setStore(product.getStore().getStoreName());
        return storeProductDTO;
    }

    public StoreProductDetailDTO toStoreProductDetailDTO(Product product){
        StoreProductDetailDTO dto = modelMapper.map(product, StoreProductDetailDTO.class);
        dto.setCategory(categoryConverter.toStoreCategoryIdAndName(product.getCategory()));
        dto.setProductID(product.getId());
        dto.setStore(storeConverter.toStoreInfoIdAndNameDTO(product.getStore()));
        List<StoreProductAttributeDTO> attributeDTOS = product.getProductAttributes().stream().map(productAttributeConverter::toStoreProductAttributeDTO).toList();
        dto.setAttributes(attributeDTOS);
        dto.setQuantity(zoneRepository.getTotalQuantityByProductId(product.getId()));
        return dto;
    }

    public void updateProductFromDTO(StoreProductDetailDTO dto, Product product) {
        modelMapper.map(dto, product);
        product.setCategory(categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found")));
        product.setStore(storeRepository.findById(dto.getStore().getId())
                .orElseThrow(() -> new RuntimeException("Store not found")));
        List<ProductAttribute> attributes = dto.getAttributes().stream()
                .map(attrDto -> productAttributeRepository.findById(attrDto.getId())
                        .orElseThrow(() -> new RuntimeException("Attribute not found: " + attrDto.getId())))
                .toList();
        product.setProductAttributes(attributes);
        List<Zone> zones = zoneRepository.findByProductId(dto.getProductID());
        product.setZones(zones);
    }


    private long calculateTotalQuantityFromZones(Product product) {
        if (product.getZones() == null || product.getZones().isEmpty()) {
            return 0;
        }

        return product.getZones().stream()
                .mapToLong(Zone::getQuantity)
                .sum();
    }

    public EmployeeProductDTO toEmployeeProductDTO(Product product) {

        EmployeeProductDTO employeeProductDTO = new EmployeeProductDTO();

        employeeProductDTO.setProductID(product.getId());
        employeeProductDTO.setName(product.getName());
        employeeProductDTO.setPrice(product.getPrice());
        employeeProductDTO.setInformation(product.getInformation());
        employeeProductDTO.setProductImage(product.getProductImage());
        employeeProductDTO.setQuantity(calculateTotalQuantityFromZones(product));

        if (product.getCategory() != null) {
            EmployeeCategoryDTO employeeCategoryDTO = new EmployeeCategoryDTO();
            employeeCategoryDTO.setCategoryID(product.getCategory().getId());
            employeeCategoryDTO.setName(product.getCategory().getName());
            employeeCategoryDTO.setDescription(product.getCategory().getDescription());
            employeeProductDTO.setEmployeeCategoryDTO(employeeCategoryDTO);
        }

        if(product.getZones() != null) {
            List<EmployeeZoneDTO> employeeZoneDTOList =  product.getZones().stream()
                    .map(zone -> {
                        EmployeeZoneDTO EmployeeZoneDTO =new EmployeeZoneDTO();
                        EmployeeZoneDTO.setZoneID(zone.getId());
                        EmployeeZoneDTO.setName(zone.getName());
                        EmployeeZoneDTO.setName(zone.getName());
                        EmployeeZoneDTO.setQuantity(zone.getQuantity());
                        EmployeeZoneDTO.setSize(zone.getSize());
                        return EmployeeZoneDTO;
                    }).collect(Collectors.toList());

            employeeProductDTO.setZonesetDTOList(employeeZoneDTOList);
        }

        return employeeProductDTO;
    }
}
