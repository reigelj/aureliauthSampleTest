import { inject } from 'aurelia-framework';
import { AuthService } from 'aurelia-auth';
@inject(AuthService)

export class Signup {
	constructor(auth) {
		this.auth = auth;
	}
	heading = 'Sign Up';

	email = '';
	password = '';
	displayName = '';

	signupError = '';

	signup() {
		return this.auth.signup(this.displayName, this.email, this.password)
			.then((response) => {
				console.log("signed up");
			})
			.catch(error => {
				this.signupError = "Unable to sign up. Please check your username/password and try again later.";
			});

	}
}
