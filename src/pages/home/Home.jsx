import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "js-cookie";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import "../../components/datatable/datatable.scss";
import Datatable from "../../components/datatable/Datatable"
import { userColumns2, userColumns, userRows } from "../../datatablesource";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/config";

// import List from "../list/List";
const Home = (props) => {
  const navigate = useNavigate();
  // authenicate user using access token and if not then redirect to login page
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  // get accessToken present in cookies and if not then redirect to login page
  const accessToken = Cookies.get("adminToken");
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

        setIsAuthenticated(true);
        setIsAuthenticating(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setIsAuthenticating(false); 
        navigate("/admin-login");
      }

    };
    checkAuth();
  }, []);




  const [data, setData] = useState([]);
  // use native fetch api
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/get-all-users`);
      // add id to each object
      response.data.map((item, index) => {
        item.id = index + 1;
        item.contactsNumber = item.contacts.length;
      });
      setData(response.data);

    };
    fetchData();
  }, []);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {isAuthenticating ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (

        <div className="home">
          {isAuthenticated && <>
            <Sidebar />
            <div className="homeContainer">
              <Navbar />
              {props.page !== "stats" &&
                <div className="widgets">
                  <Widget type="allUser" />
                  <Widget type="activeUser" />
                  <Widget type="inActiveUser" />
                </div>
              }
              {props.page === "stats" && (<><div className="charts" style={{ paddingTop: 20 }}>
                <Chart title="Analytics" aspect={3 / 1} /> </div>

                <Datatable data={data} columnsName={userColumns2} />
              </>)}


              {props.page !== "stats" && <Datatable data={data} columnsName={userColumns} />}

            </div>
          </>
          }
        </div >
      ) : (
        <div>Not authenticated</div>
      )}
    </>
  );
};

export default Home;
