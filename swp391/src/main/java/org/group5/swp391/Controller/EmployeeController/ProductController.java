package org.group5.swp391.Controller.EmployeeController;


import lombok.Data;
import org.group5.swp391.DTO.EmployeeDTO.CategoryDTO;
import org.group5.swp391.DTO.EmployeeDTO.ProductDTO;
import org.group5.swp391.Service.EmployeeService.CategoryService;
import org.group5.swp391.Service.EmployeeService.ProductService;
import org.springframework.boot.autoconfigure.batch.BatchTransactionManager;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home/owner")
@Data
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;



    @GetMapping("/products")
    public Page<CategoryDTO> getAllCategories(@RequestParam("page") int page,
                                              @RequestParam("size") int size) {
        return categoryService.getAllCategories(page,size,"categoryID",false);
    }

    @GetMapping("/products/byCategoryName")
    public Page<CategoryDTO> getCategoryByName(@RequestParam("name")String name, @RequestParam("page") int page,
                                              @RequestParam("size") int size) {

        return categoryService.getCategoryBySearch(name,page,size,"categoryID",false);
    }

    @GetMapping("/products/byCategory")
    public Page<ProductDTO> getProductByCateID(@RequestParam("categoryID")String categoryID, @RequestParam("page") int page,
                                               @RequestParam("size") int size) {
        System.out.println("Received categoryID: " + categoryID);
       return productService.getProductsByCateID(categoryID,page,size,"price",false);
    }
    @GetMapping("/products/byProductName")
    public Page<ProductDTO> getProductByName(@RequestParam("name")String name,@RequestParam("categoryID")String categoryID, @RequestParam("page") int page,
                                             @RequestParam("size") int size) {
        System.out.println("Received name: " + name);
        return productService.getProductBySearch(name,categoryID,page,size,"price",false);
    }




}
