package com.nabisoft.tutorials.jerseyjackson.jaxrs.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nabisoft.jerseycomment.dao.CommentDao;
import com.nabisoft.tutorials.jerseyjackson.model.Comment;

@Path("/employee")
public class EmployeeResources {
	
	  @GET
	  @Path("assignedTo")
	  @Produces(MediaType.APPLICATION_JSON)
	  public List<String> getAssigned() {
		List<String> a = new ArrayList<String>();
		a.add("AB");
		a.add("BC");
		a.add("CD");
		a.add("DE");
		a.add("EF");
		a.add("FG");
		a.add("DS");
		return a;
	  }
	  
	  @GET
	  @Path("createdBy")
	  @Produces(MediaType.APPLICATION_JSON)
	  public List<String> getCreated() {
		List<String> a = new ArrayList<String>();
		a.add("AB");
		a.add("BC");
		a.add("CD");
		a.add("DE");
		a.add("EF");
		a.add("FG");
		a.add("DS");
		return a;
	  }
	  
	  @GET
	  @Path("status")
	  @Produces(MediaType.APPLICATION_JSON)
	  public List<String> getStatus() {
		List<String> a = new ArrayList<String>();
		a.add("new");
		a.add("open");
		a.add("close");
		return a;
	  }
}
