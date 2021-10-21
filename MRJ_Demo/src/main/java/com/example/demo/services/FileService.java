package com.example.demo.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.exception.FileNotFoundException;
import com.example.demo.exception.FileStorageException;
import com.example.demo.properties.FileUploadProperty;

@Service
public class FileService {
	private final Path fileStorageLocation;
	
	@Autowired
	public FileService(FileUploadProperty fileStorageProperty) {
		this.fileStorageLocation = Paths.get(fileStorageProperty.getUploadDir()).toAbsolutePath().normalize();
		try 
		{
			Files.createDirectories(this.fileStorageLocation);
		} 
		catch (Exception e) 
		{
			throw new FileStorageException("Could not create the directory to upload");
		}
	}
	
	public String storageFile(MultipartFile file)
	{
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			Path targetLocation = fileStorageLocation.resolve(fileName);
			Files.copy(file.getInputStream(), targetLocation,StandardCopyOption.REPLACE_EXISTING);
			return fileName;
		} 
		catch (Exception e) 
		{
			throw new FileStorageException("Could not store file "+fileName+", Please try again");
		}
	}
	
	public Resource loadFileAsResource(String fileName)
	{
		try 
		{
			Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
			Resource resource = new UrlResource(filePath.toUri());
			if(resource.exists())
			{
				return resource;
			}
			else
				throw new FileNotFoundException("File not found: "+fileName);
		} 
		catch (Exception e) 
		{
			throw new FileNotFoundException("File not found:"+fileName);
		}
	}
}
