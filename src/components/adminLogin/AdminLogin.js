import React, { useEffect, useState } from 'react'
import muLogo from "../../images/muLogo.png"
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Helmet from 'react-helmet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordIcon from '@mui/icons-material/Password';
import './adminLogin.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../utils/config.js';
import { useLocation } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import Cookies from 'js-cookie';


const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');
    console.log(userId)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await newRequest.post("/signin", {
                password,
                email,
            });

            localStorage.setItem("currentUser", JSON.stringify(response.data.userData));
            console.log(response.data.userData);
            console.log(response.data);
            Cookies.set('adminToken', response.data.token, { expires: 30 })
            navigate("/");
        } catch (error) {
            setError(error?.response?.data?.message); // do it conditionally
            console.log(error);
        }
    };
    useEffect(() => {
        setError(null);
    }, [email, password]);

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

                className='admin-login-container'>

                <div className="navbar">


                </div>
                <div className="main-container">
                    <img src={muLogo} alt="logo" />

                    <form
                        onSubmit={handleSubmit}
                        className="exchange-contact-wrapper">
                        <div className="exchange-contact-top-div">

                            <div className="exchange-contact-top-div-close-btn"
                                onClick={() => navigate(-1)}
                            >
                                <CloseIcon className='exchange-contact-top-close-btn' />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor='email' className="input-icon">
                                <ForwardToInboxIcon className='person-icon' />
                            </label>

                            <input type="email" placeholder='Email' id='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor='password' className="input-icon">
                                <PasswordIcon className='person-icon' />
                            </label>
                            <span>
                                <input type={!showPassword ? "password" : "text"} placeholder='Password' id='password'

                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                {/* < className='person-icon' /> */}
                                {showPassword ? <VisibilityIcon className='person-icon' onClick={() => setShowPassword(false)} />
                                    : <VisibilityOffIcon className='person-icon' onClick={() => setShowPassword(true)} />}
                            </span>
                        </div>

                        {error && (
                            <div className="signup_error_div"
                            >
                                <div className="signup_error_div_text"
                                    style={{
                                        color: "red", textAlign: "center",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="bottom-container">
                            <button type="submit">Login</button>
                            {/* <p
                                onClick={handleForgetPassword}
                            >Forget Password</p> */}
                        </div>




                    </form>
                </div>

            </div >
        </>
    )
}

export default AdminLogin