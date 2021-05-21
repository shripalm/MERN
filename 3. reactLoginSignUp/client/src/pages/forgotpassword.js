import React, { useEffect, useState } from 'react'
import axios from 'axios'
import laptop from '../Images/laptop.jpg'
import { Link } from 'react-router-dom'

function forgot() {
    return (
        <div className="main-container">
            <div className="formcontent">
                <h2 className="form-title">Forgot Password</h2>
                <form className="form-register">
                    <input type="text" placeholder="Id" />
                    <input type="password" placeholder="Confirm Password" />


                    <button className="forgotsubmit">Submit</button>

                    <div className="forgot">
                        <span className="login"><Link to="/login">Login</Link></span>
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

export default forgot;