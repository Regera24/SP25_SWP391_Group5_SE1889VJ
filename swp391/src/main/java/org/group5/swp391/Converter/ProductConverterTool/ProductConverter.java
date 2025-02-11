package org.group5.swp391.Converter.ProductConverterTool;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.DTO.ProductDTOTool.*;
import org.group5.swp391.Entity.Category;
import org.group5.swp391.Entity.Product;
import org.group5.swp391.Repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductConverter {
    private final ModelMapper modelMapper;
    private final ProductAttributeConverter productAttributeConverter;
    private final ZoneConverter zoneConverter;
    private final CategoryRepository categoryRepository;
    private final CategoryConverter categoryConverter;

    public ProductDTO toProductDTO(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        List<ProductAttributeDTO> pads = product.getProductAttributes().stream().map(productAttributeConverter::toProductAttributeDTO).collect(Collectors.toList());
        productDTO.setProductAttributes(pads);

        List<ZoneDTO> zds = product.getZones().stream().map(zoneConverter::toZoneDTO).collect(Collectors.toList());
        productDTO.setZones(zds);

        CategoryDTO cd = categoryConverter.toCategoryDTO(product.getCategory());
        productDTO.setCategoryDTO(cd);
        return productDTO;
    }


}
