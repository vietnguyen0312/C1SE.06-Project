package com.example.Backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.Console;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    private String uploadFile(MultipartFile file, String filename, String img) {
        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap(
                            "public_id", filename,
                            "folder", img));
            log.info(uploadResult.toString());
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            log.error("Failed to upload file to Cloudinary in folder: {}", img, e);
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    public String deleteFile(String filename, String img) {
        try {
            cloudinary.uploader().destroy(filename, ObjectUtils.asMap("folder", img));
            log.info("File deleted successfully: {}", filename);
            return filename;
        } catch (IOException e) {
            log.error("Failed to delete file from Cloudinary in folder: {}", img, e);
            throw new RuntimeException("Failed to delete file", e);
        }
    }

    public int deleteImagesWithDisplayName(String substring, String img) {
        int deleteCount = 0;
        String nextCursor = null;

        try {
            do {
                Map<String, Object> options = ObjectUtils.asMap(
                        "type", "upload",
                        "prefix", img,
                        "max_results", 1000
                );
                if (nextCursor != null) {
                    options.put("next_cursor", nextCursor);
                }

                Map<String, Object> resources = cloudinary.api().resources(options);
                List<Map<String, Object>> resourceList = (List<Map<String, Object>>) resources.get("resources");

                if (resourceList == null || resourceList.isEmpty()) {
                    log.info("No images found with prefix '{}'", img);
                    break;
                }

                for (Map<String, Object> resource : resourceList) {
                    String displayName = (String) resource.get("display_name");
                    log.info("Checking image with display_name: {}", displayName);

                    if (displayName != null && displayName.contains(substring)) {
                        try {
                            String publicId = (String) resource.get("public_id");
                            Map<String, Object> deleteResult = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                            log.info("Delete result for {}: {}", publicId, deleteResult);

                            if ("ok".equals(deleteResult.get("result"))) {
                                deleteCount++;
                            } else {
                                log.error("Failed to delete image with public_id: {}", publicId);
                            }
                        } catch (Exception deleteException) {
                            log.error("Error while deleting image with public_id {}: {}", displayName, deleteException.getMessage());
                        }
                    }
                }

                nextCursor = (String) resources.get("next_cursor");
            } while (nextCursor != null);

        } catch (Exception e) {
            log.error("Error fetching or deleting images with displayName '{}': {}", substring, e.getMessage(), e);
        }

        return deleteCount;
    }


    public String uploadFileBlog(MultipartFile file, String filename) {
        return uploadFile(file, filename, "Blog");
    }

    public String uploadFileService(MultipartFile file, String filename) {
        return uploadFile(file, filename, "Service");
    }

    public String uploadFileInfo(MultipartFile file, String filename) {
        return uploadFile(file, filename, "Info");
    }

    public String uploadFileHotel(MultipartFile file, String filename) {
        return uploadFile(file, filename, "Hotel");
    }

}