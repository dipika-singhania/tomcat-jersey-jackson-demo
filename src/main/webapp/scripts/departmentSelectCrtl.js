var app = angular.module('myApp', []);
app.controller('DepartmentSelectCrtl',function($scope, $http) {
	$scope.depts = ['New Connection','Errors In Existing Con','Close a con'];
	$scope.deptSelect = 'noDepartMentSelected';
	$scope.commentsList = null;
	$scope.userToLogComments = null;
	$scope.userToAssignTasks = null;
	$scope.statusAllowed = null;
	$scope.showForm = false;
	$scope.newComment = null;
	$scope.getComments = function(dept) {
		$scope.deptSelect = dept;
		$http({
		  method: 'GET',
		  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/employee/assignedTo'
		}).then(function successCallback(response) {
			$scope.userToAssignTasks = response.data;
		}, function errorCallback(response) {
			alert("Error occred while getting assignedto`");
		});
		
		$http({
		  method: 'GET',
		  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/employee/createdBy'
		}).then(function successCallback(response) {
			$scope.userToLogComments = response.data;
		}, function errorCallback(response) {
			alert("Error occred while getting created user list");
		});
		
		$http({
		  method: 'GET',
		  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/employee/status'
		}).then(function successCallback(response) {
			$scope.statusAllowed = response.data;
		}, function errorCallback(response) {
			alert("Error occred while while getting satus list");
		});
		
		$http({
		  method: 'GET',
		  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/commentList/' +  $scope.deptSelect
		}).then(function successCallback(response) {
			$scope.commentsList = response.data;
			angular.forEach($scope.commentsList, function(comment) {
			  comment.disable = true;
			});
		}, function errorCallback(response) {
			alert("Error occred while calling department list" + response.header);
		});
		
	};
	$scope.convertDate = function(date_epoch) {
		var date = new Date(date_epoch);
		return date.getUTCDate() + '/' + (date.getUTCMonth() + 1)+ '/' + date.getUTCFullYear();
	};
	$scope.editRowDisable = function(commentId , status) {
		if(status=="close") {
			angular.forEach($scope.commentsList, function(comment) {
				if(comment.id == commentId){
					if(comment.department != $scope.deptSelect)
					alert("Some error updating deparment has occured");
					else if(comment.custInfoObj.custName == null) {
						alert("Custumer name cannot be null");
					} else if(comment.id.length!=11 ) {
						alert("Phone number must be 11 digit number");
						
					} else if(isNaN(parseFloat(comment.id))) {
						alert("phone numebr must be only number")
					} else {
						comment.disable = true;
						$http({
						  method: 'PUT',
						  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/comment',
						  data:comment,
						  header : { 'content-type':'application/json'}
						}).then(function successCallback(response) {
							alert("Successfully Updated Customer "+response.data.id);
						}, function errorCallback(response) {
							alert("Error occred while updating data to server " + response.header);
						});
					}
				}
			});
		}
	};
	$scope.onDelete = function(commentId) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
				$http({
				  method: 'DELETE',
				  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/comment/'+commentId,
				  header : { 'content-type':'application/json'}
				}).then(function successCallback(response) {
					alert("Successfully Deleted Customer "+response.data.id);
					$scope.getComments($scope.deptSelect);
				}, function errorCallback(response) {
					alert("Error occred while Deleted data to server " + response.header);
				});
			}
		});
	}
	$scope.saveComment = function(commentId ) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
				
				if(comment.department != $scope.deptSelect)
					alert("Some error updating deparment has occured");
				else if(comment.custInfoObj.custName == null) {
					alert("Custumer name cannot be null");
				} else if(comment.id.length!=11 ) {
					alert("Phone number must be 11 digit number");
					
				} else if(isNaN(parseFloat(comment.id))) {
					alert("phone numebr must be only number")
				} else {
					comment.disable = true;
					$scope.showForm = false;
					$http({
					  method: 'PUT',
					  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/comment',
					  data:comment,
					  header : { 'content-type':'application/json'}
					}).then(function successCallback(response) {
						alert("Successfully Updated Customer "+response.data.id);
					}, function errorCallback(response) {
						alert("Error occred while updating data to server " + response.header);
					});
				}
			}
		});
		
	};
	$scope.showNewForm = function() {
		if($scope.deptSelect=='noDepartMentSelected'){
			alert("Please select department to creating new comment");
		} else {
			$scope.showForm = true;
			if($scope.newComment==null || $scope.newComment.department!=$scope.deptSelect){
				$scope.newComment = {department:$scope.deptSelect,status:"new",custInfoObj:{custName:null,custNum:null}};
			}
		}
	};
	$scope.editUser = function(commentId) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
			  if(comment.disable) {
				comment.disable = false;
			  } else {
				comment.disable = true;
				$http({
				  method: 'PUT',
				  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/comment',
				  data:comment,
				  header : { 'content-type':'application/json'}
				}).then(function successCallback(response) {
					alert("Successfully Updated Customer "+response.data.id);
				}, function errorCallback(response) {
					alert("Error occred while updating data to server " + response.header);
				});
			  }
			}
		});
	};
	
	$scope.validateForm = function() {
		if($scope.newComment.department != $scope.deptSelect)
			alert("Some error updating deparment has occured");
		else if($scope.newComment.custInfoObj.custName == null) {
			alert("Custumer name cannot be null");
		} else if($scope.newComment.custInfoObj.custNum.length!=11 ) {
			alert("Phone number must be 11 digit number");
			
		} else if(isNaN(parseFloat($scope.newComment.custInfoObj.custNum))) {
			alert("phone numebr must be only number")
		} else if($scope.newComment.createdBy == null)
			alert("Select createdBy before submit");
		else {
			$http({
			  method: 'POST',
			  url: '/tomcat-jersey-jackson-demo-1.0-SNAPSHOT/service/comment',
			  data:$scope.newComment,
			  header : { 'content-type':'application/json'}
			}).then(function successCallback(response) {
				alert("Successfully Updated Customer comments "+response.data.id);
				$scope.getComments($scope.deptSelect);
				$scope.showForm = false;
			}, function errorCallback(response) {
				alert("Error occred while updating data to server " + response.header);
			});
			
		}
			
	};
});