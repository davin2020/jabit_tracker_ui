import React from "react";
// import './style.css';
// import { Link, Redirect } from "react-router-dom";
//Redirect has been replaced with Navigate
import { Link, Navigate } from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNewEmail: "",
            inputNewPassword: "",
            inputNewFullname: "",
            inputNewDreamJob: "",
            inputNewMotivation: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

    }

    validateEmail = (submittedEmail) => {
        // return true;
        let validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (submittedEmail.match(validEmail)) {
            return true
        } else {
            alert("Email does not meet requirements")
            return false;
        }
    }

    validatePassword = (submittedPassword) => {
        // return true;
        let validPassword = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/);

        if (submittedPassword.match(validPassword)) {
            return true
        } else {
            alert("Password does not meet requirements")
            return false;
        }
    }
    //other validatoin coudl go here

    formSubmission = (e) => {
        e.preventDefault()

        let validE = this.validateEmail(e.target[0].value)
        let validP = this.validatePassword(e.target[1].value)

        if (validE && validP) {

            //add user to db then  redirect to next page?

            let inputEmail = this.state.inputNewEmail;
            let inputPassword = this.state.inputNewPassword;
            let inputFullname = this.state.inputNewFullname;
            let inputDreamJob = this.state.inputNewDreamJob;
            let inputMotivation = this.state.inputNewMotivation;

            //unterminated string means missing doubel quotes ! must always be an even number
            const queryStringAddUser = `
                mutation {
                    addUser (
                        email: "${inputEmail}", 
                        fullname: "${inputFullname}", 
                        password: "${inputPassword}", 
                        dream_job: "${inputDreamJob}",
                        motivation: "${inputMotivation}" ) {
                            _id
                            fullname
                            password
                            dream_job
                            motivation
                            total_points
                            access_token
                        }
                }
                `;

            fetch('http://localhost:4033/graphql', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: queryStringAddUser})
            }).then((response) => {
                console.log('DORY ');
                return response.json()
            })
            .then((dataObject) => {

                //need to cheeck if whats returned is an error or valid user?
                console.log('dataobject data ');
                console.log(dataObject.data);
                console.log(dataObject.data.addUser.access_token);

                if (!dataObject.errors) {
                    localStorage.clear();

                    localStorage.setItem('email', inputEmail);
                    // localStorage.setItem('access_token', this.state.userToken);
                    localStorage.setItem('access_token', dataObject.data.addUser.access_token);
                    
                    console.log('local storage email ' + inputEmail);
                    console.log('local storage token ' + this.state.userToken);
                    //does this need to match login page state, so dashboar can get user out ok then  dispaly ?
                    this.setState({
                        userToken: dataObject.data.addUser.access_token,
                        newUser: dataObject.data.addUser,
                        currentUserEmail: dataObject.data.email,
                        redirect: true
                    })

                    // newUser.access_token = token;
                    return dataObject.data;
                }

                //ELSE theres some issues with the data returned from the query
                else {
                    //update alert or similar
                    let customError = dataObject.errors[0].message
                    console.log('ERROR w form ' + customError);
                    // alert(customError);

                    return false;
                }
            })
        }
    }

    render() {
        return (
            <div className="createUserForm">
                <form onSubmit={this.formSubmission}>

                    <h2>Register New User</h2>
                    <label>Email Address:
                    <input className="emailInput" type="text" placeholder="Email:" name="inputNewEmail"
                           value={this.state.inputNewEmail} onChange={this.handleInputChange}></input>
                    </label>
                    <br></br>

                    <label>Password: 
                    <input className="passwordInput" type="password" placeholder="Password:" name="inputNewPassword"
                           value={this.state.inputNewPassword} onChange={this.handleInputChange}></input>
                    </label>
                    <p className="requirementsHeader">Password must:</p>
                    <div className="requirementsText">
                        <p>+ Be between 6 to 20 characters</p>
                        <p>+ Contain at least one number</p>
                        <p>+ Contain at lease one Uppercase and Lowercase character</p>
                    </div>
                    <br></br>

                    <div>
                        <label>Fullname: 
                        <input className="usernameFullname" type="text" placeholder="Fullname" name="inputNewFullname"
                               value={this.state.inputNewFullname} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    {/*
                    <p className="requirementsHeader">Username must:</p>
                    <div className="requirementsText">
                        <p className="requirementsText">+ Be between 1 and 14 characters</p>
                        <p className="requirementsText">+ Be unique (not already taken)</p>
                    </div>
                */}

                    <label>Whats Your Dream Job? (Optional)</label>
                    <textarea placeholder="Max 500 characters" name="inputNewDreamJob" value={this.state.inputNewDreamJob}
                              onChange={this.handleInputChange}></textarea>

                    <br></br>
                    <label>Whats Your Motivation to get this Job? (Optional)</label>
                    <textarea placeholder="Max 500 characters" name="inputNewMotivation" value={this.state.inputNewMotivation}
                              onChange={this.handleInputChange}></textarea>


                    <div className="createAccountButtonContainer">
                        {/*<Link to="/dashboard" className="confirmFormSubmit" type="submit">SUBMIT</Link> 
                        Added IMP LINE ABOUT getting userToken but where is it beign set?
                        */}
                        <button type="submit" value="Submit" className="confirmFormSubmit">SUBMIT</button>
                        {(this.state.redirect) ? <Navigate to={{
                            pathname: '/dashboard',
                            state: { userToken: localStorage.getItem('access_token') }
                        }}/> : ""}

                        <Link to="/login" className="cancelFormSubmit">CANCEL</Link>
                    </div>
                </form>
            </div>
        )
    }

}

export default RegisterPage;