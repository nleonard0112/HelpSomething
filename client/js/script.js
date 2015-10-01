var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

myApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {templateUrl: 'partials/partial1.html'})
	.when('/country', {templateUrl: 'partials/partial2.html'})
	.when('/results', {templateUrl: 'partials/partial3.html'})
	.when('/login', {templateUrl: 'partials/login.html'})
	.when('/add', {templateUrl: 'partials/add.html'})
	.when('/all', {templateUrl: 'partials/all.html'})
	.when('/urgent', {templateUrl: 'partials/urgent.html'})
	.when('/edit', {templateUrl: 'partials/edit.html'})
	.when('/phone_form', {templateUrl: 'partials/phone.html'})
	.otherwise({redirectTo: '/'});
});

myApp.factory('DashboardFactory', function($http, $location){

	var factory = {};
	var validEmail = "nleonard@linkglobal.org";
	var validPassword = "12345";
	var user_email = "";
	var user_password = "";

	factory.get_all = function(callback){
		$http.get('/get_organizations').success(function(output){
			callback(output);
		});
	};

	factory.add_org = function(info, callback){
		$http.post('/add_org', info).success(function(output){
			callback(output);
			$location.path('all');
		});
	};

	factory.get_contacts = function(callback){

		$http.get('/get_contacts').success(function(output){
			callback(output);
		});
	};

	factory.edit_org = function(info, callback){

		$http.post('/edit_org', info).success(function(output){
			console.log('made it to Factory');
			callback(output);
		});
	};

	factory.delete_org = function(info, callback){
		$http.post('/delete_org', info).success(function(output){
				callback(output);
		});
	};

	factory.delete_contact = function(info, callback){
		console.log("made it to factory");
		$http.post('/delete_contact', info).success(function(output){
				callback(output);

		});
	};

	factory.store_login = function(email, password, callback){
		console.log(password);
		user_email = email;
		user_password = password;
		callback(user_email, user_password);
	};

	factory.get_email = function(callback){
		callback(validEmail);
	};

	factory.get_password = function(callback){
		callback(validPassword);
	};

	factory.get_user_email = function(callback){
		callback(user_email);
	};

	factory.get_user_password = function(callback){
		callback(user_password);
	};

	factory.add_phone = function(info, callback){
		$http.post('/add_phone', info).success(function(output){
			callback(output);
			$location.path('/');
		});
	};

	factory.blast_message = function(info, callback){
		$http.post('/blast_message', info).success(function(output){
			callback(output);
			$location.path('all');
		}); 	
	};
	return factory;
});

myApp.factory('SelectFactory', function($http, $location){

	var factory = {};
	var pick_cause;
	var pick_country;

	factory.get_cause = function(callback){
		callback(pick_cause);
	};

	factory.get_country = function(callback){
		callback(pick_country);
	};

	factory.store_cause = function(info, callback){
		pick_cause = info;
		callback(info);
	};

	factory.store_country = function(info, callback){
		pick_country = info;
		callback(info);
	};

	factory.get_alert = function(callback){

		$http.get('/get_alert').success(function(output){
			callback(output);
		});
	};

	return factory;
});

myApp.controller('AddController', function($scope, DashboardFactory, $location){
	
	$scope.new_org = {};
	$scope.errors = [];

	DashboardFactory.get_all(function(data){
		$scope.organizations = data;
	});

	DashboardFactory.get_contacts(function(data){
		$scope.contacts = data;
	});

	DashboardFactory.get_email(function(data){
		$scope.validEmail = data;
	});

	DashboardFactory.get_password(function(data){
		$scope.validPassword = data;
	});

	DashboardFactory.get_user_email(function(data){
		$scope.user_email = data;
	});

	DashboardFactory.get_user_password(function(data){
		$scope.user_password = data;
	});

	$scope.removeContact = function(contact){
		var really = prompt('Are you sure you want to delete? Type DELETE into the box to confirm deletion');
		if(really === "DELETE"){
			console.log("made it in the if statement");
			DashboardFactory.delete_contact(contact, function(data){
				$scope.contacts = data;	
			});
		}
	};

	$scope.login = function(email, password){
		$scope.errors = [];
		console.log(password);
		if(email !== $scope.validEmail && password !== $scope.validPassword){
			$location.path('/login');
			$scope.errors.push("Invalid Login Credentials");
		}

		else{
			DashboardFactory.store_login(email, password, function(stored_email, stored_password){
				console.log(stored_email);
				$scope.user_email = stored_email;
				$scope.user_password = stored_password;
			});
			$location.path('/all');	
		}
	};

	if($scope.user_email !== $scope.validEmail && $scope.user_password !== $scope.validPassword){
			$location.path('/login');
	}

	$scope.addOrg = function(){
		$scope.errors = [];
		if($scope.new_org.name === undefined || $scope.new_org.name === "" || $scope.new_org.country === undefined || $scope.new_org.country === "" || $scope.new_org.cause === undefined || $scope.new_org.cause === "" || $scope.new_org.description === undefined || $scope.new_org.description === "" || $scope.new_org.url === undefined || $scope.new_org.url === ""){
			$scope.errors.push("No fields can be left empty");
		}

		for(var i = 0; i < $scope.organizations.length; i++){

			if($scope.new_org.name === $scope.organizations[i].name){
				$scope.errors.push("NonProfit already exists.");

			}	
		}

		if($scope.errors.length < 1){

			org_repack = {
				name: $scope.new_org.name,
				country: $scope.new_org.country,
				cause: $scope.new_org.cause,
				description: $scope.new_org.description,
				url: $scope.new_org.url,
				click: $scope.new_org.click,
				created_at: new Date()
			};

			DashboardFactory.add_org(org_repack, function(data){
				$scope.organizations = data;
			});
		}
	};

	$scope.enableEditor = function(info) {
		$scope.editorEnabled = [];
	
		for(var i = 0; i < $scope.organizations.length; i++){

			if(info.name === $scope.organizations[i].name){

				$scope.editorEnabled[i] = true;
				$scope.editorName = info.name;
				$scope.editorCause = info.cause;
				$scope.editorCountry = info.country;
				$scope.editorDescription = info.description;
				$scope.editorUrl = info.url;
			}

			else{
				$scope.editorEnabled[i] = false;
			}
		}
	};

	$scope.disableEditor = function() {
		$scope.editorEnabled = false;
	};

	$scope.save = function(EditCause, EditCountry, EditDescription, EditUrl, OrgId, $index) {

		if(EditCause === undefined || EditCause === "" || EditCountry === undefined || EditCountry === "" || EditDescription === undefined || EditDescription === "" || EditUrl === undefined || EditUrl === ""){
			$scope.errors.push("No fields can be left empty");
		}

		else{

			$scope.EditCause = EditCause;
			$scope.EditCountry = EditCountry;
			$scope.EditDescription = EditDescription;
			$scope.EditUrl = EditUrl;
			$scope.EditId = OrgId;

			edit_repack = {
				country: $scope.EditCountry,
				cause: $scope.EditCause,
				description: $scope.EditDescription,
				url: $scope.EditUrl,
				_id: $scope.EditId
			};
		
			DashboardFactory.edit_org(edit_repack, function(data){
				$scope.disableEditor();
				$scope.organizations = data;
			});
			
			DashboardFactory.get_all(function(data){
				$scope.organizations = data;
			});
		}
	};

	$scope.removeOrg = function(organizations){

		var really = prompt('Are you sure you want to delete? Type DELETE into the box to confirm deletion');
		if(really === "DELETE"){

			DashboardFactory.delete_org(organizations, function(data){
			$scope.organizations = data;	

			});
		}
	};

	$scope.blastMessage = function(){
		alert_repack = {
			name: $scope.message.name,
			url: $scope.message.url,
			about: $scope.message.about
		};

		DashboardFactory.blast_message(alert_repack, function(data){
			$scope.blast_message = data;
		});
	};
});

myApp.controller('SelectCauseController', function($scope, DashboardFactory, SelectFactory, $location){

	DashboardFactory.get_all(function(data){
		$scope.organizations = data;
	});

	DashboardFactory.get_contacts(function(data){
		$scope.contacts = data;
	});

	SelectFactory.get_alert(function(data){
		$scope.alerts = data;
		console.log($scope.alerts);
	});

	DashboardFactory.get_all(function(data){
		
		var org_arrays = data;

		for(var i = 0; i < org_arrays.length; i++){
			for(var j = org_arrays.length - 1; j > i; j--){
				
				if(org_arrays[i].cause === org_arrays[j].cause){
					org_arrays.splice(j,1);
				}
			}
		}

		$scope.org_arrays = org_arrays;
		console.log($scope.org_arrays);
		console.log($scope.organizations);
	});	

	SelectFactory.get_cause(function(data){
		$scope.cause = data;
		if($scope.cause === undefined || $scope.cause === null){
			$location.path('/');
		}
	});

	SelectFactory.get_country(function(data){
		$scope.country = data;
	});

	$scope.pickCause = function(info){

		$scope.pick_cause = info;

		SelectFactory.store_cause(info, function(data){
			$scope.pick_cause = info;
		});

		$location.path('/country');
	};

	$scope.addNumber = function(){
		$scope.errors = [];
		if($scope.new_phone.number === undefined){
			$scope.errors.push("No fields can be left empty");
		}

		for(var i = 0; i < $scope.contacts.length; i++){

			if($scope.new_phone.number === $scope.contacts[i].phone_number){
				$scope.errors.push("NonProfit already exists.");

			}
				
		}
		console.log($scope.new_phone.number);
		if($scope.errors.length < 1){

			phone_repack = {
				phone_number: $scope.new_phone.number,
				created_at: new Date()
			};

			DashboardFactory.add_phone(phone_repack, function(data){
				$scope.phone_numbers = data;
			});

		}
	};

	$scope.pickCountry = function(info){

		$scope.pick_country = info;
		
		SelectFactory.store_country(info, function(data){
			$scope.pick_country = info;
		});

		$location.path('/results');
	};

	$scope.countryresults = [];

	DashboardFactory.get_all(function(data){
		
		$scope.countries = data;
		for(var i = 0; i < $scope.countries.length; i++){

			if($scope.cause === $scope.countries[i].cause){

				$scope.countryresults.push({

					name: $scope.countries[i].name,
					country: $scope.countries[i].country,
					description: $scope.countries[i].description,
					url: $scope.countries[i].url
				});
			}
		}

		for(var i = 0; i < $scope.countryresults.length; i++){
			for(var j = $scope.countryresults.length - 1; j > i; j--){
				
				if($scope.countryresults[i].country === $scope.countryresults[j].country){

					$scope.countryresults.splice(j,1);
				}
			}
		}
	});		
});

myApp.controller('ResultsController', function($scope, DashboardFactory, SelectFactory, $location){
	$scope.organizations = {};

	SelectFactory.get_alert(function(data){
		$scope.alerts = data;
		console.log($scope.alerts);
	});


	SelectFactory.get_cause(function(data){
		$scope.cause = data;	
	});

	SelectFactory.get_country(function(data){
		$scope.country = data;
	});

	if($scope.cause === undefined || $scope.cause === null){
			$location.path('/');
	}

	$scope.results = [];
	
	DashboardFactory.get_all(function(data){
		$scope.organizations = data;
		for(var i = 0; i < $scope.organizations.length; i++){

			if($scope.cause === $scope.organizations[i].cause && $scope.country === $scope.organizations[i].country){

				$scope.results.push({

					name: $scope.organizations[i].name,
					description: $scope.organizations[i].description,
					url: $scope.organizations[i].url
				});
			}
		}
	});

	console.log($scope.results);
});









