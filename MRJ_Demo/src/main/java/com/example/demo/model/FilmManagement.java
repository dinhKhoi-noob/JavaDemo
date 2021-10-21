package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "filmManagement")
public class FilmManagement extends FilmModel {
	
	private int totalSoldOut;
	private float amount;
	
	public FilmManagement(String id, String name, float price, String poster, String description, String releaseDate,
			String range, String director, int time, String language, String genre, int totalSoldOut, float amount) {
		super(id, name, price, poster, description, releaseDate, range, director, time, language, genre);
		this.totalSoldOut = totalSoldOut;
		this.amount = amount;
	}

	public FilmManagement(FilmModel film, int totalSoldOut, float f) {
		super(film);
		this.amount = f;
		this.totalSoldOut = totalSoldOut;
	}
	
	public FilmManagement()
	{
		super();
		amount = 0;
		totalSoldOut = 0;
	}
	
	public int getTotalSoldOut() {
		return totalSoldOut;
	}

	public void setTotalSoldOut(int totalSoldOut) {
		this.totalSoldOut = totalSoldOut;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}
}
