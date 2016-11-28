import { AuthService } from 'aurelia-auth';
import { inject } from 'aurelia-framework';
@inject(AuthService)

export class Profile {
	constructor(auth) {
		this.auth = auth;
		this.profile = null;
	};
	activate() {
		// return this.http.fetch('http://localhost:8081/client', {
		// 	headers: {
		// 		'Authorization': 'Bearer ' + localStorage.getItem('id_token')
		// 	}
		// })
		// 	.then(response => {
		// 		this.randomQuote = response.content;
		// 	}).catch(error => {
		// 		console.log('Error getting quote');
		// 	});
		return this.auth.getMe()
			.then(data => {
				this.profile = data;
			});
	}
	heading = 'Profile';

	updateMe() {

		console.log("PROFILE UPDATE CALLED")
		// return this.auth.updateMe()
		// 	.then(() => this.auth.getMe())
		// 	.then(data => {
		// 		this.profile = data;
		// 	});;
		return this.auth.updateMe()
			.then(data => {
				this.profile = data;
			});
	}
	link(provider) {
		return this.auth.authenticate(provider, true, null)
			/*.then((response)=>{
				console.log("auth response " + response);
				return this.auth.getMe();
			})*/
			.then(() => this.auth.getMe())
			.then(data => {
				this.profile = data;
			})
			.catch(err => {
				console.log("profile failure");
			});
	}
	unlink(provider) {
		return this.auth.unlink(provider)
			/*.then((response)=>{
				console.log("auth response " + response);
				return this.auth.getMe();
			})*/
			.then(() => this.auth.getMe())
			.then(data => {
				this.profile = data;
			});;
	}
	email = '';
	password = '';

}
