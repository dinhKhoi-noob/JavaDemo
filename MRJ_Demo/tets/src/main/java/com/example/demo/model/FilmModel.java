package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class FilmModel {
	@Id
	private String id;
	private String name;
	private float price;
	private String poster;
	private String description;
	private String releaseDate;
	public String getRange() {
		return range;
	}

	public void setRange(String range) {
		this.range = range;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public FilmModel(String id, String name, float price, String poster, String description, String releaseDate,
			String range, String director, int time, String language, String genre) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.poster = poster;
		this.description = description;
		this.releaseDate = releaseDate;
		this.range = range;
		this.director = director;
		this.time = time;
		this.language = language;
		this.genre = genre;
	}
	private String range;
	private String director;
	private int time;
	private String language;
	private String genre;
	
	
	public FilmModel()
	{
		this.id = new String();
		this.name = new String();
		this.price = 0.00F;
		this.poster = new String();
		this.description = new String();
		this.releaseDate = new String();
		this.genre = new String();
		this.language = new String();
		this.range = new String();
		this.time = 0;
		this.director = new String();
	}
	
	public String getId() {
		return id;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getPoster() {
		return poster;
	}
	public void setPoster(String poster) {
		this.poster = poster;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
