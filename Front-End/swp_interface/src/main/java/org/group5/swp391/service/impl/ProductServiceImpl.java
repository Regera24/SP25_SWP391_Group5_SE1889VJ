package org.group5.swp391.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.group5.swp391.converter.ProductConverter;
import org.group5.swp391.dto.customer_requirement.CustomerProductDTO;
import org.group5.swp391.dto.employee.EmployeeProductDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductAttributeDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDTO;
import org.group5.swp391.dto.store_owner.store_detail.StoreDetailProductDTO;
import org.group5.swp391.entity.Account;
import org.group5.swp391.entity.Employee;
import org.group5.swp391.entity.Product;
import org.group5.swp391.entity.Store;
import org.group5.swp391.repository.AccountRepository;
import org.group5.swp391.repository.EmployeeRepository;
import org.group5.swp391.repository.ProductRepository;
import org.group5.swp391.repository.StoreRepository;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDetailDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreZoneIdAndNameDTO;
import org.group5.swp391.entity.*;
import org.group5.swp391.exception.AppException;
import org.group5.swp391.exception.ErrorCode;
import org.group5.swp391.repository.*;
import org.group5.swp391.service.ProductService;
import org.group5.swp391.utils.CloudinaryService;
import org.springframework.data.domain.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductConverter productConverter;
    private final AccountRepository accountRepository;
    private final StoreRepository storeRepository;
    private final EmployeeRepository employeeRepository;
    private final CategoryRepository categoryRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final CloudinaryService cloudinaryService;
    private final ZoneRepository zoneRepository;

    // Chien
    private Product checkProductOfUser(String productID) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        String username = authentication.getName();
        return productRepository.findProductForUser(username, productID)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
    }

    @Override
    public Page<StoreProductDTO> getStoreProducts(String productID, String productName, Double priceMin, Double priceMax,
                                                  String categoryName, List<String> storeIds, Integer quantityMin, Integer quantityMax,
                                                  int page, int size, String sortBy, boolean descending) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String username = authentication.getName();
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if (storeIds != null && storeIds.isEmpty()) {
            storeIds = null;
        }
        productID = (productID != null && !productID.trim().isEmpty()) ? productID.trim() : null;
        Page<Product> list = productRepository.findProducts(productID, productName, priceMin, priceMax, categoryName, storeIds, quantityMin, quantityMax, username, pageable);
        return list.map(productConverter::toStoreProductDTO);
    }

    public StoreProductDetailDTO getStoreProduct(String id) {
        Product product = checkProductOfUser(id);
        return productConverter.toStoreProductDetailDTO(product);
    }

    @Transactional
    public StoreProductDetailDTO updateStoreProduct(String productID, StoreProductDetailDTO dto) {
        Product product = checkProductOfUser(productID);
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setInformation(dto.getInformation());
        product.setQuantity(dto.getQuantity());
        product.setProductImage(dto.getProductImage());
        Category category = categoryRepository.findById(dto.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy danh mục với ID: " + dto.getCategory().getId()));
        product.setCategory(category);
        List<ProductAttribute> attributes = productAttributeRepository.findAllById(
                dto.getAttributes().stream()
                        .map(StoreProductAttributeDTO::getId)
                        .toList()
        );
        product.setProductAttributes(attributes);
        List<Zone> oldZones = new ArrayList<>(product.getZones());
        product.getZones().clear();
        for (StoreZoneIdAndNameDTO zoneDto : dto.getZones()) {
            Zone zone;
            if (zoneDto.getId() != null) {
                zone = zoneRepository.findById(zoneDto.getId()).orElse(new Zone());
            } else {
                zone = new Zone();
            }
            zone.setName(zoneDto.getName());
            zone.setProduct(product);
            product.getZones().add(zone);
        }
        for (Zone oldZone : oldZones) {
            if (!product.getZones().contains(oldZone)) {
                oldZone.setProduct(null);
                zoneRepository.save(oldZone);
            }
        }
        productRepository.save(product);
        return productConverter.toStoreProductDetailDTO(product);
    }

    @Transactional
    public String updateStoreProductImage(String productID, MultipartFile file) {
        try {
            checkProductOfUser(productID);
            return cloudinaryService.uploadFile(file);
        } catch (IOException e) {
            throw new AppException(ErrorCode.CANT_UPLOAD_IMAGE);
        }
    }

    @Transactional
    public void deleteProduct(String productId) {
        Product product = checkProductOfUser(productId);
        List<Zone> zones = product.getZones();
        zones.forEach(zone -> {
            zone.setProduct(null);
            zoneRepository.save(zone);
        });
        productRepository.delete(product);
    }



    // Minh Tran
    @Override
    public Page<EmployeeProductDTO> getProductsByCateID(String CateID, int page, int size, String sortBy, boolean descending) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Product> productPage = productRepository.findAllByCategoryId(pageable, CateID);
        return productPage.map(productConverter::toEmployeeProductDTO);
    }

    @Override
    public Page<EmployeeProductDTO> getProductBySearch(String name, int page, int size,
                                                       String sortBy, boolean descending,Integer minQuantity, Integer maxQuantity) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Bạn chưa đăng nhập!");
        }
        String username = authentication.getName();
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Tài khoản không tồn tại"));
        Employee a = employeeRepository.findStoreIdByAccountEmpId(account.getId());
        System.out.println(a.getStore().getId());
        System.out.println(sortBy);
        System.out.println(descending);
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        if (name.equals("") || name.isEmpty()) {
            name = null;
        } else {
            name = name.toLowerCase();
            name = capitalizeFirstLetters(name);
            System.out.println(name);
        }
        Page<Product> productPage = productRepository.findByNameAndStoreIdContainingIgnoreCase(name, a.getStore().getId(), pageable,minQuantity,maxQuantity);
        return productPage.map(productConverter::toEmployeeProductDTO);
    }

    @Override
    public List<EmployeeProductDTO> getProductBySearchInList(String name) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AccessDeniedException("Bạn chưa đăng nhập!");
        }
        String username = authentication.getName();
        Account account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Tài khoản không tồn tại"));
        Employee a = employeeRepository.findStoreIdByAccountEmpId(account.getId());
        if (name.equals("") || name.isEmpty()) {
            name = null;
        } else {
            name = name.toLowerCase();
            name = capitalizeFirstLetters(name);
        }
        List<Product> productPage = productRepository.findByNameAndStoreIdContainingIgnoreCaseInList(name, a.getStore().getId());
        return productPage.stream().map(productConverter::toEmployeeProductDTO).collect(Collectors.toList());

    }

    // Hieu
    @Override
    public Page<CustomerProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<CustomerProductDTO> customerProductDTOS = products.stream().map(productConverter::toCustomerProductDTO).collect(Collectors.toList());

        return new PageImpl<>(customerProductDTOS);
    }

    @Override
    public Page<CustomerProductDTO> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productRepository.searchProducts(query, pageable);
        List<CustomerProductDTO> productPages = products.stream().map(productConverter::toCustomerProductDTO).collect(Collectors.toList());
        return new PageImpl<>(productPages, pageable, products.getTotalElements());
    }

    @Override
    public Page<StoreDetailProductDTO> getAllProductsByStoreID(String search, String storeID, int page, int size, String sortBy, boolean descending) {
        Sort sort = descending
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        List<StoreDetailProductDTO> productPages;
        if (search == null || search.isEmpty()) {
            List<Product> products = productRepository.findProductsByStoreID(storeID, pageable);
            productPages = products.stream().map(productConverter::toStoreDetailProductDTO).collect(Collectors.toList());
        } else {
            List<Product> filteredProducts = productRepository.findProductsByInformationAndNameContainingIgnoreCase(search, storeID, pageable);
            productPages = filteredProducts.stream().map(productConverter::toStoreDetailProductDTO).collect(Collectors.toList());
        }
        return new PageImpl<>(productPages, pageable, (productPages.size() + 1));
    }

    @Override
    public Page<CustomerProductDTO> searchProductsQuery(String querySearchName, Double minPrice, Double maxPrice, int page, int size, String sortBy, boolean descending, String categoryID) {
        Sort sort = descending ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        List<Product> products = productRepository
                .findByNameContainingAndPriceBetween(querySearchName, minPrice, maxPrice, pageable);
        List<CustomerProductDTO> productPages;
        if (categoryID != null && !categoryID.isEmpty()) {
            productPages = productRepository.findAllByCategoryId(categoryID).stream()
                    .map(productConverter::toCustomerProductDTO).collect(Collectors.toList());
        } else {
            productPages = products.stream()
                    .map(productConverter::toCustomerProductDTO).collect(Collectors.toList());
        }
        return new PageImpl<>(productPages, pageable, (products.size() + 1));
    }

    @Override
    public void addProduct(String storeID, StoreDetailProductDTO storeDetailProductDTO) throws Exception {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) {
                throw new Exception("Not authenticated");
            }
            String username = auth.getName();
            Account account = accountRepository.findByUsername(username)
                    .orElseThrow(() -> new Exception("Account not found for username: " + username));
            List<Store> stores = storeRepository.findByStoreAccount(account);
            String storeList = new String();
            for (Store store : stores) {
                storeList += store.getId() + " ";
            }
            if (!storeList.contains(storeID)) {
                throw new Exception("Store not found for id: " + storeID);
            }

            Product newProduct = new Product();

            Category cateExisting = categoryRepository.findCategoryById(storeDetailProductDTO.getStoreDetailCategoryDTO().getId());
            if (cateExisting == null) {
                throw new Exception("Category does not exist");
            }

            Store storeExisting = storeRepository.findById(storeID)
                    .orElseThrow(() -> new Exception("Store not found for ID: " + storeID));

            newProduct.setName(storeDetailProductDTO.getName());
            newProduct.setPrice(storeDetailProductDTO.getPrice());
            newProduct.setInformation(storeDetailProductDTO.getInformation());
            newProduct.setCategory(cateExisting);
            newProduct.setStore(storeExisting);
            newProduct.setQuantity(storeDetailProductDTO.getQuantity());
            newProduct.setProductImage(storeDetailProductDTO.getProductImage());
            System.out.println(newProduct.toString());
            productRepository.save(newProduct);
        } catch (Exception e) {
            throw new Exception("Failed to save product: " + e.getMessage());
        }
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
}