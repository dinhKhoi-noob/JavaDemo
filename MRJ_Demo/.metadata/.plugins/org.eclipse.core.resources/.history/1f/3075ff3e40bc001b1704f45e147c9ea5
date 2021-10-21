package com.example.demo.controllers;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.model.FileResponse;
import com.example.demo.repo.FileRepository;
import com.example.demo.services.FileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("files")
public class FileController {
	
	@Autowired
	private FileService fileStorageService;
	
	@Autowired
	private FileRepository fileRepo;
	
	@PutMapping
	public ResponseEntity<FileResponse> uploadFile(@RequestParam("file") MultipartFile file) throws IOException
	{
		String fileName = fileStorageService.storageFile(file);
		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/files/").path(fileName).toUriString();
		FileResponse fileResponse = new FileResponse(String.valueOf(new Date().getTime()),fileName,fileDownloadUri,file.getContentType(),file.getBytes().toString());
		fileRepo.insert(fileResponse);
		return new ResponseEntity<FileResponse>(fileResponse,HttpStatus.OK);
	}
	
	@GetMapping("/{fileName:.+}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName,HttpServletRequest request)
	{
		Resource resource = fileStorageService.loadFileAsResource(fileName);
		String contentType = null;
		try 
		{
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
		} 
		catch (Exception e) 
		{
			System.out.println("Could not determine file type");
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
	}
}
