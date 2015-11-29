package com.nabisoft.tutorials.jerseyjackson.jaxrs.resource;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.nabisoft.jerseycomment.dao.CommentDao;
import com.nabisoft.tutorials.jerseyjackson.model.Comment;

@Path("/comment")
public class CommentResource {
	  @GET
	  @Produces(MediaType.APPLICATION_JSON)
	  @Path("{id}")
	  public Comment getComment(@PathParam("id")String pId) {
		Comment commentObj = CommentDao.instance.getModel().get(pId);
	    if(commentObj==null)
	      throw new RuntimeException("Get: Comment with " + pId +  " not found");
	    return commentObj;
	  }
	  
	  @PUT
	  @Consumes(MediaType.APPLICATION_JSON)
	  @Produces(MediaType.APPLICATION_JSON)
	  public Comment putComment(Comment commentObj) {
		  commentObj.getCustInfoObj().setCustNum(commentObj.getId());
		  CommentDao.instance.getModel().put(commentObj.getId(), commentObj);
		  return commentObj;
	  }
	  
	  @DELETE
	  @Produces(MediaType.APPLICATION_JSON)
	  @Path("{id}")
	  public Comment deleteComment(@PathParam("id")String pId) {
	    Comment c = CommentDao.instance.getModel().remove(pId);
	    if(c==null)
	      throw new RuntimeException("Delete: Comment with " + pId +  " not found");
	    return c;
	  }
	  
	  @POST
	  @Produces({MediaType.APPLICATION_JSON })
	  @Consumes({MediaType.APPLICATION_JSON })
	  public Comment getCommentPost(Comment comment) {
		comment.setDate(new Date());
		comment.setId(comment.getCustInfoObj().getCustNum());
		CommentDao.instance.getModel().put(comment.getId(), comment);
	    return comment;
	  }
	  
}
