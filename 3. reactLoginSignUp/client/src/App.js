import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/login';
import SignUp from './pages/register';
import Forgot from './pages/forgotpassword'
import './App.css'



const App = () => {
  return <>
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <SignUp />
        </Route>
        <Route path="/forgotpassword">
          <Forgot />
        </Route>
      </Switch>
    </Router>
  </>
}

export default App;