import { AuthService } from 'aurelia-auth';
import { inject } from 'aurelia-framework';
@inject(AuthService)

export class Login {
	constructor(auth) {
		this.auth = auth;
	};

	heading = 'Login';

	email = '';
	password = '';
	loginError = '';
	login() {

		//TODO: Replace this with the html response given by the client? Remove it all and go straight to the server?
		var creds = "grant_type=password&email=" + this.email + "&password=" + this.password;
		var confirmation = confirm("Before logging in, do you authorize the client to access your trusted resources?");
		if (confirmation == true) {
			return this.auth.login(this.email, this.password)
				// return this.auth.login(creds)
				.then(response => {
					console.log("success logged " + response);
				})
				.catch(err => {
					this.loginError = "Unable to sign up. Please check your username/password and try again later.";
					// err.json().then(function (e) {
					// 	console.log("login failure : " + e.message);
					// });

				});
		}
		else{
			this.loginError = "You haved declined to login";
			return false;
		}
	}

		authenticate(name) {
			console.log("Authenticating?");
			return this.auth.authenticate(name, false, null)
				.then((response) => {
					console.log("auth response " + JSON.stringify(response));
				})
				.catch(error => {
					this.loginError = "Unable to sign up. Please check your username/password and try again later.";
				});

		}
	}
