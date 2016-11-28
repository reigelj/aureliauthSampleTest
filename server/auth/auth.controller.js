'use strict';
// TODO: Clean code, remove comments (Currently placeholder to demonstrate a db connection)
var _ = require('lodash');
var Entity = require('./user.model.js');
var jwt = require('jwt-simple');
var authUtils = require('./authUtils');
var User = require('./user.model.js');
var request = require('request');
exports.signup = function (req, res) {
    console.log("req body " + req.body.email);
    // Entity.findOne({email: req.body.email}, function (err, existingUser) {
    //     if (existingUser) {
    //         return res.status(409).send({message: 'Email is already taken'});
    //     }
    //     var user = new Entity({
    //         displayName: req.body.displayName,
    //         email: req.body.email,
    //         password: req.body.password
    //     });
    //     user.save(function () {
    //         return res.status(201).json({token: authUtils.createJWT(user)});
    //     });

    // });

    return res.status(401).send({ message: 'Wrong email and/or password' });
    // return res.status(201).json({token: authUtils.createJWT(req.body)});
};
// public override Task MatchEndpoint(OAuthMatchEndpointContext context)
//     {
//         if (context.OwinContext.Request.Method == "OPTIONS" && context.IsTokenEndpoint)
//         {
//             context.OwinContext.Response.Headers.Add("Access-Control-Allow-Methods", new[] {"POST"});
//             context.OwinContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "accept", "authorization", "content-type" });
//             context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
//             context.OwinContext.Response.StatusCode = 200;
//             context.RequestCompleted();

//             return Task.FromResult<object>(null);
//         }

//         return base.MatchEndpoint(context);        }
exports.login = function (req, res) {
    console.log("Testing values " + req.body.email + "   and pass  " + req.body.password);
    console.log("Testing login");
    var clientId = req.body.email;
    var clientSecret = req.body.password;

    var authorizationBasic = new Buffer(clientId + ":" + clientSecret).toString('base64');
    console.log("Here is the authorization:  " + authorizationBasic);
    // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    // var request = new XMLHttpRequest();
    // request.open('POST', 'http://localhost:8081/cliensert', true);
    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    // request.setRequestHeader('Accept', 'application/json');
    // request.send();

    // request.onreadystatechange = function () {
    //     if (request.readyState == 4) {
    //     alert(request.responseText);
    //     }
    // };

    // var clientId="my-trusted-client";

    //TODO: Edit spring to connect to server directly? Currently, direct calls are unauthorized and client is required

    //login to client
    // var params = {
    //     username: 'user2',
    //     password: 'password2'
    // }
    var req = {
        url: 'http://localhost:8081/client',
        method: 'GET',
        // url: 'http://localhost:8080/login',
        // method: 'POST',
        headers: {
            Authorization: 'Basic ' + authorizationBasic,
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            Host: 'localhost:8081'
        }
        // formData: {
        //     'username': clientId,
        //     'password': clientSecret
        // },
    };
    request = require('request').defaults({ jar: true });
    request(req, callback);
    function callback(error, response, body) {
        var statusCode = response.statusCode;
        process.stdout.write("\n\nFirst call Request headers:   " + JSON.stringify(req.headers));
        console.log("Response headers:  " + JSON.stringify(response.headers));
        process.stdout.write("Spring Client error   " + error + "   Body:  " + JSON.stringify(body) + "\n Response " + JSON.stringify(response) + "\n\n\n\n\n");
        if (statusCode >= 200 && statusCode < 400) {
        }
        else {
            return res.status(response.statusCode).send({ message: "Error, status code " + response.statusCode });
        }

        //login to server
        // get the cookie, excluding ';path=...'
        // var myCookie = response.headers["set-cookie"][0]
        // myCookie = myCookie.substring(0, myCookie.indexOf(';'));
        var serverReq = {
            url: 'http://localhost:8080/oauth/authorize',
            method: 'POST',
            // url: 'http://localhost:8080/hello',
            // method: 'GET',
            headers: {
                Authorization: 'Basic ' + authorizationBasic,
                'Content-Type': 'application/json',
                Connection: 'keep-alive',
                Host: 'localhost:8080'
                // cookie: myCookie
            },
            formData: {
                user_oauth_approval: 'true'
            },
        };
        console.log("Server authorization:   " + authorizationBasic);
        request(serverReq, function (error, response, body) {
            // body = JSON.parse(body)
            // if (!error){
            //     error = body.error;
            // }
            var statusCode = response.statusCode;
            console.log("Second call Request headers:   " + JSON.stringify(serverReq.headers));
            console.log("Response headers:  " + JSON.stringify(response.headers));
            console.log("Spring Server error   " + error + "   Body:  " + JSON.stringify(body));
            // console.log("Response error" + JSON.stringify(response) + "\n\n\n")
            if (statusCode >= 200 && statusCode < 400) {
                // TODO: Insert secure database!! Replace clientID reference for oauth2 security (currently basicAuth, using email as ID)
                var user = new User();
                user.email = clientId;
                user.displayName = clientId.substring(0, clientId.indexOf('@'));
                return res.status(201).json({ token: authUtils.createJWT(user) });
            }
            else {
                return res.status(response.statusCode).send({ message: "Error, status code " + response.statusCode });
            }
        })
    };

    // Entity.findOne({email: req.body.email}, '+password', function (err, user) {
    //     if (!user) {
    //         return res.status(401).json({message: 'Wrong email and/or password'});
    //     }
    //     user.comparePassword(req.body.password, function (err, isMatch) {
    //         if (!isMatch) {
    //             return res.status(401).send({message: 'Wrong email and/or password'});
    //         }
    //       var user = new User();
    //   user.email = "jreigel@gmail.com";
    // var token = authUtils.createJWT(user);

    //     });
    // });
    // return res.status(401).send({message: 'Wrong email and/or password'});
    // return res.status(201).json({token: authUtils.createJWT(req.body)});
};

