import React, { useEffect, useState } from 'react'
import axios from 'axios'
import laptop from '../Images/laptop.jpg'
import { Link } from 'react-router-dom'

function Login() {
    const apiUrl = "http://localhost:5000/users/"
    const [message, setMessage] = useState('')
    const [lEmail, lSetEmail] = useState('')
    const [lPassword, lSetPassword] = useState('')

    function loginApi(e) {
        e.preventDefault();
        if(lEmail.trim().length < 4) {
            setMessage("Email must be greater than 4 letters")
            document.getElementById('message').style.color = "red"
        }
        else{
            axios.post(apiUrl+'login', {
                email: lEmail,
                password: lPassword
            }).then(res => {
                if(res.data.success) {
                    setMessage(res.data.msg)
                    document.getElementById('message').style.color = "green"
                    lSetEmail("")
                    lSetPassword("")
                }
                else {
                    setMessage(res.data.msg)
                    document.getElementById('message').style.color = "red"
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }


    return (
        <div className="main-container">
            <div className="formcontent">
                <h2 className="form-title">Member login</h2>
                <form onSubmit={(e)=>{loginApi(e)}}>
                    <input type="email" placeholder="Email"  value={lEmail} onChange={e => {lSetEmail(e.target.value)}} />
                    <input type="password" placeholder="password" value={lPassword} onChange={e => {lSetPassword(e.target.value)}} />
                    <p id="message">{message}</p>
                    <button type="submit" className="loginbutton">Login</button>

                    <div className="forgot">
                        <span className="forgotpass"><Link to="forgotpassword" >Forgot Password?</Link></span><span className="register"><Link to="/register">Register</Link></span>
                    </div>
                </form>
            </div>
            <div className="imagecontent">
                <img src={laptop} alt="laptop" />
                <h3 className="imagetitle">DIGITAL PRODUCTS <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;MARKET PLACE
                </h3>
                <h6 className="imagetitletwo">&nbsp;Your perfect place to <br />
                      buy and sell digital goods
                </h6>

            </div>
        </div>
    );
}

export default Login;
