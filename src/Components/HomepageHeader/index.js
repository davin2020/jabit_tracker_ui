import React from "react";
import './style.css'

class HomepageHeader extends React.Component {
    render() {
      return (
          //changed from class to className
          <div className="homepageHeader">
              <h1>Welcome to Jabit Tracker</h1>
              <h2>Job + Habit = Jabit Tracker.</h2>
          </div>
      )
    }
  }

  export default HomepageHeader