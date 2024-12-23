package com.example.Backend.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
                            "folder", img
                    ));
            log.info(uploadResult.toString());
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            log.error("Failed to upload file to Cloudinary in folder: {}", img, e);
            throw new RuntimeException("Failed to upload file", e);
        }
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