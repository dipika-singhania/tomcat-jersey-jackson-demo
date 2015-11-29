package com.nabisoft.jerseycomment.dao;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.nabisoft.tutorial.mongodb.ContentProvider;
import com.nabisoft.tutorials.jerseyjackson.model.Comment;
import com.nabisoft.tutorials.jerseyjackson.model.CustomerInfo;

public enum CommentDao {
	instance;
	  
	  private ContentProvider contentProvider = ContentProvider.getContentProvider();
	  
	  private CommentDao() {
		  
		    Comment commentObj = new Comment();
		    commentObj.setDepartment("New Connection");
		    commentObj.setId("9830081395");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("DS");
		    commentObj.setCreatedBy("AB");
		    commentObj.setComment("I want new connection");
		    CustomerInfo co = new CustomerInfo("Dipika",commentObj.getId());
		    commentObj.setCustInfoObj(co);
		    commentObj.setDate(new Date());
		    contentProvider.put(commentObj.getId(), commentObj);
		    
		    commentObj = new Comment();
		    commentObj.setDepartment("New Connection");
		    commentObj.setId("9830081396");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("AB");
		    commentObj.setCreatedBy("BC");
		    commentObj.setComment("Didnt get new connection");
		    co = new CustomerInfo("Awantika",commentObj.getId());
		    commentObj.setDate(new Date());
		    commentObj.setCustInfoObj(co);
		    contentProvider.put(commentObj.getId(), commentObj);
		    
		    commentObj = new Comment();
		    commentObj.setDepartment("Errors In Existing Con");
		    commentObj.setId("9830081397");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("BC");
		    commentObj.setCreatedBy("CD");
		    commentObj.setComment("Want to modify plan");
		    co = new CustomerInfo("Kavita",commentObj.getId());
		    commentObj.setDate(new Date());
		    commentObj.setCustInfoObj(co);
		    contentProvider.put(commentObj.getId(), commentObj);
		    
		    commentObj = new Comment();
		    commentObj.setDepartment("Errors In Existing Con");
		    commentObj.setId("9830081398");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("CD");
		    commentObj.setCreatedBy("DE");
		    commentObj.setComment("Wrong billing shown");
		    co = new CustomerInfo("Manju",commentObj.getId());
		    commentObj.setDate(new Date());
		    commentObj.setCustInfoObj(co);
		    contentProvider.put(commentObj.getId(), commentObj);
		    
		    commentObj = new Comment();
		    commentObj.setDepartment("Close a con");
		    commentObj.setId("9830081399");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("DE");
		    commentObj.setCreatedBy("EF");
		    commentObj.setComment("Close my connection");
		    co = new CustomerInfo("Binod",commentObj.getId());
		    commentObj.setDate(new Date());
		    commentObj.setCustInfoObj(co);
		    contentProvider.put(commentObj.getId(), commentObj);
		    
		    commentObj = new Comment();
		    commentObj.setDepartment("Close a con");
		    commentObj.setId("9830081310");
		    commentObj.setStatus("new");
		    commentObj.setAssignedTo("EF");
		    commentObj.setDate(new Date());
		    commentObj.setCreatedBy("DS");
		    commentObj.setComment("Help me close connection");
		    co = new CustomerInfo("Uma Devi",commentObj.getId());
		    commentObj.setCustInfoObj(co);
		    contentProvider.put(commentObj.getId(), commentObj);
	  }
	  public ContentProvider getModel(){
	    return contentProvider;
	  }
}
