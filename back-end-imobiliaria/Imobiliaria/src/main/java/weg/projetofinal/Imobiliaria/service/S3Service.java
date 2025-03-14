package weg.projetofinal.Imobiliaria.service;

import io.awspring.cloud.s3.S3Template;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;
    private final S3Template s3Template;

    @Value("${aws.s3.bucket.name")
    private String bucketName;

    public S3Service(S3Client s3Client, S3Template s3Template) {
        this.s3Client = s3Client;
        this.s3Template = s3Template;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + file.getOriginalFilename();
        Path tempFile = Files.createTempFile("s3-upload", file.getOriginalFilename());

        Files.write(tempFile, file.getBytes());

        s3Client.putObject(
                PutObjectRequest.builder().
                bucket(bucketName).
                key(fileName).build(),
                tempFile);

        Files.delete(tempFile);

        return fileName;
    }

    public Resource downloadFile(String fileName) {
        return s3Template.download(bucketName, fileName);
    }
}
