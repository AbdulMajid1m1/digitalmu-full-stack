import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { userColumns } from "../../datatablesource"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/config";
import Cookies from "js-cookie"


const List = () => {


  const navigate = useNavigate();
  // authenicate user using access token and if not then redirect to login page
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  // get accessToken present in cookies and if not then redirect to login page
  const accessToken = Cookies.get("adminToken");
  console.log(accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/check-auth`, {
          headers: {
            // get token from cookies access token
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setIsAuthenticated(true);
        setIsAuthenticating(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setIsAuthenticating(false);
        navigate("/admin-login");
        console.log("not authenticated");
      }

    };
    checkAuth();
  }, []);

  const [data, setData] = useState([]);
  // use native fetch api
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/get-all-users`);
      console.log(response.data);
      // add id to each object
      response.data.map((item, index) => {
        item.id = index + 1;
      });
      setData(response.data);

    };
    fetchData();
  }, []);


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <Datatable data={data} columnsName={userColumns} />
      </div>
    </div>
  )
}

export default List