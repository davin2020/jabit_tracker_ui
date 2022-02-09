import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

//my stuff
// import HomepageHeader from "../HomepageHeader";
// import HomepageHeader from "./Components/HomepageHeader"
import LoginPage from "./Components/LoginPage";
import DashboardPage from "./Components/DashboardPage";
import RegisterPage from "./Components/RegisterPage";
import GoalPage from "./Components/GoalPage";

// In react-router-dom v6, "Switch" is replaced by routes "Routes - see https://reactrouter.com/docs/en/v6/upgrading/v5
// import { Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';

// NOT WORKING AS SOMETHING WRONG W DOTENV PACKAGE
// require('dotenv').config();
// console.log('ENV VARS URL ' + process.env.PROD_API_URL);
// console.log('ENV VARS PORT ' + process.env.PORT);

//protected routes here - if email or token is deleted from local storage, then other pages redirect to /login route
class Routing extends React.Component {
    render() {
        return (
                <Router>
                    <div className="mainBodyContainer">
                    {/* <HomepageHeader /> is atually part of LoginPage */}
                 
                        {/*must  have  nav here*/}
                        <Routes>
                        	{/*
                            <Route path="/" exact component={ LoginPage } />
                            <Route path="/login" exact component={ LoginPage } />
                            <Route path="/dashboard" exact component={ DashboardPage } />
                            */}
                            {/*<Route path="/user"  render={(props) =>  <UserPage {...props}/>} />*/}
                            
                            {/*
                            <Route path="/createaccount" exact component={ CreateAccountPage } />
                            <Route component={NotFound} />
                            */}

                            <Route path='/' element={<LoginPage/>} />
                            <Route path='/login' element={<LoginPage/>} />
                            <Route path='/register' element={<RegisterPage/>} />
                            <Route path='/dashboard' element={<DashboardPage/>} />
                            <Route path='/dashboard#myProfile' element={<DashboardPage/>} />
                            <Route path='/goals' element={<GoalPage/>} />
                        </Routes>
                    </div>
                </Router>
        )
    }
}

  //  add my content here, incl routes , can add multipel componenets 
ReactDOM.render(
  <React.StrictMode>
  	
    <Routing />

  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
