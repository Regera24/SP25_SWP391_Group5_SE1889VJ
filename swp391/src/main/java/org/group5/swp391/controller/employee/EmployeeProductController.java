package org.group5.swp391.controller.employee;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.group5.swp391.dto.employee.EmployeeProductDTO;
import org.group5.swp391.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
public class EmployeeProductController {
    private final ProductService productService;

    @GetMapping("/products")
    public Page<EmployeeProductDTO> getAllProductByName(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam(value = "sortBy", defaultValue = "price") String sortBy,
            @RequestParam(value = "descending", defaultValue = "false") boolean descending
    ) {
        return productService.getProductBySearch(name, page, size, sortBy, descending);
    }
}
