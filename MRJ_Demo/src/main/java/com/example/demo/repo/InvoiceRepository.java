package com.example.demo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Invoice;

@Repository
public class InvoiceRepository {
	@Autowired
	MongoTemplate mongoTemplate;

	public Invoice insert(Invoice invoice) {
		return mongoTemplate.insert(invoice);
	}

	public Invoice deleteById(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return mongoTemplate.findAndRemove(query, Invoice.class);
		
	}

	public List<Invoice> findAll() {
		return mongoTemplate.findAll(Invoice.class);
	}

	public Invoice findById(String id) {
		return mongoTemplate.findById(id, Invoice.class);
	}
	
	
}
