package com.nabisoft.tutorials.jerseyjackson.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_EMPTY)
public class Comment {
	
	private String createdBy;
	private String assignedTo;
	private String status;
	private String comment;
	private CustomerInfo custInfoObj;
	private String date;
	private String id;
	private String department;
	private Boolean disable;
	
	public void setDisable(Boolean pDisable) {
		this.disable = pDisable;
	}
	public Boolean getDisable(){
		return this.disable;
	}
	public String getDepartment () {
		return this.department;
	}
	
	public void setDepartment( String pDepartment) {
		this.department = pDepartment;
	}
	
	public String getId () {
        return this.id;
    }
	public void setId ( String pId ) {
		this.id = pId;
	}
	public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }
	
	public void setCreatedBy(String pCreatedBy) {
		this.createdBy = pCreatedBy;
	}
	
	public String getCreatedBy() {
		return this.createdBy;
	}
	
	public void setAssignedTo(String pAssignedTo) {
		this.assignedTo = pAssignedTo;
	}
	
	public String getAssignedTo() {
		return this.assignedTo;
	}
	
	public void setStatus(String pStatus) {
		this.status = pStatus;
	}
	
	public String getStatus() {
		return this.status;
	}
	
	public String getComment() {
		return this.comment;
	}
	
	public void setComment(String pComment) {
		this.comment = pComment;
	}
	
	public CustomerInfo getCustInfoObj() {
		return this.custInfoObj;
	}
	
	public void setCustInfoObj(CustomerInfo pCustInfoObj) {
		this.custInfoObj = pCustInfoObj;
	}
	
}
