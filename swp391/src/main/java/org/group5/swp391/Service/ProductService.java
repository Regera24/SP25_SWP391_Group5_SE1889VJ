package org.group5.swp391.Service;

import org.group5.swp391.Converter.ProductConverterTool.ProductConverter;
import org.group5.swp391.DTO.ProductDTOTool.ProductDTO;
import org.group5.swp391.Entity.Product;
import org.group5.swp391.Repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductConverter productConverter;

    public Page<ProductDTO> getAllProducts(int page, int size) {

        Sort sort = Sort.by("price").descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> products = productRepository.findAll(pageable);
        List<ProductDTO> productDTOS = products.stream().map(productConverter::toProductDTO).collect(Collectors.toList());

        return new PageImpl<>(productDTOS, pageable, products.getTotalElements());
    }

    public Page<ProductDTO> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.searchProducts(query, pageable);
        List<ProductDTO> productPages = products.stream().map(productConverter::toProductDTO).collect(Collectors.toList());
        return new PageImpl<>(productPages, pageable, products.getTotalElements());
    }

}
