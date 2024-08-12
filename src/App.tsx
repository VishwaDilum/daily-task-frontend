import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/signup';
import SignIn from './components/signin';
import Pass from './components/forgotpass';
import Profile from './components/profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Cookies from 'js-cookie';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const cookieToken = Cookies.get('token');

  const verifyToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/verifytoken", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: cookieToken }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        console.log("Token not valid");
      }
    } catch (error) {
      console.error("Error verifying token:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run token verification before rendering routes
  if (loading) {
    verifyToken(); // This will cause the token verification to run on every render which is not ideal
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />

        <Route
          path="/home"
          element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />}
        />

        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/home" /> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/forgotpassword" element={<Pass />} />

        <Route
          path="/profile"
          element={<PrivateRoute component={Profile} isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
