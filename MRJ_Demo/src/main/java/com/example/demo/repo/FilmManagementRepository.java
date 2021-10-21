package com.example.demo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.FilmManagement;

@Repository
public class FilmManagementRepository{
	@Autowired
	MongoTemplate mongoTemplate;

	public FilmManagement save(FilmManagement _editingContentForManage) {
		return mongoTemplate.save(_editingContentForManage);
		
	}

	public List<FilmManagement> findAll() {
		// TODO Auto-generated method stub
		return mongoTemplate.findAll(FilmManagement.class);
	}

	public FilmManagement insert(FilmManagement filmManagement) {
		return mongoTemplate.insert(filmManagement);
		
	}

	public FilmManagement findById(String id) {
		// TODO Auto-generated method stub
		return mongoTemplate.findById(id, FilmManagement.class);
	}
}
