import React from 'react'; // Import React if you're using JSX
import './App.css';
import Side from "../src/components/left-side"; // Assuming Side is the default export from left-side
import { } from 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from '@mui/icons-material';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Pass from './components/forgotpass';
import Test from './components/test';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Test></Test>}></Route> */}
        {/* <Route path='/' element={<SignIn></SignIn>}></Route> */}
        {/* <Route path='/signin' element={<SignIn></SignIn>}></Route> */}
        <Route path='/' element={<SignUp></SignUp>}></Route>
        <Route path='/forgotpassword' element={<Pass></Pass>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

