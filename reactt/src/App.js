import react, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const apiUrl = "http://localhost:5000/"
    const [functionality, setFunctionality] = useState('register')
    const [message, setMessage] = useState('')
    const [rFirstname, rSetFirstname] = useState('')
    const [rLastname, rSetLastname] = useState('')
    const [rEmail, rSetEmail] = useState('')
    const [rPassword, rSetPassword] = useState('')
    const [lEmail, lSetEmail] = useState('')
    const [lPassword, lSetPassword] = useState('')
    function login(e) {
        e.preventDefault();
        axios.post(apiUrl+'login', {
            email: lEmail,
            password: lPassword
        }).then(res => {
            if(res.data.success) {
                setMessage('Hey man! your id is '+res.data.msg.id)
                document.getElementById('message').style.color = "white"
                rSetFirstname("")
                rSetLastname("")
                rSetEmail("")
                rSetPassword("")
                lSetEmail("")
                lSetPassword("")
            }
            else {
                setMessage(res.data.msg)
                document.getElementById('message').style.color = "black"
            }
        }).catch(err => {
            console.log(err);
        })
    }
    function register(e) {
        e.preventDefault();
        axios.post(apiUrl+'registration', {
            firstname: rFirstname,
            lastname: rLastname,
            email: rEmail,
            password: rPassword
        }).then(res => {
            if(res.data.success) {
                setMessage(res.data.msg)
                document.getElementById('message').style.color = "white"
                rSetFirstname("")
                rSetLastname("")
                rSetEmail("")
                rSetPassword("")
                lSetEmail("")
                lSetPassword("")
            }
            else {
                setMessage(res.data.msg)
                document.getElementById('message').style.color = "black"
            }
        }).catch(err => {
            console.log(err);
        })
    }
    if (functionality == 'register') {
        return (
            <div className="container">
                <span className="title">Register</span>
                <form onSubmit={(e)=>{register(e)}}>
                    <div className="inputs">
                        <input type="text" placeholder="Enter Firstname" value={rFirstname} onChange={e => {rSetFirstname(e.target.value)}} />
                        <input type="text" placeholder="Enter Lastname" value={rLastname} onChange={e => {rSetLastname(e.target.value)}} />
                        <input type="email" placeholder="Enter Email" value={rEmail} onChange={e => {rSetEmail(e.target.value)}} />
                        <input type="password" placeholder="Enter Password" value={rPassword} onChange={e => {rSetPassword(e.target.value)}} />
                    </div>
                    <p id="message">{message}</p>
                    <span>Want to <i onClick={()=>{setFunctionality('login'); setMessage('')}}>login</i>?</span>
                    <input type="submit" value="Register" />
                </form> 
            </div>
        );
    }
    else if (functionality == 'login') {
        return (
            <div className="container">
                <span className="title">Login</span>
                <form onSubmit={(e)=>{login(e)}}>
                    <div className="inputs">
                        <input type="email" placeholder="Enter Email" value={lEmail} onChange={e => {lSetEmail(e.target.value)}} />
                        <input type="password" placeholder="Enter Password" value={lPassword} onChange={e => {lSetPassword(e.target.value)}} />
                    </div>
                    <p id="message">{message}</p>
                    <span>Want to <i onClick={()=>{setFunctionality('register'); setMessage('')}}>register</i>?</span>
                    <input type="submit" value="Login" />
                </form> 
            </div>
        );
    }
}

export default App;