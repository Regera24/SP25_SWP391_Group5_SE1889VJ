package org.group5.swp391.controller;

import lombok.RequiredArgsConstructor;
import org.group5.swp391.dto.response.ApiResponse;
import org.group5.swp391.repository.CategoryRepository;
import org.group5.swp391.utils.CloudinaryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class PublicAPI {
    private final CloudinaryService cloudinaryService;
    private final CategoryRepository categoryRepository;

    @GetMapping(value = "/category")
    public void getCategory() {
        categoryRepository.findAll()
                .forEach((item) -> System.out.println(item.getName()));
    }

    @PostMapping(value = "/image")
    public ApiResponse<String> uploadFile(
            @RequestPart("file") MultipartFile file) throws IOException {
        String url = cloudinaryService.uploadFile(file);
        return ApiResponse.<String>builder()
                .code(200)
                .data(url)
                .message("Uploaded image to Cloudinary")
                .build();
    }
}
