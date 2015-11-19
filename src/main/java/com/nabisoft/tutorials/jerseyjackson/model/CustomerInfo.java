package com.nabisoft.tutorials.jerseyjackson.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_EMPTY)
public class CustomerInfo {

	private String custName;
	private String custNum;
	public CustomerInfo() {
		
	}
	public CustomerInfo(String name,String num) {
		this.custName = name;
		this.custNum = num;
	}
	public void setCustName(String pCustName) {
		this.custName = pCustName;
	}
	
	public void setCustNum(String pCustNum) {
		this.custNum = pCustNum;
	}
	
	public String getCustName() {
		return this.custName;
	}
	
	public String getCustNum() {
		return this.custNum;
	}
	
}
