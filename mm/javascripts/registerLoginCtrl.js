angular.module('microManager', ['ui.bootstrap']);

function registerLoginCtrl($scope, $http, $templateCache) {

	$scope.registerVisible = false;
	$scope.loginVisible = false;
	var errorReport = "Nothing"

	//Replace with bootstrap UI - collapse?
	$scope.showHideRegister = function() {
		$scope.clearUser();
		if($scope.registerVisible) {
			$scope.hide('registerButton');
		}
		else {
			$scope.registerVisible = true;
			document.getElementById('registerButton').style.background = '#FF9000';
			$scope.hide('loginButton');
		}
	};
	$scope.showHideLogin = function() {
		$scope.clearUser();
		if($scope.loginVisible) {
			$scope.hide('loginButton');
		}
		else {
			$scope.loginVisible = true;
			document.getElementById('loginButton').style.background = '#FF9000';
			$scope.hide('registerButton');
		}
	};
	$scope.clearUser = function() {
		$scope.user = angular.copy({});
	};
	$scope.passwordConfirmation = function() {
		if($scope.user.password == $scope.user.confirmPassword)
			return true;
		else {
			errorReport = "Passwords do not match!";
			return false;
		}
	};
	$scope.sendRegistration = function(form) {
	 	errorReport = "Failed submission. Please make sure all fields are valid!";
	 	if(form.$valid && $scope.passwordConfirmation()) {
	 		$http({	url: 'http://mm.latestothelates.com/aaron/v1/person/',
	 				method: 'POST',  
	 				data: "mm_function=quarantineUser"+"&email="+$scope.user.email+"&password="+$scope.user.password+"&first_name="+$scope.user.firstName+"&last_name="+$scope.user.lastName,
	 				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		    }).
		    success(function(data, status, headers, config) {
		    	$scope.status = status;
		    	$scope.data = data;
				alert("success");
				statusCodeReport($scope.data.status);
		    }).
		    error(function(data, status, headers, config) {
		    	$scope.status = status;
		    	$scope.data = "error";
		    	alert("fail");
		    });
		    $scope.hide('registerButton');
		}
	 	else
	 		alert(errorReport);
	 	
	 };
	 $scope.sendLogin = function(form) {
	 	errorReport = "Failed submission. Please make sure all fields are valid!";
	 	if(form.$valid) {
	 		$http({	method: 'GET', 
	 				url: 'http://mm.latestothelates.com/aaron/v1/person/', 
	 				params: { mm_function: 'loginUser',
		        	email: $scope.user.emailLogin,
		        	password: $scope.user.passwordLogin }
		    }).success(function(data, status, headers, config) {
		    	$scope.status = status;
		    	$scope.data = data;
		    }).error(function(data, status, headers, config) {
		    	$scope.status = status;
		    	$scope.data = "error";
		    });
		    $scope.hide('loginButton');
	 	}
	 	else
	 		alert(errorReport);

	 };
	 $scope.hide = function(id) {
		if(id == 'registerButton')
			$scope.registerVisible = false;
		else if(id == 'loginButton')
			$scope.loginVisible = false;
		$scope.clearUser();
	    document.getElementById(id).style.background = '#ffc477';
	    document.getElementById(id).style.background = '-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffc477), color-stop(1, #fb9e25) )';
	    document.getElementById(id).style.background = '-moz-linear-gradient( center top, #ffc477 5%, #fb9e25 100% )';
	};
	$scope.statusCodeReport = function(status) {
		if(status == 409)
	 		alert("User already exists!");
	}
}
