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
		  url: window.location.pathname + 'service/employee/assignedTo'
		}).then(function successCallback(response) {
			$scope.userToAssignTasks = response.data;
		}, function errorCallback(response) {
			$scope.alertPresent = true;
			$scope.alertMessage = $scope.alertMessage + "Error occred while getting assignedto. ";
		});
		
		$http({
		  method: 'GET',
		  url: window.location.pathname + 'service/employee/createdBy'
		}).then(function successCallback(response) {
			$scope.userToLogComments = response.data;
		}, function errorCallback(response) {
			$scope.alertPresent = true;
			$scope.alertMessage = $scope.alertMessage + "Error occred while getting created user list. ";
		});
		
		$http({
		  method: 'GET',
		  url: window.location.pathname + 'service/employee/status'
		}).then(function successCallback(response) {
			$scope.statusAllowed = response.data;
		}, function errorCallback(response) {
			$scope.alertPresent = true;
			$scope.alertMessage = $scope.alertMessage + "Error occured while while getting satus list. ";
		});
		
		$http({
		  method: 'GET',
		  url: window.location.pathname + 'service/commentList/' +  $scope.deptSelect
		}).then(function successCallback(response) {
			$scope.commentsList = response.data;
			angular.forEach($scope.commentsList, function(comment) {
			  comment.disable = true;
			});
		}, function errorCallback(response) {
			$scope.alertPresent = true;
			$scope.alertMessage = $scope.alertMessage + "Error occred while calling department list. ";
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
					var checkResult = $scope.checkObject(comment,comment.id);
					if(checkResult!="success") {
						$scope.alertMessage = $scope.alertMessage + checkResult;
						$scope.alertPresent = true;
					} else {
						comment.disable = true;
						$http({
						  method: 'PUT',
						  url: window.location.pathname + 'service/comment',
						  data:comment,
						  header : { 'content-type':'application/json'}
						}).then(function successCallback(response) {
							$scope.successPresent = true;
							$scope.successMessage = "Successfully Updated Customer "+response.data.id;
						}, function errorCallback(response) {
							$scope.alertPresent = true;
							$scope.alertMessage = $scope.alertMessage + "Error occred while updating data to server. ";
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
				  url: window.location.pathname + 'service/comment/'+commentId,
				  header : { 'content-type':'application/json'}
				}).then(function successCallback(response) {
					$scope.successPresent = true;
					$scope.successMessage = "Successfully Deleted Customer "+response.data.id;
					$scope.getComments($scope.deptSelect);
				}, function errorCallback(response) {
					$scope.alertPresent = true;
					$scope.alertMessage = $scope.alertMessage + "Error occred while Deleted data to server. ";
				});
			}
		});
	}
	$scope.saveComment = function(commentId ) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
				
				var checkResult = $scope.checkObject(comment,comment.id);
				if(checkResult!="success"){
					$scope.alertMessage = $scope.alertMessage + checkResult;
					$scope.alertPresent = true;
				} else {
					comment.disable = true;
					$scope.showForm = false;
					$http({
					  method: 'PUT',
					  url: window.location.pathname + 'service/comment',
					  data:comment,
					  header : { 'content-type':'application/json'}
					}).then(function successCallback(response) {
						$scope.successPresent = true;
						$scope.successMessage = "Successfully Updated Customer "+response.data.id;
					}, function errorCallback(response) {
						$scope.alertPresent = true;
						$scope.alertMessage = $scope.alertMessage + "Error occred while updating data to server. ";
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
			  var checkResult = $scope.checkObject(comment,comment.id);
			  if(checkResult!="success"){
				$scope.alertMessage = $scope.alertMessage + checkResult;
				$scope.alertPresent = true;
			  } else {
				  if(comment.disable) {
					comment.disable = false;
				  } else {
					comment.disable = true;
					$http({
					  method: 'PUT',
					  url: window.location.pathname + 'service/comment',
					  data:comment,
					  header : { 'content-type':'application/json'}
					}).then(function successCallback(response) {
						$scope.successPresent = true;
						$scope.successMessage = "Successfully Updated Customer "+response.data.id;
					}, function errorCallback(response) {
						$scope.alertPresent = true;
						$scope.alertMessage = $scope.alertMessage + "Error occred while updating data to server . ";
					});
				  }
			  }
			}
		});
	};
	
	$scope.checkObject = function(pComment , pCustNum ) {
		if(pComment.department != $scope.deptSelect)
			return "Some error updating deparment has occured";
		if((pComment.custInfoObj.custName == null)||(pComment.custInfoObj.custName.length == 0)) {
			return "Custumer name cannot be null";
		}
		var tempNum = parseFloat(pCustNum);
		var stringTempNum = tempNum.toString();
		if(stringTempNum.length!=10 ) {
			return "Phone number must be 10 digit number";
		} 
		if(pComment.createdBy == null)
			return "Select createdBy before submit";
		return "success"; 
	};
	$scope.alertPresent = false;
	$scope.alertMessage = "";
	$scope.successPresent = false;
	$scope.successMessage = "";
	$scope.closeAlert = function() {
		$scope.alertPresent = false;
		$scope.alertMessage = "";
	};
	$scope.closeSuccess = function() {
		$scope.successPresent = false;
		$scope.successMessage = "";
	};
	$scope.expandCollapseComment = function(commentId) {
		angular.forEach($scope.commentsList, function(comment) {
			if(comment.id == commentId){
				if(comment.expanded)
					comment.expanded = false;
				else
					comment.expanded = true;
			}
		});
	};
	$scope.validateForm = function() {
		var checkResult = $scope.checkObject($scope.newComment,$scope.newComment.custInfoObj.custNum);
		if(checkResult!="success"){
			$scope.alertMessage = $scope.alertMessage + checkResult;
			$scope.alertPresent = true;
		} else {
			$http({
			  method: 'POST',
			  url: window.location.pathname + 'service/comment',
			  data:$scope.newComment,
			  header : { 'content-type':'application/json'}
			}).then(function successCallback(response) {
				$scope.successPresent = true;
				$scope.successMessage = "Successfully Updated Customer comments "+response.data.id;
				$scope.getComments($scope.deptSelect);
				$scope.showForm = false;
			}, function errorCallback(response) {
				$scope.alertPresent = true;
				$scope.alertMessage = $scope.alertMessage + "Error occred while updating data to server.";
			});
			
		}
			
	};
});