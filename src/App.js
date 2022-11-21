import './App.css';
import React from "react";
import NavBar from './Components/NavBar/NavBar';
import Form from './Components/Form/Form';
import FireData from './Components/DataBaseData/FireData';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Form/>
      <FireData/>
    </div>
  );
}

export default App;
