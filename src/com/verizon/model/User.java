package com.verizon.model;

public class User 
{
    String city;
     double lati;
     double longi;
	public User(String city, double lati, double longi) {
		super();
		this.city = city;
		this.lati = lati;
		this.longi = longi;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public double getLati() {
		return lati;
	}
	public void setLati(double lati) {
		this.lati = lati;
	}
	public double getLongi() {
		return longi;
	}
	public void setLongi(double longi) {
		this.longi = longi;
	}
     
     
	
	
	
}
