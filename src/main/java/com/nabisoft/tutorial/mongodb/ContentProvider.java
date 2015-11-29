package com.nabisoft.tutorial.mongodb;

import org.bson.Document;

import com.mongodb.Block;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.UpdateOptions;
import com.nabisoft.tutorials.jerseyjackson.model.Comment;
import com.nabisoft.tutorials.jerseyjackson.model.CustomerInfo;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Sorts.ascending;

import java.util.ArrayList;
import java.util.List;
public class ContentProvider {

	public static final String HOST_NAME = "127.0.0.1";
	public static final int PORT = 27017;
	public static ContentProvider cp;
	private static MongoDatabase db;
	
	private ContentProvider() {
		MongoClient mc = new MongoClient(HOST_NAME,PORT);
		db = mc.getDatabase("test");
		MongoCollection<Document> td = db.getCollection("myComment");
		if(td==null)
			db.createCollection("myComment");
		db.getCollection("myComment").createIndex(new Document("cuisine", 1));
	}
	
	public static ContentProvider getContentProvider() {
		if(cp==null) {
			cp = new ContentProvider();
		}
			
		return cp;
	}
	
	public void put(String id , Comment cm) {
		db.getCollection("myComment").replaceOne( new Document("_id" , id ) ,
				 new Document("_id",id)
				.append("department", cm.getDepartment())
				.append("assignedTo", cm.getAssignedTo())
				.append("comment", cm.getComment())
				.append("createdBy", cm.getCreatedBy())
				.append("custInfoObj", new Document("custName" ,cm.getCustInfoObj().getCustName())
						.append("custNum", cm.getCustInfoObj().getCustNum()))
				.append("date", cm.getDate())
				.append("status", cm.getStatus()), 
				(new UpdateOptions()).upsert(true)
				);
	}
	
	public Comment get(String id) {
		Comment cmObj = new Comment();
		FindIterable<Document> iterable = db.getCollection("myComment").find(eq("_id", id));
		iterable.forEach(new Block<Document>() {
		    @Override
		    public void apply(final Document document) {
		    	cmObj.setAssignedTo(document.getString("assignedTo"));
		    	cmObj.setComment(document.getString("comment"));
		    	cmObj.setCreatedBy(document.getString("createdBy"));
		    	CustomerInfo custInf = new CustomerInfo();
		    	Document cusDoc = (Document) document.get("custInfoObj");
		    	custInf.setCustName(cusDoc.getString("custName"));
		    	custInf.setCustNum(cusDoc.getString("custNum"));
		    	cmObj.setCustInfoObj(custInf);
		    	cmObj.setDate(document.getDate("date"));
		    	cmObj.setDepartment(document.getString("department"));
		    	cmObj.setId(document.getString("_id"));
		    	cmObj.setStatus(document.getString("status"));
		    }
		});
		return cmObj;
	}
	
	public Comment remove(String id) {
		Comment cm = get(id);
		if(cm.getId().length()!=0){
			db.getCollection("myComment").deleteOne(new Document("_id",id));
			return cm;
		} else {
			return null;
		}
	}
	
	public List<Comment> getByDepartment(String department) {
		List<Comment> cmList = new ArrayList<Comment>();
		FindIterable<Document> iterable = db.getCollection("myComment").
				find(new Document("department",department));
		iterable.forEach(new Block<Document>() {
		    @Override
		    public void apply(final Document document) {	
		    	Comment cmObj = new Comment();
		    	cmObj.setAssignedTo(document.getString("assignedTo"));
		    	cmObj.setComment(document.getString("comment"));
		    	cmObj.setCreatedBy(document.getString("createdBy"));
		    	CustomerInfo custInf = new CustomerInfo();
		    	Document cusDoc = (Document) document.get("custInfoObj");
		    	custInf.setCustName(cusDoc.getString("custName"));
		    	custInf.setCustNum(cusDoc.getString("custNum"));
		    	cmObj.setCustInfoObj(custInf);
		    	cmObj.setDate(document.getDate("date"));
		    	cmObj.setDepartment(document.getString("department"));
		    	cmObj.setId(document.getString("_id"));
		    	cmObj.setStatus(document.getString("status"));
		    	cmList.add(cmObj);
		    }
		});
		return cmList;
	}
	
	public List<Comment> values() {
		List<Comment> cmList = new ArrayList<Comment>();
		FindIterable<Document> iterable = db.getCollection("myComment").find();
		iterable.forEach(new Block<Document>() {
		    @Override
		    public void apply(final Document document) {	
		    	Comment cmObj = new Comment();
		    	cmObj.setAssignedTo(document.getString("assignedTo"));
		    	cmObj.setComment(document.getString("comment"));
		    	cmObj.setCreatedBy(document.getString("createdBy"));
		    	CustomerInfo custInf = new CustomerInfo();
		    	Document cusDoc = (Document) document.get("custInfoObj");
		    	custInf.setCustName(cusDoc.getString("custName"));
		    	custInf.setCustNum(cusDoc.getString("custNum"));
		    	cmObj.setCustInfoObj(custInf);
		    	cmObj.setDate(document.getDate("date"));
		    	cmObj.setDepartment(document.getString("department"));
		    	cmObj.setId(document.getString("_id"));
		    	cmObj.setStatus(document.getString("status"));
		    	cmList.add(cmObj);
		    }
		});
		return cmList;
	}
}
