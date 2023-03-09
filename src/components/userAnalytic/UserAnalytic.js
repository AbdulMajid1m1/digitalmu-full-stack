import React, { useEffect, useState } from 'react'
import './userAnalytic.scss'
import profile from "../../images/profile.jpg"
import AddIcon from '@mui/icons-material/Add';
import PhoneIcon from '@mui/icons-material/Phone';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import baseUrl from '../../utils/config.js';
import { useNavigate } from 'react-router-dom';
import { saveContact } from '../../utils/saveContact';

const UserAnalytic = () => {
  const url = window.location.href;
  // take user id from url general work for any url
  const urlId = url.substring(url.lastIndexOf("/") + 1, url.length);
  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseUrl}/get-user?userId=${urlId}`).then(response => {
      setUser(response?.data)
      setContacts(response?.data?.contacts)
      setIsLoading(false)
      // get contacts length

    }).catch(error => {
      if (error.response.status === 404) {
        console.log("user not found")
      }
      console.log(error)
    })
  }, [])
  const navigate = useNavigate()
  const handleClick = (contact) => {
    // call save contact function
    saveContact(contact?.name, contact?.email, contact?.phone, contact?.company, contact?.digitalmuUrl)
  }

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Helmet>

      {isLoading ? <div className="loading">Loading...</div> :

        (
          <>
            <div className="UserAnalyticNavbar">
              <div className="close-btn">
                <p
                  onClick={() => navigate(-1)}
                  style={{
                    cursor: "pointer",
                    color: user?.selectedColor,
                  }}
                >close</p>
              </div>

            </div>
            <div className="user-analytic-container">

              <div className="user-info-container">
                <div className="user-profile-container"
                  style={{
                    border: `3px solid ${user?.selectedColor}`,
                  }}
                >
                  <img src={user?.img1 || profile} alt="image" />
                </div>
                <div className="user-info">
                  <p style={{ fontWeight: "bolder" }}>{user?.name}</p>
                  <p>{user?.designation} </p>
                  {/* <p>Staff ID:  {user?.phone} */}
                  {/* <span
              className='digitalmuUrl'
              style={{ fontSize: '12px', fontWeight: 'normal', cursor: 'pointer' }}
            > {user?.digitalmuUrl}</span> */}
                  {/* </p> */}
                  <p>{user?.company}</p>


                </div>
              </div>
              <div className="user-second-row-container">
                <div className="left">
                  <h1>{user.taps}</h1>
                  <p>No of Tap</p>

                </div>
                <div className="right">
                  <h1>{
                    contacts.length
                  }</h1>
                  <p>Leads Captured</p>
                </div>
              </div>
              {/* <div className="other-btn-container">
          <p>Other Button</p>
          <h3> {user.otherButtom}</h3>
        </div> */}
              {
                contacts.map((contact) => {
                  return (
                    <div className="lead-container">
                      <div className="plus-icon-container"
                        onClick={() => handleClick(contact)}
                      >
                        <AddIcon className='addIcon' />
                      </div>
                      <div className="text-container">
                        <p>{contact.name}</p>
                        <div className="text-container-row">
                          <span>
                            <PhoneIcon className='Icon' />
                          </span>
                          <span>{contact.phone}</span>
                        </div>
                        {/* // if contact email is not null then show it */}

                        {contact.email && <div className="text-container-row">
                          <span>
                            <ForwardToInboxIcon className='Icon' />
                          </span>
                          <span>{contact.email}</span>
                        </div>}
                      </div>
                    </div>
                  )
                })}


            </div>
          </>

        )}

    </>
  )
}

export default UserAnalytic