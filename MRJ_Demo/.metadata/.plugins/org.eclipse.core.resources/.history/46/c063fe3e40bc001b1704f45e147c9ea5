package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserModel;
import com.example.demo.repo.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserRepository userRepo; 
	
	@PostMapping("/register")
	public ResponseEntity<UserModel> registerUserHandler(@RequestBody UserModel user)
	{
		ResponseEntity<UserModel> res;
		try 
		{
			Query query = new Query();
			query.addCriteria(Criteria.where("username").is(user.getUsername()));
			UserModel existedUser = userRepo.findOne(query);
			if(existedUser != null)
			{
				user.setPassword(null);
				
				userRepo.insert(user);
				res = new ResponseEntity<UserModel>(user,HttpStatus.OK);
			}
			else
				res = new ResponseEntity<UserModel>(HttpStatus.NOT_ACCEPTABLE);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<UserModel>(HttpStatus.BAD_REQUEST);
			System.out.println(e);
		}
		return res;
	}
}
