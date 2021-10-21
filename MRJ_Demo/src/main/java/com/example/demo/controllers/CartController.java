package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.CartItem;
import com.example.demo.model.FilmManagement;
import com.example.demo.model.Invoice;
import com.example.demo.model.UserModel;
import com.example.demo.repo.FilmManagementRepository;
import com.example.demo.repo.InvoiceRepository;
import com.example.demo.repo.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartController {
	
	@Autowired
	private InvoiceRepository cartRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private FilmManagementRepository filmManageRepo;
	
	@PostMapping("/create")
	public ResponseEntity<Invoice> createNewBill(@RequestBody Invoice invoice)
	{
		ResponseEntity<Invoice> res;
		try 
		{
			cartRepo.insert(invoice);
			List<CartItem> items = invoice.getItems();
			if(items.size() > 0)
			{
				for(int i = 0;i < items.size();i++)
				{
					CartItem item = items.get(i);
					FilmManagement existedFilm = filmManageRepo.findById(item.getId());
					if(existedFilm != null)
					{
						float totalAmount = existedFilm.getAmount()+(item.getPrice()*item.getQuantity());
						existedFilm.setAmount(totalAmount);
						existedFilm.setTotalSoldOut(existedFilm.getTotalSoldOut()+item.getQuantity());
						filmManageRepo.save(existedFilm);
					}
				}
				UserModel existedUser = userRepo.findById(invoice.getUserId());
				if(existedUser != null)
				{
					existedUser.setSavingsWallet(existedUser.getSavingsWallet()+invoice.getTotalAmount()/20);
					userRepo.save(existedUser);
				}
			}
			res = new ResponseEntity<Invoice>(invoice,HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<Invoice>(invoice,HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteBill(@RequestParam String id)
	{
		ResponseEntity<String> res;
		try 
		{
			cartRepo.deleteById(id);
			res = new ResponseEntity<String>("Deleted",HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<String>("Deleted was failed",HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Invoice>> getAllBill()
	{
		ResponseEntity<List<Invoice>> res;
		try 
		{
			List<Invoice> data = cartRepo.findAll();
			res = new ResponseEntity<List<Invoice>>(data,HttpStatus.OK);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<List<Invoice>>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Invoice> getSingleBill(@RequestParam String id)
	{
		ResponseEntity<Invoice> res;
		try 
		{
			Invoice inv = cartRepo.findById(id);
			if(inv != null)
				res = new ResponseEntity<Invoice>(inv,HttpStatus.OK);
			else
				res = new ResponseEntity<Invoice>(HttpStatus.NOT_FOUND);
		} 
		catch (Exception e) 
		{
			res = new ResponseEntity<Invoice>(HttpStatus.BAD_REQUEST);
		}
		return res;
	}
}
