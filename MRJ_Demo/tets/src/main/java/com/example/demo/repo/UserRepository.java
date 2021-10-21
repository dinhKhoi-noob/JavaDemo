package com.example.demo.repo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
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
}
