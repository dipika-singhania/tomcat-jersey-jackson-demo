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


@Path("/commentList")
public class CommentsResource {
	@GET
	@Path("{department}")
	@Produces({MediaType.APPLICATION_JSON })
	public List<Comment> getComments(@PathParam("department")String pDepartment) {
	    List<Comment> departmentObjs = new ArrayList<Comment>();
	    departmentObjs.addAll(CommentDao.instance.getModel().values());
	    List<Comment> departmentObjsFiltered = new ArrayList<Comment>();
	    for (Comment comment : departmentObjs) {
	    	if(comment.getDepartment()!=null) {
	    		if(comment.getDepartment().equalsIgnoreCase(pDepartment))
	    			departmentObjsFiltered.add(comment);
	    	}
		}
	    return departmentObjsFiltered;
	}
}
