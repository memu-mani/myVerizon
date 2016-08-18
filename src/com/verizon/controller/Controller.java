package com.verizon.controller;

import com.verizon.model.*;
import com.verizon.service.Service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

	Service ser;

	@Autowired
	public Controller(Service ser) {
	 this.ser=ser;
		
	 @RequestMapping(value="stores.json",produces="application/json",method=RequestMethod.GET)
	 		public List<Stores> getStoreByCity(@PathVariable("city") String city)
	 		{
		      return ser.getStoreByCity(city);
	 		}
	 
	
	}
	
	
	
	
	
}
