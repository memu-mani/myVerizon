import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;


public class Stores {

	int StoreNumber;

	String StoreName;
	String Address;
	String City;
	String State;
	int ZipCode;
 String PhoneNumber;
 String StoreHours;
	double Latitude;
	double Longitude;
	String Country;
	public int getStoreNumber() {
		return StoreNumber;
	}
	public void setStoreNumber(int storeNumber) {
		StoreNumber = storeNumber;
	}
	public String getStoreName() {
		return StoreName;
	}
	public void setStoreName(String storeName) {
		StoreName = storeName;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getCity() {
		return City;
	}
	public void setCity(String city) {
		City = city;
	}
	public String getState() {
		return State;
	}
	public void setState(String state) {
		State = state;
	}
	public int getZipCode() {
		return ZipCode;
	}
	public void setZipCode(int zipCode) {
		ZipCode = zipCode;
	}
	public String getPhoneNumber() {
		return PhoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		PhoneNumber = phoneNumber;
	}
	public String getStoreHours() {
		return StoreHours;
	}
	public void setStoreHours(String storeHours) {
		StoreHours = storeHours;
	}
	public double getLatitude() {
		return Latitude;
	}
	public void setLatitude(double latitude) {
		Latitude = latitude;
	}
	public double getLongitude() {
		return Longitude;
	}
	public void setLongitude(double longitude) {
		Longitude = longitude;
	}
	public String getCountry() {
		return Country;
	}
	public void setCountry(String country) {
		Country = country;
	}
	public Stores(int storeNumber, String storeName, String address,
			String city, String state, int zipCode, String phoneNumber,
			String storeHours, double latitude, double longitude, String country) {
		super();
		StoreNumber = storeNumber;
		StoreName = storeName;
		Address = address;
		City = city;
		State = state;
		ZipCode = zipCode;
		PhoneNumber = phoneNumber;
		StoreHours = storeHours;
		Latitude = latitude;
		Longitude = longitude;
		Country = country;
	}
	public Stores() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Stores [StoreNumber=" + StoreNumber + ", StoreName=" + StoreName + ", Address=" + Address + ", City="
				+ City + ", State=" + State + ", ZipCode=" + ZipCode + ", PhoneNumber=" + PhoneNumber + ", StoreHours="
				+ StoreHours + ", Latitude=" + Latitude + ", Longitude=" + Longitude + ", Country=" + Country + "]";
	}
	
	
	
	
	
	
}
