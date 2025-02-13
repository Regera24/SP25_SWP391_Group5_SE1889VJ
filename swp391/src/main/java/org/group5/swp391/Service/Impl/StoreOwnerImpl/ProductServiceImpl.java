package org.group5.swp391.Service.Impl.StoreOwnerImpl;

import org.group5.swp391.Converter.StoreOwner.ProductConverter;
import org.group5.swp391.DTO.StoreOwnerDTO.ProductDTO;
import org.group5.swp391.Repository.StoreOwnerRepository.ProductRepository;
import org.group5.swp391.Service.StoreOwnerService.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductConverter productConverter;

    @Override
    public Page<ProductDTO> getProducts(String productName, int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if(productName == null || productName.isEmpty()){
            productRepository.findAll(pageable).map(productConverter::toProductDTO);
        }
        return productRepository.findByNameContainingIgnoreCase(productName, pageable).map(productConverter::toProductDTO);
    }

}
