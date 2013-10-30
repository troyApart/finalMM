 //module
var microManager = angular.module('microManager', ['ui.router', '$strap.directives', 'ui.bootstrap', 'ngCookies', 'webStorageModule']);

//factories
microManager.factory('createGroupFactory', function($http, $rootScope){
    return {
        createGroup: function(groupName, groupType) {
            $http({ method: 'POST',
                url: 'http://mm.latestothelates.com/api/v1/group/', 
                data: "mm_function=createGroup"+"&groupname="+groupName+"&email="+$rootScope.savedLogin.email+"&token="+$rootScope.savedLogin.token+"&grouptype="+groupType,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data) {
                statusCodeReport("createGroup", data);
            })
        }
    }
});

microManager.factory('groupFactory', function($http, $rootScope) {
    return {
        getGroups: function (callback) {
            $http({
            method: 'GET', 
            url: 'http://mm.latestothelates.com/sam/v1/group/', 
            params: {
                mm_function: 'getAllGroupsByUser', 
                email: $rootScope.savedLogin.email, 
                token: $rootScope.savedLogin.token
            }
        }).success(callback);
        }
    }
});

microManager.factory('memberFactory', function($http, $rootScope) {
    return {
        getMembers: function (callback) {
            $http({
            method: 'GET', 
            url: 'http://mm.latestothelates.com/api/v1/person/', 
            params: {
                mm_function: 'getAllMembersByGroupID', 
                groupid: $rootScope.savedLogin.id,
                email: $rootScope.savedLogin.email, 
                token: $rootScope.savedLogin.token
            }
        }).success(callback);
        }
    }
});

microManager.factory('inviteMemberFactory', function ($http, $rootScope) {
    return {
        inviteMember: function (callback) {
            $http({
            method: 'POST', 
            url: 'http://mm.latestothelates.com/api/v1/group/', 
            data: "mm_function=inviteToGroup" + "&token=" + $rootScope.savedLogin.token + "&groupId=" + $rootScope.savedLogin.id + "&inviterEmail=" + $rootScope.savedLogin.email + "&inviteeEmail=" + $rootScope.savedLogin.invite,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(callback);
        }
    }
});

microManager.factory('invitesFactory', function ($http, $rootScope) {
   return {
        getInvites: function (callback) {
            $http({
            method: 'GET', 
            url: 'http://mm.latestothelates.com/api/v1/group/', 
            params: {
                mm_function: 'getAllInvitesByUser',
                email: $rootScope.savedLogin.email, 
                token: $rootScope.savedLogin.token
            }
        }).success(callback);
        }
    } 
});

microManager.factory('acceptInviteFactory', function ($http, $rootScope) {
   return {
        acceptInvite: function (callback) {
            $http({
            method: 'GET', 
            url: 'http://mm.latestothelates.com/api/v1/group/', 
            params: {
                mm_function: 'acceptGroupInvite',
                email: $rootScope.savedLogin.email, 
                token: $rootScope.savedLogin.token,
                groupId: $rootScope.savedLogin.invite
            }
        }).success(callback);
        }
    } 
});

microManager.factory('taskFactory', function ($http, $rootScope) {
   return {
        getTask: function (callback) {
            $http({
            method: 'GET', 
            url: 'http://mm.latestothelates.com/sam/v1/task/', 
            params: {
                mm_function: 'getTaskInfoByTaskID',
                email: $rootScope.savedLogin.email, 
                token: $rootScope.savedLogin.token,
                taskid: 7
            }
        }).success(callback);
        }
    } 
});

microManager.factory('leaveGroupFactory', function ($http, $rootScope) {
    return {
        leaveGroup: function (groupid) {
            $http({
            method: 'DELETE', 
            url: 'http://mm.latestothelates.com/api/v1/group/', 
            data: "mm_function=leaveGroup" + 
                  "&token=" + $rootScope.savedLogin.token + 
                  "&email=" + $rootScope.savedLogin.email +
                  "&groupid=" + groupid,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
                statusCodeReportApp("leaveGroup", data);
            })
        }
    }
});

microManager.factory("editGroupNameFactory", function ($http, $rootScope) {
    return {
        editGroupName: function (newGroupName, groupid) {
            $http({
            method: "PUT", 
            url: "http://mm.latestothelates.com/api/v1/group/", 
            data: "mm_function=editGroupName" + 
                  "&token=" + $rootScope.savedLogin.token + 
                  "&email=" + $rootScope.savedLogin.email +
                  "&name=" + newGroupName +
                  "&id=" + groupid,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
                statusCodeReportApp("editGroupName", data);
            })
        }
    }
});

microManager.factory('deleteGroupFactory', function ($http, $rootScope) {
    return {
        deleteGroup: function (groupid) {
            $http({
            method: 'DELETE', 
            url: 'http://mm.latestothelates.com/api/v1/group/', 
            data: "mm_function=deleteGroup" + 
                  "&token=" + $rootScope.savedLogin.token + 
                  "&email=" + $rootScope.savedLogin.email +
                  "&groupid=" + groupid,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
                statusCodeReportApp("deleteGroup", data);
            })
        }
    }
});

microManager.factory('removeMemberFactory', function ($http, $rootScope) {
    return {
        removeMember: function (groupid, targetuser) {
            $http({
            method: 'DELETE', 
            url: 'http://mm.latestothelates.com/api/v1/person/', 
            data: "mm_function=removeMember" + 
                  "&token=" + $rootScope.savedLogin.token + 
                  "&email=" + $rootScope.savedLogin.email +
                  "&groupid=" + groupid + 
                  "&targetuser=" + targetuser,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function(data) {
                statusCodeReportApp("removeMember", data);
            })
        }
    }
});



/*
microManager.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});
*/
/*
microManager.factory('AuthenticationService', function ($http, $location) {
    return {
        login: function (user) {
            return $http.get("http://mm.latestothelates.com/aaron/v1/person/", user);
        },
        logout: function () {
            return $http.get("/auth/logout", user);
        }
    };
});
/*

/*
microManager.factory('Person', ['$resource', function ($resource) {
    return $resource ('/api/v1/person/');
    }
]);
*/

//config
microManager.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/landing");

    $stateProvider
        .state('landing', {
            url: "/landing",
            views: {
                "contentView": {
                    controller: 'MainController',
                    templateUrl: "mm/partials/landing.html"
                },
                "loginView": {
                    controller: 'registerLoginCtrl',
                    templateUrl: "mm/partials/login.html"
                }
            }
        })
        .state('landingLoggedIn', {
            url: "/landingLoggedIn",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/landing.html"
                },
                "loginView": {
                    controller: 'LogoutController',
                    templateUrl: "mm/partials/logout.html"
                }
            }
        })
        .state('account', {
            url:"/account",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/account.html"
                },
                "loginView": {
                    controller: 'LogoutController',
                    templateUrl: "mm/partials/logout.html"
                }
            }
        })
        .state('about', {
            url: "/about",
            views: {
                "contentView": {
                    controller: 'MainController',
                    templateUrl: "mm/partials/about.html"
                },
                "loginView": {
                    controller: 'registerLoginCtrl',
                    templateUrl: "mm/partials/login.html"
                }
            }
        })
        .state('purchase', {
            url: "/purchase",
            views: {
                "contentView": {
                    controller: 'MainController',
                    templateUrl: "mm/partials/purchase.html"
                },
                "loginView": {
                    controller: 'registerLoginCtrl',
                    templateUrl: "mm/partials/login.html"
                }
            }
        })
        .state('contact', {
            url: "/contact",
            views: {
                "contentView": {
                    controller: 'MainController',
                    templateUrl: "mm/partials/contact.html"
                },
                "loginView": {
                    controller: 'registerLoginCtrl',
                    templateUrl: "mm/partials/login.html"
                }
            }
        })
        .state('app', {
            url: "/app",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/app.html"
                },
                "loginView": {
                    controller: 'LogoutController',
                    templateUrl: "mm/partials/logout.html"
                },
                "memberView": {
                    controller: 'MemberController',
                    templateUrl: "mm/partials/members.html"
                },
                "taskView": {
                    controller: 'TaskController',
                    templateUrl: "mm/partials/tasks.html"
                }
            }
        })
        .state('update', {
            url: "/update",
            views: {
                "contentView": {
                    controller: 'MainController',
                    templateUrl: "mm/partials/update.html"
                },
                "loginView": {
                    controller: 'registerLoginCtrl',
                    templateUrl: "mm/partials/login.html"
                }
            }
        })
        .state('updateLoggedIn', {
            url: "/updateLoggedIn",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/update.html"
                },
                "loginView": {
                    controller: 'LogoutController',
                    templateUrl: "mm/partials/logout.html"
                }
            }
        })
        .state('app.tasks', {
            url: "^/tasks",
            views: {
                                "memberView": {
                    controller: 'MemberController',
                    templateUrl: "mm/partials/members.html"
                },
                "taskView": {
                    controller: 'TaskController',
                    templateUrl: "mm/partials/tasks.html"
                }
            }
        })
        .state('myAccount', {
            url: "/myAccount",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/account.html"
                },
                "loginView": {
                    controller: 'LogoutController',
                    templateUrl: "mm/partials/logout.html"
                }
            }
        })
        .state('createNewGroup', {
            url: "/createNewGroup",
            views: {
                "contentView": {
                    controller: 'appController',
                    templateUrl: "mm/partials/createNewGroup.html"
                },
                "loginView": {
                    controller: 'logoutController',
                    templateUrl: "mm/partials/logout.html"
                }
            }
        })
});
/*
microManager.config(function ($httpProvider) {

    var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
        var success = function (response) {
            return response;
        };

        var error = function (response) {
            if (response.status === 401) {
                //redirect them back to login page
                $location.path('/landing');

                return $q.reject(response);
            }
            else {
                return $q.reject(response);
            }
        };

        return function (promise) {
            return promise.then(success, error);
        };
    }];

    $httpProvider.responseInterceptors.push(logsOutUserOn401);
});
*/

//run
/*
microManager.run(function ($rootScope, $location, AuthenticationService) {
    var routesThatDontRequireAuth = ['/landing'];

    var routeClean = function (route) {
        return _.find(routesThatDontRequireAuth,
            function (noAuthRoute) {
                return _.str.startsWith(route, noAuthRoute);
            });
    };

    $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
        if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
            $location.path('/landing');
        }
    });
});
*/

//controllers
var controllers = {};


controllers.registerLoginCtrl = function ($rootScope, $scope, $http, $templateCache, $cookieStore, $location) {

    $scope.registerVisible = false;
    $scope.loginVisible = false;
    var errorReport = "Nothing"

    //Replace with bootstrap UI - collapse?
    $scope.showHideRegister = function () {
        $scope.clearUser();
        if ($scope.registerVisible) {
            $scope.hide('registerButton');
        }
        else {
            $scope.registerVisible = true;
            document.getElementById('registerButton').style.background = '#FF9000';
            $scope.hide('loginButton');
        }
    };
    $scope.showHideLogin = function () {
        $scope.clearUser();
        if ($scope.loginVisible) {
            $scope.hide('loginButton');
        }
        else {
            $scope.loginVisible = true;
            document.getElementById('loginButton').style.background = '#FF9000';
            $scope.hide('registerButton');
        }
    };
    $scope.clearUser = function () {
        $scope.user = angular.copy({});
    };
    $scope.passwordConfirmation = function () {
        if ($scope.user.password === $scope.user.confirmPassword)
            return true;
        else {
            errorReport = "Passwords do not match!";
            return false;
        }
    };
    $scope.sendRegistration = function (form) {
        errorReport = "Failed submission. Please make sure all fields are valid!";
        if (form.$valid && $scope.passwordConfirmation()) {
            $http({
                url: 'http://mm.latestothelates.com/api/v1/person/',
                method: 'POST',
                data: "mm_function=quarantineUser" + "&email=" + $scope.user.email + "&password=" + $scope.user.password + "&first_name=" + $scope.user.firstName + "&last_name=" + $scope.user.lastName,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).
		    success(function (data, status, headers, config) {
		        $scope.status = status;
		        $scope.data = data;
		        $scope.statusCodeReport('registerButton', $scope.data);
		    }).
		    error(function (data, status, headers, config) {
		        $scope.status = status;
		        $scope.data = "error";
		        $scope.statusCodeReport('registerButton', $scope.data);
		    });
        }
        else
            alert(errorReport);

    };
    $scope.sendLogin = function (form) {
        errorReport = "Failed submission. Please make sure all fields are valid!";
        if (form.$valid) {
            $http({
                method: 'GET',
                url: 'http://mm.latestothelates.com/api/v1/person/',
                params: {
                    mm_function: 'loginUser',
                    email: $scope.user.emailLogin,
                    password: $scope.user.passwordLogin
                }
            }).success(function (data, status, headers, config) {
                $scope.status = status;
                $scope.data = data;
                $scope.statusCodeReport('loginButton', $scope.data);
            }).error(function (data, status, headers, config) {
                $scope.status = status;
                $scope.data = "error";
                $scope.statusCodeReport('loginButton', $scope.data);
            });
        }
        else
            alert(errorReport);

    };
    $scope.hide = function (id) {
        if (id === 'registerButton')
            $scope.registerVisible = false;
        else if (id === 'loginButton')
            $scope.loginVisible = false;
        $scope.clearUser();
        document.getElementById(id).style.background = '#ffc477';
        document.getElementById(id).style.background = '-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffc477), color-stop(1, #fb9e25) )';
        document.getElementById(id).style.background = '-moz-linear-gradient( center top, #ffc477 5%, #fb9e25 100% )';
    };
    $scope.statusCodeReport = function (name, data) {
        if (data != "error") {
            if (name == 'registerButton')
                switch (data.status_code) {
                    case 201: alert("Regristration successful. Please check for email confirmation.");
                        $scope.hide('registerButton');
                        break;
                    case 400: alert("Bad Request");
                        break;
                    case 409: alert("Email already in use!");
                        break;
                    case 500: alert("Internal Server Error");
                        break;
                }
            else
                switch (data.status_code) {
                    case 200:
                        savedLogin = new Object();
                        savedLogin.email = $scope.user.emailLogin;
                        savedLogin.token = data.token;
                        $rootScope.savedLogin = savedLogin;
                        $cookieStore.put('savedLogin', $rootScope.savedLogin);
                        $scope.hide('loginButton');
                        $location.path('app');
                        break;
                    case 400: alert("Invalid login information.");
                        break;
                    case 401: alert("Invalid login information.");
                        break;
                    case 909: alert("Email confirmation pending.");
                        $scope.hide('loginButton');
                        break;
                }
        }
        else
            alert("ERROR: $http failed!")
    };
};

controllers.LogoutController = function ($scope, $rootScope, $http, $cookieStore, $location) {

    $scope.myAccount = function() {
        $location.path('myAccount');
    }

    $scope.logout = function() {
        if ($cookieStore.get('savedLogin') != null) {

            var savedLogin = $cookieStore.get('savedLogin');
            $rootScope.savedLogin = savedLogin;

            $http({
                method: 'DELETE', 
                url: 'http://mm.latestothelates.com/api/v1/person/', 
                data: "mm_function=logoutUser" + "&email=" + $rootScope.savedLogin.email + "&token=" + $rootScope.savedLogin.token,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success(function(data, status, headers, config) {
                    $scope.status = status;
                    $scope.data = data;
                    $scope.statusCodeReport('logoutUser', $scope.data);
            }).error(function(data, status, headers, config) {
                    $scope.status = status;
                    $scope.data = "error";
                    $scope.statusCodeReport('logoutUser', $scope.data);
            });
        }
         
        $scope.statusCodeReport = function (name, data) {
            if (data != "error") {
                switch (data.status_code) {
                    case 200:
                        $cookieStore.remove('savedLogin');
                        $location.path('landing');
                        break;
                    default:
                        alert("Something is wrong!");
                        break;
                }
            }
            else {
                alert("ERROR: $http failed!")
            }
        }
    }
};

controllers.IndexController = function ($scope, $rootScope) {

}

controllers.MainController = function ($scope, $rootScope, $cookieStore, $location, groupFactory, webStorage) {
        var saved = webStorage.local.get('saved');
        if (saved != null) {
            if ($cookieStore.get('savedLogin') != null) {
                var savedLogin = $cookieStore.get('savedLogin');
                $rootScope.savedLogin = savedLogin;

                groupFactory.getGroups(function(results) {
                    if (results.status_code === 401) {
                        $location.path('landing');
                    }
                    else {
                        console.log(results);
                        $scope.groups = results.result;
                        $rootScope.savedLogin.groups = $scope.groups;
                        $cookieStore.put('savedLogin', $rootScope.savedLogin);
                        console.log($scope.groups);
                    }
                })
                $scope.$apply();
            } else {
                //$location.path('landing');
            };
        } else {};
        
        /*
        if ($cookieStore.get('savedLogin') != null) {

            var savedLogin = $cookieStore.get('savedLogin');
            $rootScope.savedLogin = savedLogin;

            //getGroupsByEmail() {
            $http({
                method: 'GET', 
                url: 'http://mm.latestothelates.com/api/v1/group/', 
                params: {
                    mm_function: 'getAllGroupsByUser', 
                    email: $rootScope.savedLogin.email, 
                    token: $rootScope.savedLogin.token
                }
            }).success(function(data, status, headers, config) {
                    $scope.status = status;
                    $scope.data = data;
                    $scope.statusCodeReport('getAllGroupsByUser', $scope.data);
            }).error(function(data, status, headers, config) {
                    $scope.status = status;
                    $scope.data = "error";
                    $scope.statusCodeReport('getAllGroupsByUser', $scope.data);
            });
        }
        else {}
         
        $scope.statusCodeReport = function (name, data) {
            if (data != "error") {
                switch (data.status_code) {
                    case 200:
                        $scope.groups = data.result;
                        console.log($scope.groups);
                        break;
                    case 401:
                        console.log("You are not logged in!");
                        $location.path('landing');
                        break;
                    default:
                        alert("Something is wrong!");
                        break;
                }
            }
            else {
                alert("ERROR: $http failed!")
            }
        }
        */

};

controllers.appController = function ($scope, $rootScope, $cookieStore, $location, $modal, groupFactory, invitesFactory, acceptInviteFactory, createGroupFactory,editGroupNameFactory,deleteGroupFactory,leaveGroupFactory, webStorage) {
            if ($cookieStore.get('savedLogin') != null) {
            var savedLogin = $cookieStore.get('savedLogin');
            $rootScope.savedLogin = savedLogin;
            webStorage.isSupported = true;
            webStorage.local.isSupported = true;
            webStorage.local.add('saved', $rootScope.savedLogin);
            
            groupFactory.getGroups(function(results) {
                if (results.status_code === 401) {
                    $location.path('landing');
                }
                else {
                    console.log(results);
                    $scope.groups = results.result;
                    $rootScope.savedLogin.groups = $scope.groups;
                    $cookieStore.put('savedLogin', $rootScope.savedLogin);
                    console.log($scope.groups);
                }
            })
            invitesFactory.getInvites(function(results) {
                if (results.status_code === 401) {
                    $location.path('landing');
                }
                else {
                    console.log(results);
                    $scope.invites = results.result;
                    $rootScope.savedLogin.invites = $scope.invites;
                    $cookieStore.put('savedLogin', $rootScope.savedLogin);
                }
            })
            $scope.$apply();
            //Initialization of createGroup
            $scope.createGroupType = "peer";
        } else {
            $location.path('landing');
        };

        $scope.editGroupName = function(newGroupName,groupid) {
            editGroupNameFactory.editGroupName(newGroupName, groupid);
            $scope.$apply();
          $location.path('app');
        };

        $scope.leaveGroup = function(groupid) {
          leaveGroupFactory.leaveGroup(groupid);
          $location.path('app');
        };

        $scope.deleteGroup = function(groupid) {
            deleteGroupFactory.deleteGroup(groupid);
            $scope.$apply();
          $location.path('app');
        };
        
        $scope.createGroup = function() {
          var test = createGroupFactory.createGroup($scope.createGroupName, $scope.createGroupType);
        };

        $scope.showLocalData = function () {
            var saved = webStorage.local.get('saved');
            $scope.saved = saved;
        }

        $scope.updateGroups = function () {
            groupFactory.getGroups(function(results) {
                if (results.status_code === 401) {
                    $location.path('landing');
                }
                else {
                    $scope.groups = results.result;
                    $rootScope.savedLogin.groups = $scope.groups;
                    $cookieStore.put('savedLogin', $rootScope.savedLogin);
                    webStorage.session.add('groups', $scope.groups);
                }
            })
            $scope.$apply();
        };

        $scope.updateInvites = function () {
            invitesFactory.getInvites(function(results) {
                if (results.status_code === 401) {
                    $location.path('landing');
                }
                else {
                    $scope.invites = results.result;
                    $rootScope.savedLogin.invites = $scope.invites;
                    $cookieStore.put('savedLogin', $rootScope.savedLogin);
                }
            })
            $scope.$apply();
        };

        $scope.loadGroup = function (group) {
            console.log(group.id);
            $rootScope.savedLogin.id = group.id;
            $cookieStore.put('savedLogin', $rootScope.savedLogin);
            webStorage.session.add('currentGroup', group.id);
        };

        $scope.getOwner = function (ownerEmail) {
            $rootScope.owner = ownerEmail;
        };

        $scope.acceptInvite = function (invite) {
            $rootScope.savedLogin.invite = invite.groupid;
            console.log($rootScope.savedLogin.invite);
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                resolve: {
                    invites: function () {
                        return $scope.invites;
                    }
                }
            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance, $location, invites) {
            $scope.mod = invites[0];
            $scope.ok = function () {
                $modalInstance.dismiss('ok');
                acceptInviteFactory.acceptInvite(function (results) {
                    if (results.status_code === 401) {
                        $location.path('landing');
                    }
                    else if (results.status_code === 204) {
                        alert("No invite exists");
                    }
                    else {
                        $location.path('app')
                    }
                })
                $scope.$apply();
                //acceptTask code here
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
};

controllers.TaskController = function ($rootScope, $scope, $http, $location, taskFactory, webStorage) {
    //$scope.showTask = function () {
        /*
        taskFactory.getTask(function (results) {
            if (results.status_code === 401) {
                $location.path('landing');
            }
            else if (results.status_code === 204) {
                alert("No task exists");
            }
            else {
                console.log(results);
                $scope.tasks = results.title;
                console.log($scope.tasks);
            }
        })
 */
    //};
    
    $rootScope.tasks = [];
    /*
    $scope.members = webStorage.session.get('members');
    console.log ($scope.members);
    for (var i = 0; i < $scope.members.length; i++) {
        if ($scope.members[i].checked === true) {
            if ($scope.members[i].fname != "Justin") {
                $rootScope.tasks.push({text: "Do Not Kill - " + $scope.members[i].email, done: false});
            } else {
                $rootScope.tasks.push({text: "Kill - " + $scope.members[i].email, done: false});
            }
        } else {};
    }
    */
    
    $rootScope.$watch('memberTask', function () {
        $rootScope.tasks = [];
        var selectedMembers = webStorage.session.get('members');
        for (var i = 0; i < selectedMembers.length; i++) {
        if (selectedMembers[i].checked === true) {
            if (selectedMembers[i].fname != "Justin") {
                $rootScope.tasks.push({text: "Do Not Kill - " + selectedMembers[i].email, done: false});
            } else {
                $rootScope.tasks.push({text: "Kill - " + selectedMembers[i].email, done: false});
            }
        } else {};
    }
    });

    $scope.updateTasks = function () {
        $rootScope.tasks = [];
        $scope.members = webStorage.session.get('members');

        for (var i = 0; i < $scope.members.length; i++) {
        if ($scope.members[i].checked === true) {
            if ($scope.members[i].fname != "Justin") {
                $rootScope.tasks.push({text: "Do Not Kill - " + $scope.members[i].email, done: false});
            } else {
                $rootScope.tasks.push({text: "Kill - " + $scope.members[i].email, done: false});
            }
        } else { };
        $scope.$apply();
    }
    };

    $scope.getTotalTasks = function () {
        if ($rootScope.tasks != null) {
            return $scope.tasks.length;
        } else { return 0; }
    };

    $scope.clearCompleted = function () {
        $rootScope.tasks = _.filter($scope.tasks, function (task) {
            return !task.done;
        });
    };

    $scope.addTask = function () {
        $rootScope.tasks.push({ text: $scope.formTaskText, done: false });
        $rootScope.formTaskText = '';
        
    };

    $scope.selectAllTasks = function () {
        for (var i = 0; i < $scope.members.length; i++) {
            if ($scope.tasks[i].done === false)
                $scope.tasks[i].done = true;
        };
    };
    $scope.deselectAllTasks = function () {
        for (var i = 0; i < $scope.members.length; i++) {
            if ($scope.tasks[i].done === true)
                $scope.tasks[i].done = false;
        };
    };
};

controllers.MemberController = function ($filter, $scope, $rootScope, $http, $cookieStore, groupFactory, memberFactory, inviteMemberFactory, removeMemberFactory, $location, webStorage) {
    $scope.members = [];
    $scope.ownerEmail = $rootScope.owner;

    if ($cookieStore.get('savedLogin') != null) {
            var savedLogin = $cookieStore.get('savedLogin');
            $rootScope.savedLogin = savedLogin;
            memberFactory.getMembers(function(results) {
                console.log(results);
                $scope.members = results.result;
                console.log($scope.members);
                for (var i = 0; i < $scope.members.length; i++) {
                    $scope.members[i].checked = true;
                    webStorage.session.isSupported = true;
                    webStorage.session.add('members', $scope.members);
                };  
            })
    } else {};

    $scope.viewTasks = function (member) {
        console.log(member);
        $scope.tasks = [
        { text: 'Other', done: false }
    ];
    };

    $scope.selectedMembers = function () {
        var members = $filter('filter')($scope.members, {checked: true});
        console.log(members);
        $rootScope.memberTask = members;
        webStorage.session.add('members', members);
    };

    $scope.clearCompleted = function () {
        $scope.members = _.filter($scope.members, function (member) {
            return !member.done;
        });
    };

    $scope.addMember = function () {
        $scope.addM = $scope.formMemberText;
        $rootScope.savedLogin.invite = $scope.addM;
        inviteMemberFactory.inviteMember(function(results) {
                console.log(results);
                if(results.status_code === 200) {
                    alert($scope.addM + " has been invited!");
                }
                else if (results.status_code === 409) {
                    console.log($scope.addM);
                    alert($scope.addM + " has already been invited!");
                }
        });
        $scope.$apply();
        $scope.formMemberText = '';
    };

    $scope.selectAllMembers = function () {
        for (var i = 0; i < $scope.members.length; i++) {
            if ($scope.members[i].checked === false)
                $scope.members[i].checked = true;
        };
    };
    $scope.deselectAllMembers = function () {
        for (var i = 0; i < $scope.members.length; i++) {
            if ($scope.members[i].checked === true)
                $scope.members[i].checked = false;
        };
    };

    $scope.removeMember = function () {
        if ($rootScope.memberTask.length === 1) {
            var groupId = webStorage.session.get('currentGroup');
            var selectedMember = webStorage.session.get('members');
            removeMemberFactory.removeMember(groupId, selectedMember);
            $scope.$apply();
        } else { }
    };
};

controllers.TabsController = function ($scope) {
    $scope.tabs = [
      { title: "Dynamic Title 1", content: "Dynamic content 1" },
      { title: "Dynamic Title 2", content: "Dynamic content 2", disabled: true }
    ];

    $scope.alertMe = function () {
        setTimeout(function () {
            alert("You've selected the alert tab!");
        });
    };

    $scope.navType = 'pills';
};


controllers.CookieController = function ($scope, $rootScope, $cookieStore) {
/*
    var savedLogin = $cookieStore.get('savedLogin');
    $rootScope.savedLogin = savedLogin;
*/
};

microManager.controller(controllers);

//Status Code Display
    function statusCodeReport(name, data) {
        if(data == "error")
            alert("ERROR: $http failed!");
        else {
            switch(name) {
                case "getAllMembersByGroupId": switch(data.status_code) {
                        case 200: alert("Success!");
                            break;
                        case 400: alert("Invalid or missing parameters!");
                            break;
                        case 401: alert("Not logged in!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("getAllMembersByGroupId status not found!");
                    }
                    break;
                case "acceptGroupInvite": switch(data.status_code) {
                        case 200: alert("You have successfully joined the group!");
                            break;
                        case 204: alert("No invite exists from this group!");
                            break;
                        case 400: alert("Invalid request!");
                            break;
                        case 401: alert("Session token has expried!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("acceptGroupInvite status not found!");
                    }
                    break;
                case "createGroup": switch(data.status_code) {
                        case 2: alert("Lack privilege for request!");
                            break;
                        case 201: alert("Group successfully created!");
                            break;
                        case 400: alert("Invalid request!");
                            break;
                        case 401: alert("Session token has expired!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("createGroup status not found!");
                    }
                    break;
                case "deleteGroup": switch(data.status_code) {
                        case 2: alert("Lack privilege for request!");
                            break;
                        case 200: alert("Successfully deleted group!");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Session token has expired!");
                            break;
                        case 409: alert("User doesn't belong to group or group does not exist!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("deleteGroup status not found!");

                    }
                    break;
                case "getAllGroupsByUser": switch(data.status_code) {
                        case 200: alert("Success!");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Session token has expired!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("getAllGroupsByUser status not found!");
                    }
                    break;
                case "invitePersonToGroup": switch(data.status_code) {
                        case 98: alert("Person does not exist!");
                            break;
                        case 99: alert("Do not have permission to invite!");
                            break;
                        case 200: alert("Successfully invited person to group!");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Session token has expired!");
                            break;
                        case 409: alert("Conflict! Person may have an invite pending or already a member!");
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("invitePersonToGroup status not found!");
                    }
                    break;
                    case "editGroupName": switch(data.status_code){
                        case 2:   alert("You do not have privileges to change the group name!")
                            break;
                        case 201: alert("Successfully changed name!");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Not logged in!");
                            break;
                        case 409: alert("Group does not exist")
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("editGroupName status not found!");
                    }
                    break;
                    case "leaveGroup": switch(data.status_code){
                        case 200: alert("You have left the group");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Not logged in!");
                            break;
                        case 409: alert("Group does not exist")
                            break;
                        case 500: alert("Internal service error!");
                            break;
                        default: alert("leaveGroup status not found!");
                    }
                    break;
                case "removeMember": switch(data.status_code){
                        case 2: alert("No Privileges to remove");
                            break;
                        case 200: alert("Member deleted");
                            break;
                        case 204: alert("That member is not in this group");
                            break;
                        case 400: alert("Bad request!");
                            break;
                        case 401: alert("Not logged in!");
                            break;
                        case 409: alert("Group does not exist")
                            break;
                        case 500: alert("Internal service error!");
                            break;

                        default: alert("removeMember status not found!");
                    }
                    break;
                default: alert("Status name not found!");
            }
        }
    };