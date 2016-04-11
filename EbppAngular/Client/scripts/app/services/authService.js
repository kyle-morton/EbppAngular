//3 factories into 1 angular service
angular.module('authService', [])


//login, gets info
//$http for api call, $q for returning promise objects
//AuthToken factory to manage tokens
.factory('Auth', function ($http, $q, AuthToken) {

    //create factory to return
    var authFactory = {};

    //handle login
    authFactory.login = function (username, password) {
        return $http({
            method: 'POST',
            url: host + '/token',
            data: $.param({ grant_type: "password", username: username, password: password }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    };

    //handle log out
    authFactory.logout = function () {        
        AuthToken.setToken(); //clear token
    };

    //check if logged in
    authFactory.isLoggedIn = function () {
        var loggedIn = false;
        if (AuthToken.getToken()) 
            loggedIn = true;
        return loggedIn;
    };

    authFactory.getUser = function () { //get current user info
        //if logged in, send api request with current token
        if (AuthToken.getToken()) { 
            return $http.get(apiHost + 'user/GetUserDetails/', { cache: true });
        } else { //return generic promise object stating error message
            return $q.reject({ message: 'User has no token.' });
        }
    };

    return authFactory;

})

//factory for token handling
// inject $window to store token client-side in local-storage
.factory('AuthToken', function ($window) {

    var authTokenFactory = {};

    //get token from local-storage
    authTokenFactory.getToken = function () {
        return $window.localStorage.getItem('token'); //use 'token' as key to get value
    };

    //set token or clear token
    //if token passed, set. if none, clear.
    authTokenFactory.setToken = function (token) {
        if (token) $window.localStorage.setItem('token', token);
        else  $window.localStorage.removeItem('token', token);
    };

    //set the token or clear the token
    return authTokenFactory;

})

//used to integrate tokens into requests
.factory('AuthInterceptor', function ($q, $location, AuthToken) {

    var interceptorFactory = {};

    //attach token to every outgoing API request
    //This will run on all HTTP requests
    interceptorFactory.request = function (config) { //config is for each req
        var token = AuthToken.getToken(); //fetch token
        if (token)//if exists, set header
            config.headers['Authorization'] = 'bearer ' + token;
        return config;
    };

    interceptorFactory.requestError = function (rejection) {
        return $q.reject(rejection);
    };

    interceptorFactory.response = function (response) {
        return response;
    };

    //redirect to login if token not authenticated
    //Used if get 403 response (not auth)
    interceptorFactory.responseError = function (response) {
        console.log("RESPONSE ERROR: " + JSON.stringify(response));
        if (response.status == 400 && response.error == 'invalid_grant') 
            AuthToken.setToken(); //clear token
        if (response.status == 401) {
            AuthToken.setToken(); //clear token
            $location.path('/login'); //redirect to login view
        }

        return $q.reject(response);
    };

    return interceptorFactory;

});