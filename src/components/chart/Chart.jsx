import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../utils/config";

// const data = [
//   { name: "January", Total: 1200 },
//   { name: "February", Total: 2100 },
//   { name: "March", Total: 800 },
//   { name: "April", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
// ];

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([
    { name: "today", Total: 0 },
    { name: "yesterday", Total: 0 },
    { name: "2 days ago", Total: 0 },
    { name: "3 days ago", Total: 0 },

  ]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/users-analytics`);
      setData([
        { name: "today", Total: response.data.last24Hours },
        { name: "yesterday", Total: response.data.last48Hours },
        { name: "2 days ago", Total: response.data.last72Hours },
        { name: "3 days ago", Total: response.data.last96Hours },
      ]);


    };
    fetchData();
  }, []);



  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
