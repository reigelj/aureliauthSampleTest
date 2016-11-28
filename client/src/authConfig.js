var configForDevelopment = {
	loginRedirect: '/#welcome',
	// Our Node API is being served from localhost:3001
	// baseUrl: 'http://localhost:8081',
	// // The API specifies that new users register at the POST /users enpoint.
	// signupUrl: 'users',
	// // Logins happen at the POST /sessions/create endpoint.
	// loginUrl: 'client',
	// headers: {
	// 			// 'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
    //             'Access-Control-Allow-Origin': "*",
    //             'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept",
    //             'Authorization': 'Basic ' + btoa("justin:password"),
    //             'Content-Type':'application/x-www-form-urlencoded'
	// 		},
	// The API serves its tokens with a key of id_token which differs from
	// aureliauth's standard.
	//TODO: VERIFY THAT Client name should be here
	// <sec:csrfInput />
	// tokenName: '_csrf',
	providers: {
		identSrv: {
			name: 'identSrv',
			url: '/auth/identSrv',
			authorizationEndpoint: 'http://localhost:22530/connect/authorize', //if this ends with slash --> game over
			redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
			scope: ['profile', 'openid'],

			responseType: 'code',


			scopePrefix: '',
			scopeDelimiter: ' ',
			requiredUrlParams: ['scope', 'nonce'],
			optionalUrlParams: ['display', 'state'],
			display: 'popup',
			type: '2.0',
			clientId: 'jsclient',

			popupOptions: { width: 452, height: 633 }
		},

		google: {
			//responseType :'code',
			clientId: '791046018749-2tudqi6rodvobnveo275ederj7iot3hq.apps.googleusercontent.com',
			state: function () {
				var val = ((Date.now() + Math.random()) * Math.random()).toString().replace(".", "");
				return encodeURIComponent(val);
			}
		}
		,
		linkedin: {
			clientId: '778mif8zyqbei7'
		},
		facebook: {
			clientId: '1452782111708498'
		}
	}
};

var configForProduction = {
	providers: {
		google: {
			clientId: '791046018749-2tudqi6rodvobnveo275ederj7iot3hq.apps.googleusercontent.com'
		}
		,
		linkedin: {
			clientId: '7561959vdub4x1'
		},
		facebook: {
			clientId: '1653908914832509'
		}

	}
};
var config;
if (window.location.hostname === 'localhost') {
	config = configForDevelopment;
}
else {
	config = configForProduction;
}


export default config;
