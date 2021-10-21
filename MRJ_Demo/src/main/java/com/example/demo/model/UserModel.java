package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection="userModel")
public class UserModel {

	@Id
	private String id;
	@Field
	private String username;
	@Field
	private String firstName;
	@Field
	private String lastName;
	@Field
	private String password;
	@Field
	private String role;
	@Field
	private float savingsWallet;
	
	public UserModel(String id, String username, String firstName, String lastName, String password,
			float savingsWallet,String role) {
		super();
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.savingsWallet = savingsWallet;
		this.role = role;
	}
	
	public UserModel()
	{
		this.id = new String();
		this.username = new String();
		this.firstName = new String();
		this.lastName = new String();
		this.password = new String();
		this.savingsWallet = 0;
		this.role = new String();
	}

	public String getrole() {
		return role;
	}

	public void setrole(String role) {
		this.role = role;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public float getSavingsWallet() {
		return savingsWallet;
	}

	public void setSavingsWallet(float savingsWallet) {
		this.savingsWallet = savingsWallet;
	}
	
}
