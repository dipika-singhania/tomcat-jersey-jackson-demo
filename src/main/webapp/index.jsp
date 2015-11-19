<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Pojo to Json Serialization using Jersey with Jackson for Java REST Services</title>
        <script src="<%=request.getContextPath() %>/js/jquery-1.11.2.min.js"></script>
   	</head>

	<body>
		<div ng-app="myApp" ng-controller="DepartmentSelectCrtl">
			<div ng-repeat="x in depts">
				<input type="radio" ng-model="$parent.deptSelect" ng-value="x" ng-click="getComments()"> {{ x }}
			</div>
			<p>{{deptSelect}}</p>
			<div class="table-responsive">
			<table class="table table-striped" ng-show="deptSelect!='noDepartMentSelected'">
			  <thead>
				<tr>
				  <th>CommentID</th>
				  <th>CommentDate</th>
				  <th>CustomerName</th>
				  <th>comment</th>
				  <th>CreatedBy</th>
				  <th>AssignedTo</th>
				  <th>Status</th>
				  <th>Edit</th>
				  <th>Save</th>
				</tr>
			  </thead>
			  <tbody>
				<tr ng-repeat="comment in commentsList">
				  <td><input type="text" ng-model="comment.id" ng-disabled="comment.disable"/></td>
				  <td><input type="text" ng-model="comment.date" ng-disabled="true"/></td>
				  <td><input type="text" ng-model="comment.custInfoObj.custName" ng-disabled="comment.disable"/></td>
				  <td><textarea ng-model="comment.comment" ng-disabled="comment.disable">{{comment.comment }}</textarea></td>
				  <td><select ng-model="comment.createdBy" ng-options="user for user in userToLogComments"  ng-disabled="comment.disable"></select></td>
				  <td><select ng-model="comment.assignedTo" ng-options="user for user in userToAssignTasks"  ng-disabled="comment.disable"></select></td>
				  <td><select ng-model="comment.status" ng-options="st for st in statusAllowed" ng-disabled="comment.disable" ng-change="editRowDisable(comment.id,comment.status)"></select></td>
				  <td>
					<button class="btn" ng-click="editUser(comment.id)" ng-disabled="comment.status=='close'">
					  <span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;Edit
					</button>
				  </td>
				  <td>
					<button class="btn" ng-click="saveComment(comment.id)" ng-disabled="comment.disable">
					  <span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;&nbsp;Save
					</button>
				  </td>
				</tr>
			  </tbody>
			</table>
			</div>
			<div>
				<button class="btn btn-success" ng-click="showNewForm()" ng-show="deptSelect!='noDepartMentSelected'">
				  <span class="glyphicon glyphicon-user"></span> Create New User
				</button>
				<hr>

				<h3 ng-show="showForm">Create New Comment:</h3>

				<form class="form-horizontal" ng-show="showForm">
					<div class="form-group">
					  <label class="col-sm-2 control-label">Name</label>
					  <div class="col-sm-10">
						<input type="text" ng-model="newComment.custInfoObj.custName" ng-disabled="!showForm" placeholder="Customer Name">
					  </div>
					</div> 
					<div class="form-group">
					  <label class="col-sm-2 control-label">Phone Number:</label>
					  <div class="col-sm-10">
						<input type="text" ng-model="newComment.custInfoObj.custNum" ng-disabled="!showForm" placeholder="08822006805">
					  </div>
					</div>
				</form>

				<hr>
				<button class="btn btn-success" ng-disabled="error || incomplete" ng-show="showForm">
				  <span class="glyphicon glyphicon-save"></span> Save Changes
				</button>
			</div>
		</div>
		<script src="<%=request.getContextPath() %>/scripts/departmentSelectCrtl.js"></script>
    </body>
    
</html>