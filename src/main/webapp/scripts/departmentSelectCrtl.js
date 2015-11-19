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
	$scope.getComments = function() {
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
	$scope.editRowDisable = function(commentId , status) {
		if(status=="close") {
			angular.forEach($scope.commentsList, function(comment) {
				if(comment.id == commentId){
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
			});
		}
	};
	$scope.saveComment = function(commentId ) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
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
		});
		
	};
	$scope.showNewForm = function() {
		if($scope.deptSelect=='noDepartMentSelected'){
			alert("Please select department to creating new comment");
		} else {
			$scope.showForm = true;
			if($scope.newComment==null || $scope.newComment.department!=$scope.deptSelect){
				$scope.newComment = {department:$scope.deptSelect};
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
});