import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/config";
const Datatable = ({ columnsName }) => {

  const [data, setData] = useState([]);


  // use native fetch api
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/get-all-users`);
      // add id to each object
      response.data.map((item, index) => {
        item.id = index + 1;
      });
      setData(response.data);

    };
    fetchData();
  }, []);

  const handleDelete = async (id, mongo_id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {


      const response = await axios.delete(`${baseUrl}/delete-user/${mongo_id}`);
      if (response.status === 200) {
        setData(data.filter((item) => item.id !== id));
        alert("User deleted successfully");
      }
    }


  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link target="_blank" to={`/user/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id, params.row._id)}
            >
              Delete
            </div>
            <Link to={`/user/update/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (

    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowHeight={({ }) => {
          return 120;
        }}
        className="datagrid"
        rows={data}
        columns={columnsName.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
