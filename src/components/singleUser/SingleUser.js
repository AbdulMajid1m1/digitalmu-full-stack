import React from 'react'
import './singleUser.scss'
// updateUser scss
import Modal from 'react-modal';
import KeyboardTabRoundedIcon from '@mui/icons-material/KeyboardTabRounded';
import muLogo from "../../images/muLogo.png";
import next from "../../images/next.png";
import Vector from "../../images/Vector.png";
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { saveContact, saveContact2, saveContactAndNavigate } from '../../utils/saveContact';
import baseUrl from '../../utils/config.js';
import backgroud from "../../images/background.png"
import singleBackground from "../../images/singleBackground.png"
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";
import twitter from "../../images/twitter.svg";
import tiktok from "../../images/tiktok.svg";
import youtube from "../../images/youtube.svg";



const SingleUser = () => {
    const navigate = useNavigate();
    // get paramters from url using react router dom
    const [img1, setImg1] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const url = window.location.href;
    // take user id from url general work for any url
    const urlId = url.substring(url.lastIndexOf("/") + 1, url.length);
    useEffect(() => {
        const first = async () => {
            await axios
                .get(`${baseUrl}/get-user?userId=${urlId}`)
                .then(response => {
                    response.data.date = response.data.date.substring(0, 10);
                    setUser(response.data);
                    setImg1(response.data.img1);
                    setIsLoading(false);
                }
                )
                .catch(error => console.log(error));
        }
        first();
    }, [urlId])

    const handleSaveContact = async () => {
        saveContact2(user?.name, user?.email, user?.phone, user?.company, user?.digitalmuUrl, urlId)
        // navigate(`/exchange-contact?userId=${urlId}&vcf=false`)
    };

    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, user-scalable=no" />
            </Helmet>

            {isLoading ? (
                <div>Loading...</div>
            ) : (

                <div className='single-user-container'>


                    <div className="backGroundImgcontainer">
                        <img src={backgroud} alt="" />
                    </div>

                    <div className='user-top-container'>
                        <div className='user-top-left'>

                            <div
                                onClick={
                                    () => navigate(`/exchange-contact?userId=${urlId}`)
                                }

                            >
                                <img src={next} className='next-icon' alt="icon" />
                            </div>
                        </div>
                        <div className='user-top-right'
                            onClick={() => navigate("/login?userId=" + urlId)}
                        >
                            <div
                                className='user-top-left-icon'
                                style={{ cursor: "pointer", }}
                            >
                                {/* <KeyboardTabRoundedIcon className='back-icon' /> */}
                                <img src={Vector}
                                    alt="icon"
                                    className='back-icon'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="single-user-data-container">

                        <div className="user-profile-container"
                            style={{
                                border: user?.selectedColor === "#009C4D" ? "4px solid #009C4D"
                                    : "4px solid #000000"
                            }}
                        >
                            <img src={img1 ? img1 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="profile"

                                onClick={openModal}
                            />
                        </div>

                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
                            <span className="img-span">
                                <img
                                    src={img1 ? img1 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                    alt="image"
                                    className="modal-image"
                                />

                                <span className="close-btn" onClick={closeModal}>
                                    &#10005;
                                </span>
                            </span>
                        </Modal>
                        <div className="user-name-and-title">
                            <h1>{user.name}</h1>
                            <h3>{user.designation}</h3>

                        </div>

                        <div className="save-btn-container">
                            <button className="save-btn"
                                style={{ backgroundColor: user?.selectedColor, cursor: "pointer" }}
                                onClick={handleSaveContact}
                            >Save Contact</button>
                        </div>
                        <div className="digitalmu-btn-container"
                            // on click navigate to digital mu link in new tab
                            onClick={() => window.open(user.digitalmuUrl, "_blank")}
                        >
                            <button
                                disabled={user?.digitalmuUrl ? false : true}
                                style={{
                                    backgroundColor: user?.digitalmuUrl ? user.selectedColor : "#BDBDBD",
                                    cursor: user?.digitalmuUrl ? "pointer" :
                                        "not-allowed"
                                }} className="digitalmu-btn">Digital MU</button>
                            <div className="btnBackground">
                                <img src={singleBackground} alt="" />
                                <img src={singleBackground} alt="" />
                                <img src={singleBackground} alt="" />
                                <img src={singleBackground} alt="" />

                            </div>
                        </div>
                        <div className="media-icons-container">
                            {user?.facebookUrl ? (<img src={facebook} alt="fb"
                                // on click navigate to facebook link in new tab
                                onClick={() => window.open(user.facebookUrl, "_blank")}
                            />) : ("")}
                            {user?.youtubeUrl ? (<img src={youtube} alt="yt"
                                onClick={() => window.open(user.youtubeUrl, "_blank")}
                            />) : ("")}
                            {user?.twitterUrl ? (<img src={twitter} alt="twitter"
                                onClick={() => window.open(user.twitterUrl, "_blank")}
                            />) : ("")}
                            {user?.tiktokUrl ? (<img src={tiktok} alt="tiktok"
                                onClick={() => window.open(user.tiktokUrl, "_blank")}
                            />) : ("")}
                            {/* <img src={instagram} alt="insta" /> */}
                        </div>

                        <div className="logo-and-text-container">
                            <div className="logo">
                                <img src={user.img2} alt="logo" />
                            </div>
                            <div className="logo-right-text">
                                <p>
                                    {user?.company ? user.company : ""}
                                </p>
                                <p>
                                    {user.address ? user.address : ""}
                                </p>
                            </div>
                        </div>
                        <div className="bottom-logo-container">
                            <p className="logo-text">
                                Powered By
                            </p>
                            <div className="bottom-logo">
                                <img src={muLogo} alt="logo" />
                            </div>
                        </div>
                        <div className="footer">
                            <div class="left-footer-div" style={{
                                borderBottomColor: (user?.selectedColor === "#000000" || user?.selectedColor === "#009C4D") ? "red"
                                    : (user?.selectedColor === "#0000FF" ? "lightgray"
                                        : (user?.selectedColor === "##FFA500" ? "000000" : "lightgray")
                                    )
                            }}   ></div>
                            <div class="right-footer-div" style={{ borderBottomColor: `${user?.selectedColor}` }}></div>
                        </div>
                        <div class="slanted-div"></div>
                    </div>

                </div>
            )}

        </>
    )
}

export default SingleUser