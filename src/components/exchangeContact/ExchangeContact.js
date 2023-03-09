import React, { useEffect, useState } from 'react'
import muLogo from "../../images/muLogo.png"
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import PhoneIcon from '@mui/icons-material/Phone';
import Helmet from 'react-helmet';
import './exchangeContact.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../../utils/config.js';
import { saveContact } from '../../utils/saveContact';
const ExchangeContact = () => {
    const navigate = useNavigate()
    const url = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get("userId");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const first = async () => {
            await axios
                .get(`${baseUrl}/get-user?userId=${urlId}`)
                .then(response => {
                    response.data.date = response.data.date.substring(0, 10);
                    setUser(response.data);
                    setIsLoading(false);

                }
                )
                .catch(error => console.log(error));
        }
        first();
    }, [urlId])


    const handleSubmit = (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        axios.post(`${baseUrl}/add-contact`, {
            userId: urlId,
            name,
            email: email ? email : '',
            phone
        }).then(response => {
            alert('Contact sent successfully')
            // empty input fields
            e.target.name.value = '';
            e.target.email.value = '';
            e.target.phone.value = '';
        }).catch(error => {
            console.log(error)
            alert('Something went wrong')
        }
        )
    }





    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </Helmet>
            <>

                {isLoading ? (
                    <div className="loading">
                        loading...
                    </div>
                ) : (

                    <div className='exchange-contact-container'>

                        <div className="navbar">
                            <div className="close-btn">
                                <p
                                    style={{
                                        color:
                                            user?.selectedColor && user.selectedColor,
                                        cursor: 'pointer'
                                    }}

                                    onClick={() => navigate(-1)}
                                >close</p>
                            </div>

                        </div>
                        <div className="main-container">
                            <img src={muLogo} alt="logo" className='muLogo' />

                            <form onSubmit={handleSubmit}
                                className="exchange-contact-wrapper">
                                <div className="exchange-contact-top-div">
                                    <div className="exchange-contact-top-div-text">
                                        Exchange Contact
                                    </div>
                                    <div className="exchange-contact-top-div-close-btn"
                                        onClick={() => navigate(-1)}
                                    >
                                        <CloseIcon className='exchange-contact-top-close-btn' />
                                    </div>
                                </div>
                                <div className="exchange-contact-middle-div">
                                    I would also like to get in touch with you.
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor='name' className="input-icon">
                                        <PersonIcon className='person-icon' />
                                    </label>

                                    <input type="text" placeholder='Name' id='name' required />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor='email' className="input-icon">
                                        <ForwardToInboxIcon className='person-icon' />
                                    </label>

                                    <input type="email" placeholder='Email (optional)' id='email' />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor='phone' className="input-icon">
                                        <PhoneIcon className='person-icon' />
                                    </label>

                                    <input type="text" placeholder='Phone' id='phone' required />
                                </div>

                                <div className="bottom-container">
                                    <p>Privacy Policy</p>
                                    <button
                                        style={{
                                            backgroundColor:

                                                user?.selectedColor ? user.selectedColor : '#000000',
                                            cursor: 'pointer'
                                        }}

                                        type='submit'
                                    > Send Contact</button>
                                </div>
                            </form>
                        </div>

                    </div >
                )}
            </>
        </>
    )
}

export default ExchangeContact