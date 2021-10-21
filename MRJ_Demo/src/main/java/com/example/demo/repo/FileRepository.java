package com.example.demo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.FileResponse;

public interface FileRepository extends MongoRepository<FileResponse, String>{
	
}
