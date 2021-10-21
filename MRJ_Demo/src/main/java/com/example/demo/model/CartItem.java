package com.example.demo.model;

public class CartItem {
	private String id;
	private int quantity;
	private float price;
	private String name;
	public CartItem(int quantity, float price, String name,String id) {
		super();
		this.quantity = quantity;
		this.price = price;
		this.name = name;
		this.id = id;
	}
	
	public CartItem()
	{
		quantity = 0;
		price = 0;
		name = new String();
		id = new String();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
