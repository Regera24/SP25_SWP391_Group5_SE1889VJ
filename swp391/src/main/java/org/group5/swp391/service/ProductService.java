package org.group5.swp391.service;

import org.group5.swp391.dto.customer_requirement.CustomerProductDTO;
import org.group5.swp391.dto.employee.EmployeeProductDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDTO;
import org.group5.swp391.dto.store_owner.all_product.StoreProductDetailDTO;
import org.group5.swp391.dto.store_owner.store_detail.StoreDetailProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ProductService {
    public Page<StoreProductDTO> getStoreProducts(String productID, String productName, Double priceMin, Double priceMax,
                                                  String categoryName, List<String> storeIds, Integer quantityMin, Integer quantityMax,
                                                  int page, int size, String sortBy, boolean descending);
    public Page<EmployeeProductDTO> getProductsByCateID(String CateID, int page, int size, String sortBy, boolean descending);
    public Page<EmployeeProductDTO>getProductBySearch(String name, int page, int size, String sortBy, boolean descending,Long minQuantity, Long maxQuantity,String attributes);
    public List<EmployeeProductDTO>getProductBySearchInList(String name);
    public Page<CustomerProductDTO> getAllProducts();
    public Page<CustomerProductDTO> searchProducts(String query, int page, int size);
    public Page<CustomerProductDTO> searchProductsQuery(String querySearchName, String storeID, Double minPrice, Double maxPrice, int page, int size, String sortBy, boolean descending, String categoryID);
    public StoreProductDetailDTO updateStoreProduct(String productID, StoreProductDetailDTO dto);
    public StoreProductDetailDTO getStoreProduct(String id);
    public String updateStoreProductImage(String productID, MultipartFile file);
    public void deleteProduct(String productId);
    public Page<StoreDetailProductDTO> getProductsByFilter(String storeID,
                                                           String name,
                                                           Double fromPrice,
                                                           Double toPrice,
                                                           String information,
                                                           LocalDate fromCreatedAt,
                                                           LocalDate toCreatedAt,
                                                           LocalDate fromUpdatedAt,
                                                           LocalDate toUpdatedAt,
                                                           int page,
                                                           int size,
                                                           String sortBy,
                                                           boolean descending);
    public void deleteProductStore(String productId);
    public void addProduct(String storeID, StoreDetailProductDTO storeDetailProductDTO) throws Exception;
    public void updateProduct(String storeID, String productID, StoreDetailProductDTO storeDetailProductDTO) throws Exception;
    public Page<StoreDetailProductDTO> getAllProductsByStoreID(String search, String storeID, int page, int size, String sortBy, boolean descending);
    }