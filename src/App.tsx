import React from 'react'; // Import React if you're using JSX
import './App.css';
import Side from "../src/components/left-side"; // Assuming Side is the default export from left-side
import {} from 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'><Side></Side></div>
        <div className='col-3'></div>
        <div className='col-3'></div>
        <div className='col-3'></div>
      </div>
    </div>
  );
}

export default App;

