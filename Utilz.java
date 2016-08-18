
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class Utilz {
	public static List<Stores> getStoresListByCity(String city)
	{
		List<Stores> stores=new ArrayList<>();
		try {
			File inputFile = new File("StoreInfo.xml");
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder;

			dBuilder = dbFactory.newDocumentBuilder();

			Document doc = dBuilder.parse(inputFile);
			doc.getDocumentElement().normalize();

			XPath xPath = XPathFactory.newInstance().newXPath();

			String expression = "/store-info/store[City='Dumas']";
			NodeList nodeList = (NodeList) xPath.compile(expression).evaluate(doc, XPathConstants.NODESET);
			
			for (int i = 0; i < nodeList.getLength(); i++) {
				Node nNode = nodeList.item(i);
				Stores s=createObjectFromNode(nNode);
				stores.add(s);
			}
			//System.out.println(stores);
		
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (XPathExpressionException e) {
			e.printStackTrace();
		}
		return stores;
	}
	
	private static Stores createObjectFromNode(Node nNode) {
		Stores s=null;
		if (nNode.getNodeType() == Node.ELEMENT_NODE) {
	      Element eElement = (Element) nNode;
	      int storeNumber=Integer.parseInt(eElement.getElementsByTagName("StoreNumber")
	              .item(0)
	              .getTextContent());
	      String storeName=eElement.getElementsByTagName("StoreName")
	           .item(0)
	            .getTextContent();
	      String address=eElement.getElementsByTagName("Address")
	              .item(0)
	              .getTextContent();
	      String city=eElement.getElementsByTagName("City")
	              .item(0)
	              .getTextContent();
	      String state=eElement.getElementsByTagName("State")
	              .item(0)
	              .getTextContent();
	      int zipCode=Integer.parseInt(eElement.getElementsByTagName("ZipCode")
	              .item(0)
	              .getTextContent());
	      String phoneNumber=eElement.getElementsByTagName("PhoneNumber")
	              .item(0)
	              .getTextContent();
	      String storeHours=eElement.getElementsByTagName("StoreHours")
	              .item(0)
	              .getTextContent();
	      double latitude=Double.parseDouble(eElement.getElementsByTagName("Latitude")
	              .item(0)
	              .getTextContent());
	      double longitude=Double.parseDouble(eElement.getElementsByTagName("Longitude")
	              .item(0)
	              .getTextContent());
	      String country=eElement.getElementsByTagName("Country")
	              .item(0)
	              .getTextContent();
	     
	      s=new Stores(storeNumber, storeName, address, city, state, zipCode, phoneNumber, storeHours, latitude, longitude, country);
	      
		}
		return s;
	}
	public static void main(String[] args) {

		try {
			
			System.out.println(getStoresListByCity("Dumas"));

//			File file = new File("StoreInfo.xml");
//			JAXBContext jaxbContext = JAXBContext.newInstance(StoreInfo.class);
//
//			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
//			StoreInfo storeInfo = (StoreInfo) jaxbUnmarshaller.unmarshal(file);
//			List<Stores> l1=(List<Stores>)Arrays.asList(storeInfo.getStore());
//			System.out.println(l1);
//			
////			
////			List<Stores> stores = (List<Stores>) (Arrays.asList(storeInfo.getStore()).stream()
////					.filter(s -> s.getCity().equals("Dumas")).collect(Collectors.toList()));
////			System.out.println(stores);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
