import React from 'react';
import HomepageHeader from "../HomepageHeader";

//Redirect has been replaced with Navigate
import { Route, Navigate } from 'react-router-dom';
// import  UserContext from "../../UserContext";

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentToken: props.accessToken,
            // learners: [],
            currentUser: ""
            // usernameState: ""
        }
    }

    //try to pass props in from prev LoginPage,  but its undefined
    componentDidMount(props) {
        //this gets the exsiting name, which was set by the prev logged in user!
        //check token - why is props still undefined??
        // state: { userToken: localStorage.getItem('access_token') }

        if (localStorage.getItem('email')==null || (localStorage.getItem('access_token')==null)) {
            //redirecet to /home
            return <Navigate to="/login" />
        }

        let userEmail = localStorage.getItem('email') ;
        console.log('DASHBOARD the email is: ' + userEmail);
        // need to ask for ALL the fields that u want access to here!
        const queryString = `
            query {
                user(email: "${userEmail}") {
                    _id
                    email
                    fullname
                    password
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
        })
        .then((response) => {
            return response.json()
        })
        .then((dataObject) => {
            //need to verify token when getting  user out of api, in api repo!
            //jwt.verify(token)
            this.setState({
            	currentUser: dataObject.data.user,
                // learners: dataObject.data.user,
                // usernameState: userEmail,
                // bioState: dataObject.data.user.bio,
                // dreamJobState:  dataObject.data.user.dream_job,
                // motivationState:  dataObject.data.user.motivation,
                // fullname:  dataObject.data.user.fullname,
                // total_points: dataObject.data.user.total_points
            })
        })

            //new stuff here - to get goals for current user
            
    } // eof componentDidMount

    render() {
        if (localStorage.getItem('email')==null) {
            //redirecet to /home
            return (<Navigate to="/login" />)
            // 61fc511f67cde45b3477dfd9 tango foxtrot
        }
        else {
            return (
                <div className="userPageContent">
                    <div>
                        <HomepageHeader /> 
                    </div>
                <h1 className="usernameHeader">Dashboard: {this.state.currentUser.fullname}</h1>

                <div className="bioContentContainer">

                    <h3 className="bioHeader">Email:</h3>
                    <p className="bioContent">
                        {this.state.currentUser.email}
                    </p>

                    <p className="bioContent">ID: 
                        {this.state.currentUser._id}
                    </p>

                    <h3 className="bioHeader">Fullname:</h3>
                    <p className="bioContent">
                        {/*    {this.state.currentUser.dream_job}
                    fyi cannnot use dataobject here - {dataObject.data.user.fullname}  */}
                        {this.state.currentUser.fullname}
                    </p>

                    <h3 className="bioHeader">Dream Job:</h3>
                    <p className="bioContent">
                        {/*    {this.state.currentUser.dream_job}*/}
                        {this.state.currentUser.dream_job}
                    </p>

                    <h3 className="bioHeader">Motivation:</h3>
                    <p className="bioContent">
                        {/*    {this.state.currentUser.dream_job}*/}
                        {this.state.currentUser.motivation}
                    </p>
                    
                    <h3 className="bioHeader">Total Points:</h3>
                    <p className="bioContent">
                        {/*    {this.state.currentUser.dream_job}*/}
                        {this.state.currentUser.total_points}
                    </p>
                </div>

            </div>
            )
        }
    }

}

export default DashboardPage;