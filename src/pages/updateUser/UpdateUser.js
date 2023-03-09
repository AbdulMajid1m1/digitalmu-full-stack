import "./UpdateUser.scss";
import Modal from "react-modal";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import baseUrl from '../../utils/config.js';
import Cookies from "js-cookie";
const New = ({ inputs, title, permission }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [img1, setImg1] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [img2, setImg2] = useState("");
  const [user, setUser] = useState({});
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  // take user id from url
  const url = window.location.href;
  // take user id from url general work for any url
  const urlId = url.substring(url.lastIndexOf("/") + 1, url.length);
  const accessToken = Cookies.get("adminToken");
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/check-auth`, {
          headers: {
            // get token from cookies access token
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIsLoading(false)
        console.log(response.data);


      } catch (error) {
        console.log(error);
        navigate("/admin-login");
        console.log("not authenticated");
      }

    };
    checkAuth();
  }, []);

  useEffect(() => {
    const first = async () => {
      await axios
        .get(`${baseUrl}/get-user?userId=${urlId}`)
        .then(response => {
          response.data.date = response.data.date.substring(0, 10);
          console.log(response.data);
          setUser(response.data);
          setImg1(response.data.img1);
          setImg2(response.data.img2);
        }
        )
        .catch(error => console.log(error));
    }
    first();
  }, [urlId])

  useEffect(() => {
    setImg1(user.img1);
    setImg2(user.img2);
  }, [user])





  const navigate = useNavigate();
  // get 
  const handleSubmit = async event => {
    setIsLoading(true);
    try {
      event.preventDefault();

      const form = new FormData();
      const updatedUser = {};
      //  check if updared image is same as previous image
      if (img1 !== user.img1) {
        form.append('img1', img1);
        updatedUser.img1 = img1;
      }
      if (img2 !== user.img2) {
        form.append('img2', img2);
        updatedUser.img2 = img2;
      }

      // check if checkbox is checked is same as previous value if not then update if user has clicked on active checkbox then active in status otherwise inactive
      if (event.target.active.checked) {
        form.append('status', 'active');
        updatedUser.status = 'active';
      } else {
        form.append('status', 'inactive');
        updatedUser.status = 'inactive';
      }


      inputs.forEach(input => {
        const name = input.name;
        const value = event.target[name].value;
        if (name === "selectedColor") {
          form.append(name, event.target[name].value);
          updatedUser[name] = event.target[name].value;
        }
        if (value !== user[name]) {
          form.append(name, value);
          updatedUser[name] = value;
        }
      });
      console.log(form);
      try {
        await axios.put(`${baseUrl}/update-user/${urlId}`, form);
        setUser(prevState => ({ ...prevState, ...updatedUser }));
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message)
      } finally {
        setIsLoading(false);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
    }

  };
  return (

    <span
    >
      {isLoading &&
        <div className='loading-spinner-background'>
          <BeatLoader
            size={15}
            color={"#6439ff"}
            // height={4}
            loading={isLoading}
          />
        </div>
      }
      <div className="updateUser">
        {permission !== "view" && <Sidebar />}
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="img-circle-container">

                <img
                  src={img1 ? img1 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="singleTopImg profile-image"
                  onClick={openModal}
                />

                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
                  <span className="img-span">
                    <img
                      src={img1 ? img1 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                      alt=""
                      className="modal-image"
                    />

                    <span className="close-btn" onClick={closeModal}>
                      &#10005;
                    </span>
                  </span>
                </Modal>
                <img
                  src={img2 ? img2 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="singleTopImg profile-image"
                  onClick={openModal2}
                />

                <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} className="Modal">
                  <span className="img-span">
                    <img
                      src={img2 ? img2 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                      alt=""
                      className="modal-image"
                    />

                    <span className="close-btn" onClick={closeModal2}>
                      &#10005;
                    </span>
                  </span>
                </Modal>

              </div>
            </div>

            <div className="right">
              <form onSubmit={handleSubmit} >
                <div className="formInput">
                  <label htmlFor="img1">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="img1"
                    defaultValue={user.img1}

                    name="img1"
                    onChange={(e) => setImg1(e.target.files[0])}
                    style={{ display: "none" }}
                    disabled={permission === "view" ? true : false}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="img2">
                    Logo: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="img2"
                    name="img2"
                    onChange={(e) => setImg2(e.target.files[0])}
                    style={{ display: "none" }}
                    disabled={permission === "view" ? true : false}
                  />
                </div>

                {inputs.map((input) => (
                  <div className="formInput" key={input.id} >

                    <label> {input.label}</label>
                    {permission === "view" && input.name === "selectedColor" ? (
                      <div className="userColor" style={{ backgroundColor: user.selectedColor }} ></div>
                    ) : (permission !== "view" && input.name === "selectedColor") ? (
                      // create select input with five options: black, green, red, blue, yellow
                      // set user.selectedColor as default value of select input
                      <select name="selectedColor" id="selectedColor" value={user.selectedColor}
                        onChange={(e) => setUser(prevState => ({ ...prevState, selectedColor: e.target.value }))}
                      >
                        <option value="#000000">Black</option>
                        <option value="#009C4D">Green</option>
                        <option value="#FFA500">Yellow</option>
                        <option value="#0000FF">Blue</option>
                      </select>

                    ) : (
                      input.name === "status" ?
                        // generate two check box with active and inactive with inlined css
                        <div className="statusInput">
                          {/* defualt select */}

                          <div className="rodioDiv"  >
                            <input type="radio" name="status" id="active" value="active"
                              // if user.status is active then check it
                              checked={user.status === "active" ? true : false}
                              onChange={(e) => setUser(prevState => ({ ...prevState, status: e.target.value }))}
                            // if user click on active then change user.status to active
                            // when user click update button then user.status will be updated


                            />
                            <label htmlFor="active">Active</label>
                          </div>
                          <div className="rodioDiv">
                            <input type="radio" name="status" id="inactive" value="inactive"
                              checked={user.status === "inactive" ? true : false}
                              // if user click on inactive then change user.status to inactive
                              onChange={(e) => setUser(prevState => ({ ...prevState, status: e.target.value }))}

                            />

                            <label htmlFor="inactive">Inactive</label>
                          </div>
                        </div>

                        :
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          name={input.name}
                          defaultValue={user[input.name]}
                          disabled={permission === "view"}
                        />
                    )}


                  </div>
                ))}
                <div className="formInput" >

                  <label>Date</label>
                  <input type='date' placeholder={user.date} name={user.date}
                    defaultValue={user.date} disabled='true'
                  />
                  <button
                    // disable it if permission is view
                    disabled={permission === "view" ? true : false}


                  >{permission === "view" ? " Save Contact" : "Update"}</button>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div >

    </span >
  );
};

export default New;
