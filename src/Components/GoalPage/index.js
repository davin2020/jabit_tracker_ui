import React from 'react';
import HomepageHeader from "../HomepageHeader";
// import './style.css'

//Redirect has been replaced with Navigate
import { Link, Navigate } from 'react-router-dom';
// import  UserContext from "../../UserContext";

const PROD_API_URL = 'https://davin-jabit-api.herokuapp.com/graphql';

class GoalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentToken: props.accessToken,
            // learners: [],
            currentUser: "",
            userid: "",
            phrase: "hello_world",
            newGoals: [],
            currentGoals: [],
        }
    }

    //try to pass props in from prev LoginPage,  but its undefined
    componentDidMount(props) {
        //this gets the exsiting name, which was set by the prev logged in user!
        //check token - why is props still undefined??
        // state: { userToken: localStorage.getItem('access_token') }
        console.log(props);
        if (localStorage.getItem('email')==null || (localStorage.getItem('access_token')==null)) {
            //redirecet to /home
            return <Navigate to="/login" />
        }

        let userEmail = localStorage.getItem('email') ;
        console.log('DASHBOARD the email is: ' + userEmail);
        // need to ask for ALL the fields that u want access to here!

        //ISSUE how to pass deta returned from one GQL quey to another query? esp if i cant nest queries?
        // goalsByUserid(userid: "${this.state.currentUser._id}") {
        //hard coded for Marty McFly for now
        // let temp = '61fc511f67cde45b3477dfd9'
        //W 9 FEB - THIS NOW WORKS OK
        let temp = localStorage.getItem('userid') ;
        console.log('goal userid: ' + temp)

        //try and gets stuff from state on loginpage - undefined, could use local storage for nwo and try getting stuff from state later
        console.log('checking this.state: ')
        console.log('checking this.state id: ' + this.state.currentUserid) 
        console.log('checking this.state email: ' + this.state.currentUserEmail) 
       

        // currentUserEmail: dataObject.data.email,
        // currentUserid: dataObject.data.loginEmailAddress._id,


        const queryStringGoals = `
            query {
                  goalsByUserid(userid: "${temp}") {
                    name
                    target_amount_goal
                    target_unit
                    target_amount_completed
                    points
                }
            }
            `;

        fetch(PROD_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({query: queryStringGoals})
        })
        .then((response) => {
            return response.json()
        })
        .then((dataObject) => {
        //need to verify token when getting  user out of api, in api repo!
        //jwt.verify(token)
            if (!dataObject.errors) {
                console.log('line ninety four')
                console.log('dataobject goals data ');
                console.log(dataObject.data);
                //what if there are no goals? below will be NULL
                console.log(dataObject.data.goalsByUserid[0].name);

                this.setState({
                    currentGoals: dataObject.data.goal,
                     // dataObject.data.user,
                    // currentUser.goals = dataObject.data.goal,
                    newGoals: dataObject.data.goalsByUserid,
                    phrase: "davin_hello",
                    phrase: dataObject.data.goalsByUserid[0].name

                })
                //BUG cannot read proeprty of undefined as i was calling this.setState instead of this.state!
                console.log(this.state.newGoals[0].name); 
                console.log(this.state.newGoals[0]); 
                // console.log(this.state.currentGoals[0].name);
            }
            else {
                    //TODO add form validation, but alert box works for now
                    let customError = dataObject.errors[0].message
                    console.log(customError)
                    // alert(customError);
                    return false;
                }
        })


    } // eof componentDidMount

    // CHECK  if usersid is nul beforE using it - eg Cast to ObjectId failed for value "null" (type string) at path "userid" for model "goals"

    render() {
        if ( localStorage.getItem('userid') === null || 
            localStorage.getItem('email') === null || 
            localStorage.getItem('access_token') === null || 
            localStorage.getItem('access_token') === undefined ) {
            //redirecet to /home
            return (<Navigate to="/login" />)
            // 61fc511f67cde45b3477dfd9 tango foxtrot
        }
        //below div was - <div className="userPageContent">
        else {
            //can declare data to render here but why?
            const reptiles = ['alligator', 'snake', 'lizard'];

            return (
                <div className="pageBodyContent">
                    <div>
                        <HomepageHeader /> 
                    </div>

                <div className="bioContentContainer dashboardContainer">
                    {/*  
                    BUG fullnmae is missing here - as im not gettgin the whole currentUser out of the DB 
                    CSS BUG - words are cut off if larger than parent div - cos it was counting Dashboard + email address as one word and keeping all the chars together on one line!
                    */}
                    <h1 className="usernameHeader">Dashboard: <wbr></wbr> 
                         
                        {localStorage.getItem('email')}
                    </h1>

                        <details open>
                            <summary id="myGoals">
                                <h2 className="section__title">Goals</h2>
                            </summary>
                                <div className="section_parent"> 
                                    <div className="section_child">
                            {/* 
                            <div className="box_basic_top accent_bkg">
                                <h3>stuff</h3>
                            </div>
                            */}
                            <div className="box_basic_top">
                                
   
                                {/* 
                                <h3 className="bioHeader">Goals will appear here:</h3>

                                HOW TO ACTUALLY RENDER AN ARRAY IN REACT w sibling components! - https://www.g2i.co/blog/understanding-the-objects-are-not-valid-as-a-react-child-error-in-react

                                    {this.state.newGoals.map((goal) => (
                                    <>
                                    <h4>{goal.name} </h4>
                                    <p>Target Amount: {goal.target_amount_goal} {goal.target_unit}, worth {goal.points}  points each - </p>
                                    <p>Completed Amount: {goal.target_amount_completed} </p>
                                    </>
                                    ) ) }

                                     //this renders but gives warning in console - react-jsx-dev-runtime.development.js:117 Warning: Each child in a list should have a unique "key" prop.
                                    <div>
                                    {this.state.newGoals.map((goal, key) => (
                                        <>
                                        <h4>{goal.name} </h4>
                                        <p key={key}>Target Amount: {goal.target_amount_goal} {goal.target_unit}, worth {goal.points}  points each - </p>
                                        <p>Completed Amount: {goal.target_amount_completed} </p>
                                        </>
                                        ) ) }
                                    </div>

                                */}


                                <div>
                                {this.state.newGoals.map((goal, key) => (
                                    <React.Fragment key={key}>
                                    <h4>{goal.name} </h4>
                                    <p>Target Amount: {goal.target_amount_goal} {goal.target_unit}, worth {goal.points}  points each - </p>
                                    <p>Completed Amount: {goal.target_amount_completed} </p>
                                    </React.Fragment>
                                    ) ) }
                                </div>


                                <p className="bioContent">
                                 
                                    {/* ISSUE - NONE OF THESE OPTIONS WORK TO RENER ARRAYS

                                        {React.Children.toArray(this.state.newGoals)}

                                        <React.Fragment><h4>{this.state.newGoals[0]}</h4> </React.Fragment>

                                        How t orender array items in JSX React?
                                        <h4>{this.state.newGoals[0].name}</h4>

                                        ISSUE not working yet
                                           {this.state.newGoals[0].name}
                                        this.state.newGoals[0].name
                                    {this.state.currentGoals[0].name}
                                    for each item in array of newGoals
                                    name
                                    target_amount_goal
                                    target_unit
                                    target_amount_completed
                                    points

                                    LISTS IN JSX react
                                    <ol>
                                      {reptiles.map(reptile => (
                                        <li key={reptile}>{reptile}</li>
                                      ))}
                                    </ol>
                                    
                                    //ths does work
                                    {this.state.phrase}

                                    */}
                                </p>

                                

                            </div>
                        </div>
                    </div>

                </details>

                <Link to="/dashboard"><h2 className="section__title">View Profile</h2></Link>
                </div>

            </div>
            )
        }
    }

}

export default GoalPage;