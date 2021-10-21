package com.example.demo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.FilmModel;
import com.mongodb.client.result.DeleteResult;

@Repository
public class FilmRepository {
	@Autowired
	MongoTemplate mongoTemplate;

	public boolean existsById(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return mongoTemplate.exists(query,FilmModel.class);
	}

	public FilmModel findById(String id) {
		return mongoTemplate.findById(id, FilmModel.class);
	}

	public FilmModel findOne(Query query) {
		return mongoTemplate.findOne(query, FilmModel.class);
	}

	public FilmModel insert(FilmModel film) {
		return mongoTemplate.insert(film);
	}

	public List<FilmModel> findAll() {
		return mongoTemplate.findAll(FilmModel.class);
	}

	public FilmModel save(FilmModel _editingContent) {
		return mongoTemplate.save(_editingContent, "filmModel");	
	}

	public DeleteResult deleteById(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return mongoTemplate.remove(query, FilmModel.class);
	}
}
