import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = (props) => {
  const rows = [
    {
      id: 1,
      product: "Shawl",
      // img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      purchaseAmount: 1000,
      sellingAmount: 1500,
      TotalProfit: 5000,
      // method: "Cash on Delivery",
      // status: "Approved",
    },

  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Sold Items Count</TableCell>
            <TableCell className="tableCell">Remaing Stock</TableCell>
            <TableCell className="tableCell">Item Selling Price</TableCell>
            <TableCell className="tableCell">Item Purchase Cost</TableCell>
            <TableCell className="tableCell">Total Profit</TableCell>
            {/* <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => ( */}
          <TableRow key={props.productId}>
            <TableCell className="tableCell">{props.productId}</TableCell>
            <TableCell className="tableCell">
              {props.ProductName}
            </TableCell>
            <TableCell className="tableCell">{props.soldItems}</TableCell>
            <TableCell className="tableCell">{props.totalStock}</TableCell>
            <TableCell className="tableCell">{props.purchasePrice}</TableCell>
            <TableCell className="tableCell">{props.sellingPrice}</TableCell>
            <TableCell className="tableCell">{[props.sellingPrice - props.purchasePrice] * props.soldItems}</TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
