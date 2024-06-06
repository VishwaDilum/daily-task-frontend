import React from 'react'; // Import React if you're using JSX
import './App.css';
import Side from "../src/components/left-side"; // Assuming Side is the default export from left-side

function App() {
  function name(username: string) {
    return username + "ICET";
  }

  let username: string = "Dilum"; // Ensure consistent typing

  return (
    <div>
      <h1>Hi {name(username)} </h1>
      <Side title ="Bread" description ="Good Bread"></Side>
    </div>
  );
}

export default App;

