import React, { useState } from 'react'
import muLogo from "../../images/muLogo.png"
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Helmet from 'react-helmet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordIcon from '@mui/icons-material/Password';
import './loginForm.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../utils/config.js';
import { useLocation } from 'react-router-dom';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    console.log(userId)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const phone = e.target.password.value;
        console.log(email, phone)
        // send post request to server to find-user and if user is found then redirect to user analysis page with user id
        // if user is not found then show error message
        const response = axios.get(`${baseUrl}/find-user?email=${email}&phone=${phone}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.data) {
                // redirect to user analysis page
                navigate(`/user-analytic/${response.data._id}`)
            } else {
                // show error message
                alert('User not found')
            }
        }).catch(err => {

            // if 404 error then show error message
            if (err.response.status === 404) {
                alert('User not found')

            } else {
                alert('Something went wrong')
                console.log(err)
            }
        })
    }

    const handleForgetPassword = () => {
        // show alter to to confirm if user wants to reset password
        const confirm = window.confirm('Are you sure you want to reset password?')
        if (confirm) {
            // send post request to server to reset password
            axios.post(`${baseUrl}/send-mail`, {
                email: "amj777999@gmail.com.com",
                userId: userId

            }).then(response => {
                alert('Email sent successfully')
            }).catch(err => {
                console.log(err)
                alert('Something went wrong')
            })
        }
    }

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </Helmet>

            <div

                className='login-container'>

                <div className="navbar">
                    <div className="close-btn">
                        <p
                            onClick={() => navigate(-1)}
                        >close</p>
                    </div>

                </div>
                <div className="main-container">
                    <img src={muLogo} alt="logo" className='muLogo' />

                    <form
                        onSubmit={handleSubmit}
                        className="exchange-contact-wrapper">
                        <div className="exchange-contact-top-div">
                            {/* <div className="exchange-contact-top-div-text">
                               
                            </div> */}
                            <div className="exchange-contact-top-div-close-btn"
                                onClick={() => navigate(-1)}
                            >
                                <CloseIcon className='exchange-contact-top-close-btn' />
                            </div>
                        </div>
                        {/* <div className="exchange-contact-middle-div">
                            I would also like to get in touch with you.
                        </div> */}

                        <div className="input-wrapper">
                            <label htmlFor='email' className="input-icon">
                                <ForwardToInboxIcon className='person-icon' />
                            </label>

                            <input type="email" placeholder='Email' id='email' />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor='password' className="input-icon">
                                <PasswordIcon className='person-icon' />
                            </label>
                            <span>
                                <input type={!showPassword ? "password" : "text"} placeholder='Password' id='password' />
                                {/* < className='person-icon' /> */}
                                {showPassword ? <VisibilityIcon className='person-icon' onClick={() => setShowPassword(false)} />
                                    : <VisibilityOffIcon className='person-icon' onClick={() => setShowPassword(true)} />}
                            </span>
                        </div>

                        <div className="bottom-container">
                            <button type="submit">Login</button>
                            <p
                                onClick={handleForgetPassword}
                            >Forget Password</p>
                        </div>
                    </form>
                </div>

            </div >
        </>
    )
}

export default LoginForm