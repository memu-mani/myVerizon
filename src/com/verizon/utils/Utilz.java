package com.verizon.utils;
import java.io.File;  
import java.util.Arrays;
import java.util.List;  
  


import java.util.Map;



import java.util.stream.Collectors;

import javax.xml.bind.JAXBContext;  
import javax.xml.bind.JAXBException;  
import javax.xml.bind.Unmarshaller; 

import com.verizon.model.StoreInfo;
import com.verizon.model.Stores;

public class Utilz
{
	public void Marshaller(){
		
	     try {  
	   
	        File file = new File("StoreInfo.xml");  
	        JAXBContext jaxbContext = JAXBContext.newInstance(Stores.class);  
	   
	        Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();  
	        StoreInfo storeInfo= (StoreInfo) jaxbUnmarshaller.unmarshal(file); 
	       List<Stores> stores = Arrays.asList(storeInfo.getStore()).stream().filter(s->s.getCity()=="texas").collect(Collectors.toList());
	        System.out.println(stores);
	          
	    }  
	     catch(Exception e)
	     {
	    	 e.printStackTrace();
	     }
}
}

