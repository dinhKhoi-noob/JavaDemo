package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Date;
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

import com.example.demo.model.FilmManagement;
import com.example.demo.model.FilmModel;
import com.example.demo.repo.FilmManagementRepository;
import com.example.demo.repo.FilmRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/film")
public class FilmController {
	
	@Autowired
	private FilmRepository filmRepo;
	
	@Autowired
	private FilmManagementRepository filmManagementRepo;
	
	@GetMapping("/all")
	public ResponseEntity<List<FilmModel>> findingAllFilmHandler()
	{
		List<FilmModel> films = new ArrayList<FilmModel>();
		ResponseEntity<List<FilmModel>> res;
		try 
		{
			films = filmRepo.findAll();
			res = new ResponseEntity<List<FilmModel>>(films,HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			System.out.println(e);
			res = new ResponseEntity<List<FilmModel>>(films,HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping("/manage")
	public ResponseEntity<List<FilmManagement>> getAllFilmForManage()
	{
		List<FilmManagement> films = new ArrayList<FilmManagement>();
		ResponseEntity<List<FilmManagement>> res;
		try 
		{
			films = filmManagementRepo.findAll();
			res = new ResponseEntity<List<FilmManagement>>(films,HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<List<FilmManagement>>(HttpStatus.NOT_FOUND);
			System.out.println(e);
		}
		return res;
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<FilmModel> gettingSingleFilmHandler(@PathVariable String id)
	{
		ResponseEntity<FilmModel> res;
		try 
		{
			if(filmRepo.existsById(id))
			{
				FilmModel film = (FilmModel) filmRepo.findById(id);
				res = new ResponseEntity<FilmModel>(film,HttpStatus.OK);
			}
			else
				res = new ResponseEntity<FilmModel>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<FilmModel>(HttpStatus.BAD_REQUEST);
			
		}
		return res;
	}
	
	@PostMapping("/create")
	public ResponseEntity<FilmModel> filmUploadingHandler(@RequestBody FilmModel film)
	{
		ResponseEntity<FilmModel> res;
		try 
		{
			Query query = new Query();
			query.addCriteria(Criteria.where("name").is(film.getName()));
			FilmModel existedFilm = filmRepo.findOne(query);
			if(existedFilm != null)
				res = new ResponseEntity<FilmModel>(HttpStatus.NOT_ACCEPTABLE);
			else
			{
				res = new ResponseEntity<FilmModel>(film,HttpStatus.OK);
				film.setId("film"+String.valueOf(new Date().getTime()));
				FilmManagement filmManagement = new FilmManagement(film,0,0);
				filmRepo.insert(film);
				filmManagementRepo.insert(filmManagement);
			}
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<FilmModel>(HttpStatus.BAD_REQUEST);
			System.out.println(e);
		}
		return res;
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<FilmModel> modifyingFilmHandler(@RequestBody FilmModel film, @PathVariable String id)
	{
		FilmModel filmWillBeEdit;
		ResponseEntity<FilmModel> res;
		try 
		{
			filmWillBeEdit = filmRepo.findById(id);
			if(filmWillBeEdit != null)
			{
				FilmModel _editingContent = filmWillBeEdit;
				if(filmWillBeEdit.getName().equals(film.getName()))
				{
					_editingContent.setPrice(film.getPrice());
					_editingContent.setDescription(film.getDescription());
					_editingContent.setReleaseDate(film.getReleaseDate());
					_editingContent.setPoster(film.getPoster());
					_editingContent.setDirector(film.getDirector());
					_editingContent.setGenre(film.getGenre());
					_editingContent.setLanguage(film.getLanguage());
					_editingContent.setRange(film.getRange());
					_editingContent.setTime(film.getTime());
					filmRepo.save(_editingContent);
					FilmManagement beEdit = filmManagementRepo.findById(_editingContent.getId());
					FilmManagement _editingContentForManage = new FilmManagement(_editingContent,beEdit.getTotalSoldOut(),beEdit.getAmount());
					filmManagementRepo.save(_editingContentForManage);
					res = new ResponseEntity<FilmModel>(_editingContent,HttpStatus.OK);
				}
				else
				{
					Query query = new Query();
					query.addCriteria(Criteria.where("name").is(film.getName()));
					FilmModel existedFilmName = filmRepo.findOne(query);
					if(existedFilmName == null)
					{
						_editingContent.setName(film.getName());
						_editingContent.setPrice(film.getPrice());
						_editingContent.setDescription(film.getDescription());
						_editingContent.setReleaseDate(film.getReleaseDate());
						_editingContent.setPoster(film.getPoster());
						_editingContent.setDirector(film.getDirector());
						_editingContent.setGenre(film.getGenre());
						_editingContent.setLanguage(film.getLanguage());
						_editingContent.setRange(film.getRange());
						_editingContent.setTime(film.getTime());
						filmRepo.save(_editingContent);
						FilmManagement beEdit = filmManagementRepo.findById(_editingContent.getId());
						FilmManagement _editingContentForManage = new FilmManagement(_editingContent,beEdit.getTotalSoldOut(),beEdit.getAmount());
						filmManagementRepo.save(_editingContentForManage);
						res = new ResponseEntity<FilmModel>(_editingContent,HttpStatus.OK);
					}
					else
						res = new ResponseEntity<FilmModel>(HttpStatus.NOT_ACCEPTABLE);
				}
			}
			else
			{
				res = new ResponseEntity<FilmModel>(HttpStatus.NOT_FOUND);
			}
		} 
		catch (Exception e) 
		{
			System.out.println(e);
			res = new ResponseEntity<FilmModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<FilmModel> deletingFilmHandler(@PathVariable String id)
	{
		ResponseEntity<FilmModel> res;
		try 
		{
			FilmModel filmWillBeDelete = filmRepo.findById(id);
			if(filmWillBeDelete != null)
			{
				filmRepo.deleteById(id);
				res = new ResponseEntity<FilmModel>(filmWillBeDelete,HttpStatus.OK);
			}
			else
				res = new ResponseEntity<FilmModel>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<FilmModel>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
}
