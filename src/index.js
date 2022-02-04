import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//my stuff
// import HomepageHeader from "../HomepageHeader";
import HomepageHeader from "./Components/HomepageHeader"
import LoginPage from "./Components/LoginPage";
import DashboardPage from "./Components/DashboardPage";

// In react-router-dom v6, "Switch" is replaced by routes "Routes - see https://reactrouter.com/docs/en/v6/upgrading/v5
// import { Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom';
import { Route, Link, BrowserRouter as Router, Routes} from 'react-router-dom';

//my routing here
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
                            <Route path='/dashboard' element={<DashboardPage/>} />
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
