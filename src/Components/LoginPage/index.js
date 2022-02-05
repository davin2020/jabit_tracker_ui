import React from "react";
// import './style.css';
import HomepageHeader from "../HomepageHeader";
//Redirect has been replaced with Navigate
import { Link, Navigate } from "react-router-dom";
// import UserContext from "../../UserContext";


// import { Navigate } from "react-router-dom";

// return (
//   <Navigate to="/dashboard" replace={true} />
// )

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			learners: [],
			usernameValue: "",
			passwordValue: ""
		}
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeUsername(event) {

		this.setState({
			usernameValue: event.target.value,
		});
	}

	handleChangePassword(event) {
		this.setState({
			passwordValue: event.target.value
		});
	}


	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.usernameValue);
		alert('A name was submitted: ' + this.state.passwordValue);
		event.preventDefault();
	}

	handleClick = () => {
		this.setState({
			redirect: false
			// loggedIn: false
		})
	}



//functions go here
	startLogin = (event) => {
		event.preventDefault();
		//get vars from form
		let inputUsername = this.state.usernameValue;
		let inputPassword = this.state.passwordValue;
		console.log('HELLO ' + inputUsername);

		//check this stuff
		//fyi variables in query MUST be inside "" otherwise browser thinks its not a string & wont compile/render!
		const queryString = `
			mutation {
				loginEmailAddress(email: "${inputUsername}", password: "${inputPassword}" ){
					fullname
					email
					dream_job
					motivation
					total_points
					access_token
					}
				}
			`;

		//fetch one user
		fetch('http://localhost:4033/graphql', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({query: queryString})
		}).
		then((response) => {
			return response.json()
		})
			.then((dataObject) => {
				//need to cheeck if whats returned is an error or valid user?
				if (!dataObject.errors) {

//clear previous local storage before setting state for new user!
					localStorage.clear();
					localStorage.setItem('username', inputUsername );
					localStorage.setItem('email', inputUsername );

					localStorage.setItem('access_token', this.state.userToken);

					this.setState({
						//migh give errors?
						// userToken: dataObject.data.email.access_token,
						learners: dataObject.data.email,
						redirect: true
					})

					//Try to put access token in local storage so can get it later


					// Need to only redirect if user token matches!
					//this is not actually redirecting, its actualy line 130!
					return dataObject.data;
					// return <Redirect to={{pathname: '/user'}} />
				}
				//ELSE theres some issues with the data returned from the query
				else {
				}
			})
	}


	//REMINDER it doent like comments within this render() block !

	render() {
		return (
			<div>
			<HomepageHeader />
            <div className="bodyContent">

				<div className="loginForm">
					<form onSubmit={this.handleSubmit}>
						<h2>Log In</h2>
                    	<input className="loginInputs" id="inputUsername" name="inputUsername" type="text" placeholder="Username:" value={this.state.usernameValue} onChange={this.handleChangeUsername} ></input>
                    	<input className="loginInputs" id="inputPassword" name="inputPassword" type="password" placeholder="Password:" value={this.state.passwordValue} onChange={this.handleChangePassword} ></input>

						<div className="loginPageButtons">
						{/* 
				        JSX React comment here 
				        */}
						<button className="loginButton" onClick={ this.startLogin }>Submit</button>
						
							{(this.state.redirect) ? <Navigate to={{
								pathname: '/dashboard',
								state: { userToken: localStorage.getItem('access_token') }
							}} /> : "" }

		
							
						</div>
					</form>
				</div>
            </div>
			</div>
		)
	}
}
export default LoginPage;

// <div className="createAccountButton">
	// <Link to="/createaccount">CREATE ACCOUNT</Link>
// </div>