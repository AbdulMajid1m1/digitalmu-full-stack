import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Featured = () => {
  const [profit, setProfit] = useState(220);
  const [sales, setSales] = useState(220);
  const [revenue, setRevenue] = useState(20);
  


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={revenue + "%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made</p>
        <p className="amount">Rs. {sales}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Total Profit</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">Rs. {profit}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Total Sales</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">Rs. {sales}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Total Revenue</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">{revenue}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
