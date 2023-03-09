import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from 'react-spinners';
import baseUrl from '../../utils/config.js';
const Single = () => {
  const [isLoading, setIsLoading] = useState(false);


  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${baseUrl}/get-user/${id}`);
      setProductData(response.data);
    };
    fetchProduct();

  }, [id]);
  return (
    <div className="single">
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
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="bottom">
          {/* design a layout to show user data here includeing user Pictue */
          }
          <div className="singleWrapper">

            <div className="singleTop">
              {/*  user image */}
              <div className="singleTopImgDiv">
                <img
                  src={productData.img1 ? productData.img1 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="singleTopImg"
                />
              </div>
              <div className="singleTopImgDiv">
                <img
                  src={productData.img2 ? productData.img2 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                  className="singleTopImg"
                />
              </div>
              <div className="userInfoTopDIv">
                <div className="singleTopLeftTitle">User Information</div>
                <div className="singleTopLeftInfo">
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Name:</span>
                    <span className="singleTopLeftInfoValue">{productData.name}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Email:</span>
                    <span className="singleTopLeftInfoValue">{productData.email}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Company:</span>
                    <span className="singleTopLeftInfoValue">{productData.company}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Phone:</span>
                    <span className="singleTopLeftInfoValue">{productData.phone}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">

                    <span className="singleTopLeftInfoKey">Address:</span>
                    <span className="singleTopLeftInfoValue">{productData.address}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Date:</span>
                    <span className="singleTopLeftInfoValue">{productData.date}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Digitalmu Url:</span>
                    <span className="singleTopLeftInfoValue">{productData.digitalmuUrl}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Designation:</span>
                    <span className="singleTopLeftInfoValue">{productData.designation}</span>
                  </div>
                  <div className="singleTopLeftInfoItem">
                    <span className="singleTopLeftInfoKey">Selected Color:</span>
                    <span className="singleTopLeftInfoValue">{productData.selectedColor}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default Single;
