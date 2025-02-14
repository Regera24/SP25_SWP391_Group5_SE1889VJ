package org.group5.swp391.Controller;
import org.group5.swp391.DTO.ProductDTOTool.ProductDTO;
import org.group5.swp391.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/store")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@Param("query") String query,
                                                          @RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "5") int size) {
        if(query == null) return ResponseEntity.ok(productService.getAllProducts(page, size));
        else {
            return ResponseEntity.ok(productService.searchProducts(query, page, size));
        }
    }

}
