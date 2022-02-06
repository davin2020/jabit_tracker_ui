import logo from './logo.svg';
import './App.css';
import HomepageHeader from "./Components/HomepageHeader"
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* 
        comment here <HomepageHeader /> 
      
        <img src={logo} className="App-logo" alt="logo" />
        */}

        <h1>Jabit Tracker</h1>

        <LoginPage />

        <p>END</p>

      </header>
    </div>
  );
}

export default App;
