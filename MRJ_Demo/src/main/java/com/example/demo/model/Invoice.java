package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "invoice")
public class Invoice {
	@Id
	private String id;
	private String name;
	private String address;
	private String bankId;
	private String phone;
	private String date;
	private List<CartItem> items;
	private float totalAmount;
	private String userId;
	
	
	public Invoice(String id, String name, String address, String bankId, String phone, String date,
			List<CartItem> items, float totalAmount,String userId) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
		this.bankId = bankId;
		this.phone = phone;
		this.date = date;
		this.items = items;
		this.totalAmount = totalAmount;
		this.userId = userId;
	}

	public Invoice()
	{
		id = new String();
		date = new String();
		items = new ArrayList<CartItem>();
		totalAmount = 0;
		phone = new String();
		name = new String();
		bankId = new String();
		address = new String();
		userId = new String();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public List<CartItem> getItems() {
		return items;
	}

	public void setItems(List<CartItem> items) {
		this.items = items;
	}

	public float getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(float totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBankId() {
		return bankId;
	}

	public void setBankId(String bankId) {
		this.bankId = bankId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
}
