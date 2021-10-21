package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserModel;
import com.example.demo.repo.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
//http://localhost:6039/api/auth/register
public class AuthController {
	@Autowired
	private UserRepository userRepo; 
	
	@GetMapping("/{id}")
	public ResponseEntity<UserModel> loadUserHandler(@PathVariable String id)
	{
		ResponseEntity<UserModel> res;
		try 
		{
			UserModel user = userRepo.findById(id);
			if(user != null)
				res = new ResponseEntity<UserModel>(user,HttpStatus.OK);
			else
				res = new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<UserModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping("/staff")
	public ResponseEntity<List<UserModel>> getAllStaff()
	{
		List<UserModel> staffs = new ArrayList<UserModel>();
		ResponseEntity<List<UserModel>> res;
		try 
		{
			Query query = new Query();
			query.addCriteria(Criteria.where("role").is("staff"));
			staffs = userRepo.findAll(query);
			res = new ResponseEntity<List<UserModel>>(staffs,HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<List<UserModel>>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserModel> registerUserHandler(@RequestBody UserModel user)
	{
		ResponseEntity<UserModel> res;
		try 
		{
			Query query = new Query();
			query.addCriteria(Criteria.where("username").is(user.getUsername()));
			UserModel existedUser = userRepo.findOne(query);
			if(existedUser == null)
			{	
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
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<UserModel> deleteStaffHandler(@PathVariable String id)
	{
		ResponseEntity<UserModel> res;
		try 
		{
			UserModel user = userRepo.deleteById(id);
			if(user != null)
				res = new ResponseEntity<UserModel>(user,HttpStatus.OK);
			else
				res = new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<UserModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<UserModel> editStaffInformation(@RequestBody UserModel staff,@PathVariable String id)
	{
		ResponseEntity<UserModel> res = null;
		try 
		{
			UserModel user = userRepo.findById(id);
			if(user != null)
			{
				if(user.getUsername().equals(staff.getUsername()))
				{
					user.setFirstName(staff.getFirstName());
					user.setLastName(staff.getLastName());
					user.setPassword(staff.getPassword());
					res = new ResponseEntity<UserModel>(user,HttpStatus.OK);
				}
				else
				{
					Query query = new Query();
					query.addCriteria(Criteria.where("username").is(staff.getUsername()));
					UserModel existedUsername = userRepo.findOne(query);
					if(existedUsername == null)
					{
						user.setFirstName(staff.getFirstName());
						user.setLastName(staff.getLastName());
						user.setPassword(staff.getPassword());
						user.setUsername(staff.getUsername());
						userRepo.save(user);
					}
					else
						res = new ResponseEntity<UserModel>(HttpStatus.NOT_ACCEPTABLE);
				}
			}
			else
				res = new ResponseEntity<UserModel>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<UserModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<UserModel> loginUserHandler(@RequestBody UserModel user)
	{
		ResponseEntity<UserModel> res;
		try
		{
			Query query = new Query();
			new Criteria();
			Criteria cre = Criteria.where("password").is(user.getPassword());
			query.addCriteria(Criteria.where("username").is(user.getUsername()).andOperator(cre));
			UserModel existedUser = userRepo.findOne(query);
			if(existedUser != null)
				res = new ResponseEntity<UserModel>(existedUser,HttpStatus.OK);
			else
				res = new ResponseEntity<UserModel>(HttpStatus.NOT_ACCEPTABLE);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<UserModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
}
