import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from 'react-spinners';
import { useEffect } from "react";
import baseUrl from '../../utils/config.js';
import Cookies from "js-cookie";
const New = ({ inputs, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");

  const navigate = useNavigate();
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


      } catch (error) {
        console.log(error);
        navigate("/admin-login");
        console.log("not authenticated");
      }

    };
    checkAuth();
  }, []);

  const handleSubmit = async event => {
    setIsLoading(true);


    try {

      event.preventDefault();
      const form = new FormData();
      form.append('img1', img1);
      form.append('img2', img2);
      form.append('name', event.target.name.value);
      form.append('email', event.target.email.value);
      form.append('company', event.target.company.value);
      form.append('phone', event.target.phone.value);
      form.append('address', event.target.address.value);
      // form.append('date', event.target.date.value);
      form.append('digitalmuUrl', event.target.digitalmuUrl.value);
      form.append('designation', event.target.designation.value);
      form.append('selectedColor', event.target.selectedColor.value);
      form.append('facebookUrl', event.target.facebookUrl.value);
      form.append('tiktokUrl', event.target.tiktokUrl.value);
      form.append('youtubeUrl', event.target.youtubeUrl.value);
      form.append('twitterUrl', event.target.twitterUrl.value);
      form.append('status', event.target.status.value);



      await axios
        .post(`${baseUrl}/add-user`, form)
        .then(response => {
          navigate("/users");
        }
        )
        .catch(error => {
          console.log(error);
          window.alert("Something went wrong");
        });

    }
    catch (error) {
      // alert with actual error message
      // alert("Something went wrong");
      // show error to user on screen
      window.alert('something went wrong');
      console.log(error);
    }
    finally {
      setIsLoading(false);

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
      <div className="new">


        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>{title}</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="img-circle-container">

                <img
                  src={
                    img1
                      ? URL.createObjectURL(img1)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />

                <img
                  src={
                    img2
                      ? URL.createObjectURL(img2)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
            </div>

            <div className="right">
              <form onSubmit={handleSubmit} >
                <div className="formInput">
                  <label htmlFor="img1">
                    Image*: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="img1"
                    required
                    name="img1"
                    onChange={(e) => setImg1(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="img2">
                    Logo*: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="img2"
                    required
                    name="img2"
                    onChange={(e) => setImg2(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>

                {inputs.map((input) => (

                  input.name === "selectedColor" ?
                    // create select input with five options: black, green, red, blue, yellow
                    <div className="formInput">
                      <label htmlFor="selectedColor">Select Color*</label>
                      <select name="selectedColor" id="selectedColor">
                        <option value="#000000">Black</option>
                        <option value="#009C4D">Green</option>
                        <option value="#FFA500">Yellow</option>
                        <option value="#0000FF">Blue</option>
                        {/* <option value="yellow">Yellow</option> */}
                      </select>
                    </div>

                    :
                    input.name === "status" ?
                      // generate two check box with active and inactive with inlined css
                      <div className="formInput" key='14' >
                        <label htmlFor="status">Status*</label>
                        <div className="statusInput">
                          <div className="rodioDiv">
                            <input type="radio" name="status" id="active" value="active" />
                            <label htmlFor="active">Active</label>
                          </div>
                          <div className="rodioDiv">
                            <input type="radio" name="status" id="inactive" value="inactive" />

                            <label htmlFor="inactive">Inactive</label>
                          </div>
                        </div>
                      </div>
                      :
                      <div className="formInput" key={input.id}>
                        <label htmlFor={input.name}>{input.label}</label>
                        <input type={input.type} placeholder={input.placeholder} name={input.name} id={input.name} />
                      </div>
                ))}

                <button>Add</button>
              </form>
            </div>
          </div>


        </div>
      </div >

    </span >
  );
};

export default New;
