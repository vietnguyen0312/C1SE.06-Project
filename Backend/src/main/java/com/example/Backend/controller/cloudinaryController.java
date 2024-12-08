package com.example.Backend.controller;

import com.example.Backend.dto.response.ApiResponse;
import com.example.Backend.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.function.BiFunction;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class cloudinaryController {

    CloudinaryService cloudinaryService;

    @PostMapping("/imgBlog")
    ApiResponse<String> uploadFileBlog(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image blog failure", cloudinaryService::uploadFileBlog);
    }

    @PostMapping("/imgService")
    ApiResponse<String> uploadFileService(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image service failure", cloudinaryService::uploadFileService);
    }

    @PostMapping("/imgInfo")
    ApiResponse<String> uploadFileInfo(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image info failure", cloudinaryService::uploadFileInfo);
    }

    @PostMapping("/imgHotel")
    ApiResponse<String> uploadFileHotel(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image hotel failure", cloudinaryService::uploadFileHotel);
    }

    private ApiResponse<String> processUpload(
            MultipartFile file,
            String filename,
            String errorMessage,
            BiFunction<MultipartFile, String, String> uploadMethod) {
        try {
            String url = uploadMethod.apply(file, filename);
            return ApiResponse.<String>builder()
                    .result(url)
                    .message("File uploaded successfully")
                    .build();
        } catch (RuntimeException e) {
            log.error(errorMessage, e);
            return ApiResponse.<String>builder()
                    .result(null)
                    .message("Upload failed: " + e.getMessage())
                    .build();
        }
    }
}
