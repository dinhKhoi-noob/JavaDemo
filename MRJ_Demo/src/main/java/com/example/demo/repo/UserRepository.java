package com.example.demo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserModel;

@Repository
public class UserRepository {

	@Autowired
	MongoTemplate mongoTemplate;

	public UserModel findOne(Query query) {
		return mongoTemplate.findOne(query, UserModel.class);
	}

	public UserModel insert(UserModel user) {
		return mongoTemplate.insert(user);
	}

	public UserModel findById(String id) {
		return mongoTemplate.findById(id, UserModel.class);
	}

	public List<UserModel> findAll(Query query) {
		return mongoTemplate.find(query, UserModel.class);
	}

	public UserModel deleteById(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return mongoTemplate.findAndRemove(query, UserModel.class);
	}

	public UserModel save(UserModel user) {
		return mongoTemplate.save(user, "userModel");
	}	
}
