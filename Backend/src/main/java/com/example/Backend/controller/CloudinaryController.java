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
public class CloudinaryController {

    CloudinaryService cloudinaryService;

    @PostMapping("/imgBlog")
    ApiResponse<String> uploadFileBlog(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image blog failure", cloudinaryService::uploadFileBlog);
    }

    @DeleteMapping("/imgBlog/{filename}")
    ApiResponse<String> deleteFileBlog(@PathVariable String filename) {
        return processDelete(filename,"Blog", "Delete image blog failure", cloudinaryService::deleteFile);
    }

    @PutMapping("/imgBlog")
    ApiResponse<String> updateFileBlog(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        cloudinaryService.deleteFile(filename, "Blog");
        return processUpload(file, filename, "Update image blog failure", cloudinaryService::uploadFileBlog);
    }

    @PostMapping("/imgService")
    ApiResponse<String> uploadFileService(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image service failure", cloudinaryService::uploadFileService);
    }

    @DeleteMapping("/imgService/{filename}")
    ApiResponse<String> deleteFileService(@PathVariable String filename) {
        return processDelete(filename, "Service","Delete image service failure", cloudinaryService::deleteFile);
    }

    @PutMapping("/imgService")
    ApiResponse<String> updateFileService(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        cloudinaryService.deleteFile(filename, "Service");
        return processUpload(file, filename, "Update image service failure", cloudinaryService::uploadFileService);
    }

    @PostMapping("/imgHotel")
    ApiResponse<String> uploadFileHotel(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        return processUpload(file, filename, "Upload image hotel failure", cloudinaryService::uploadFileHotel);
    }

    @DeleteMapping("/imgHotel/{filename}")
    ApiResponse<String> deleteFileHotel(@PathVariable String filename) {
        return processDelete(filename, "Hotel","Delete image hotel failure", cloudinaryService::deleteFile);
    }

    @PutMapping("/imgHotel")
    ApiResponse<String> updateFileHotel(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filename") String filename) {
        cloudinaryService.deleteFile(filename, "Hotel");
        return processUpload(file, filename, "Update image hotel failure", cloudinaryService::uploadFileHotel);
    }

    @DeleteMapping("/deleteImagesWithSubstring")
    ApiResponse<String> deleteImagesWithSubstring(
            @RequestParam("prefix") String prefix,
            @RequestParam("folder") String folder) {
        if (prefix.length() < 4) {
            return ApiResponse.<String>builder()
                    .result("Prefix must be at least 4 characters long.")
                    .build();
        }
        try {
            int deletedCount = cloudinaryService.deleteImagesWithDisplayName(prefix, folder);
            return ApiResponse.<String>builder()
                    .result(deletedCount + " images with prefix '" + prefix + "' have been deleted successfully.")
                    .build();
        } catch (Exception e) {
            log.error("Failed to delete images with prefix '{}': {}", prefix, e.getMessage());
            return ApiResponse.<String>builder()
                    .result("Failed to delete images: " + e.getMessage())
                    .build();
        }
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

    private ApiResponse<String> processDelete(String filename, String img, String errorMessage, BiFunction<String, String, String> deleteMethod) {
        try {
            deleteMethod.apply(filename, img);
            return ApiResponse.<String>builder()
                    .result(null)
                    .message("File deleted successfully")
                    .build();
        } catch (RuntimeException e) {
            log.error(errorMessage, e);
            return ApiResponse.<String>builder()
                    .result(null)
                    .message("Delete failed: " + e.getMessage())
                    .build();
        }
    }
}