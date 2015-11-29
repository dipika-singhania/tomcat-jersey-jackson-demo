<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/external/bootstrap/3.2.0/css/bootstrap.min.css">
	<script src="<%=request.getContextPath() %>/resources/external/angularjs/1.3.14/angular.min.js"></script>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Redmart Ticket Logging Software</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/content/styles.css">
        <script src="<%=request.getContextPath() %>/js/jquery-1.11.2.min.js"></script>
   	</head>

	<body>
		<div ng-app="myApp" ng-controller="DepartmentSelectCrtl">
			<nav class="navbar navbar-inverse">
				<div class="container-fluid">
					<div class="navbar-header">
					  <img src="<%=request.getContextPath() %>/resources/images/logo.png" alt="RedMart"/>
					</div>
					<div>
					  <ul class="nav navbar-nav">
						<li ng-repeat="x in depts" ng-click="getComments(x)"><a href="#">{{ x }}</a></li>
					  </ul>
				    </div>
				</div>
			</nav>
			<div class="container">
				<div class="col-sm-12 columns"  ng-show="deptSelect!='noDepartMentSelected'">
					<div class="widthHundred">
						<div class="panel panel-default widthHundred">
							<div class="panel-body widthHundred">
								<div class="row">
									<div class="col-sm-4">
										<button class="btn btn-success" ng-click="showNewForm()">
										  <span class="glyphicon glyphicon-user"></span> Create New User Comment
										</button>
									</div>
								</div>
								<hr>
								<div class="row" ng-show="showForm">
									<div class="col-sm-4">
										<div class="form-horizontal">
											<div class="form-group">
											  <label class="col-sm-4 control-label">CustName</label>
											  <div class="col-sm-8"><input type="text" ng-model="newComment.custInfoObj.custName"/></div>
											</div>
											<div class="form-group">
											  <label class="col-sm-4 control-label">CustNumber</label>
											  <div class="col-sm-8"><input type="text" ng-model="newComment.custInfoObj.custNum"/></div>
											</div>
										</div>												
									</div>
									<div class="col-sm-4">
										<div class="form-horizontal">
											<div class="form-group">
											  <label class="col-sm-4 control-label">Comment</label>
											  <div class="col-sm-8"><textarea ng-model="newComment.comment"></textarea></div>
											</div>
											<div class="form-group">
											  <div class="col-sm-12 text-center">
												<button class="btn btn-success" ng-show="showForm" ng-click="validateForm()">
												  <span class="glyphicon glyphicon-save"></span> Save Changes
												</button>
											  </div>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-horizontal">
											<div class="form-group">
											  <label class="col-sm-4 control-label">CreatedBy</label>
											  <div class="col-sm-8"><select ng-model="newComment.createdBy" ng-options="user for user in userToLogComments"></select></div>
											</div>
											<div class="form-group">
											  <label class="col-sm-4 control-label">Status</label>
											  <div class="col-sm-8"><select ng-model="newComment.status" ng-options="st for st in statusAllowed"></select></div>
											</div>
											<div class="form-group">
											  <label class="col-sm-4 control-label">AssignedTo</label>
											  <div class="col-sm-8"><select ng-model="newComment.assignedTo" ng-options="user for user in userToAssignTasks"></select></div>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
						<div class="allParcels widthHundred" ng-show="deptSelect!='noDepartMentSelected'">
							<div ng-repeat="comment in commentsList">
								<div class="panel panel-default widthHundred">
								  <div class="panel-body border widthHundred">
									<div class="row">
										<div class="col-sm-4">
											<div class="form-horizontal">
												<div class="form-group">
												  <label class="col-sm-4 control-label">CustName</label>
												  <div class="col-sm-8"><input type="text" ng-model="comment.custInfoObj.custName" ng-disabled="comment.disable"/></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">CustNumber</label>
												  <div class="col-sm-8"><input type="text" ng-model="comment.id" ng-disabled="comment.disable"/></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">Date</label>
												  <div class="col-sm-8"><input type="text" ng-disabled="true" ng-model="convertDate(comment.date)"/>
												  </div>
												</div>
											</div>												
										</div>
										<div class="col-sm-4">
											<div class="form-horizontal">
												<div class="form-group">
												  <label class="col-sm-4 control-label">Comment</label>
												  <div class="col-sm-8"><textarea ng-model="comment.comment" ng-disabled="comment.disable">{{comment.comment }}</textarea></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">Edit</label>
												  <div class="col-sm-8"><button class="btn" ng-click="editUser(comment.id)" ng-disabled="comment.status=='close'">
												  <span class="glyphicon glyphicon-pencil" data-toggle="tooltip" title="edit"></span></button></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">Save</label>
												  <div class="col-sm-8"><button class="btn" ng-click="saveComment(comment.id)" ng-disabled="comment.disable" data-toggle="tooltip" title="save">
													  <span class="glyphicon glyphicon-floppy-disk"></span></button></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">Delete</label>
												  <div class="col-sm-8"><button class="btn" data-toggle="tooltip" title="delete" ng-click="onDelete(comment.id)">
													  <span class="glyphicon glyphicon-remove-circle"></span></button></div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-horizontal">
												<div class="form-group">
												  <label class="col-sm-4 control-label">CreatedBy</label>
												  <div class="col-sm-8"><select ng-model="comment.createdBy" ng-options="user for user in userToLogComments"  ng-disabled="comment.disable"></select></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">Status</label>
												  <div class="col-sm-8"><select ng-model="comment.status" ng-options="st for st in statusAllowed" ng-disabled="comment.disable" ng-change="editRowDisable(comment.id,comment.status)"></select></div>
												</div>
												<div class="form-group">
												  <label class="col-sm-4 control-label">AssignedTo</label>
												  <div class="col-sm-8"><select ng-model="comment.assignedTo" ng-options="user for user in userToAssignTasks"  ng-disabled="comment.disable"></select></div>
												</div>
											</div>
										</div>
									</div>
								  </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<script src="<%=request.getContextPath() %>/scripts/departmentSelectCrtl.js"></script>
    </body>
    
</html>