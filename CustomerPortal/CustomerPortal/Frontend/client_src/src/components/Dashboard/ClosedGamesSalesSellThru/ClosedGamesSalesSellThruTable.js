import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { currency_conversion } from "../../../utils/currency/currency_conversion";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatDate = (date) => new Date(date).toLocaleDateString();

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ClosedGamesSalesSellThru(props) {
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [sortedData, setSortedData] = React.useState(props.data);
  const classes = useStyles();
  let counter = 0;

  const handleRequestSort = (event, property, converter) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setSortedData(stableSort(props.data, getComparator(converter)));
  };

  const createSortHandler = (property, converter) => (event) => {
    return handleRequestSort(event, property, converter);
  };

  function descendingComparator(a, b, orderBy, converter) {
    let v1 = converter ? converter(a[orderBy]) : a[orderBy];
    let v2 = converter ? converter(b[orderBy]) : b[orderBy];

    if (v2 < v1) {
      return -1;
    }
    if (v2 > v1) {
      return 1;
    }
    return 0;
  }

  function getComparator(converter) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy, converter)
      : (a, b) => -descendingComparator(a, b, orderBy, converter);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const getSortCell = (id, label, converter) => {
    return (
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: "#3f51b5" }}>{label}</span>}
      </TableSortLabel>
    );
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: "65vh" }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell sortDirection={orderBy === "launchDate" ? order : false}>
              {getSortCell("launchDate", "Launch Date")}
            </TableCell>
            <TableCell>Ticket Price</TableCell>
            <TableCell>Ticket Quantity Received</TableCell>
            <TableCell
              sortDirection={orderBy === "numberWeeksOnSale" ? order : false}
            >
              {getSortCell("numberWeeksOnSale", "Number of Weeks on Sale")}
            </TableCell>
            <TableCell>Final Week Sales</TableCell>
            <TableCell
              sortDirection={orderBy === "finalWeekEndingDate" ? order : false}
            >
              {getSortCell("finalWeekEndingDate", "Final Week Ending Date")}
            </TableCell>
            <TableCell>Total Sales</TableCell>
            <TableCell sortDirection={orderBy === "sellThru" ? order : false}>
              {getSortCell("sellThru", "Sell-Thru", (x) => Number(x))}
            </TableCell>
            <TableCell>Weeks until 80% Sell-Thru</TableCell>
            <TableCell>Weeks until 90% Sell-Thru</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.gameReference}>
              <TableCell>{`${row.gameReference} ${row.gameName}`}</TableCell>
              <TableCell>{formatDate(row.launchDate)}</TableCell>
              <TableCell>${row.ticketPrice}.00</TableCell>
              <TableCell>{numberWithCommas(row.ticketQtyReceived)}</TableCell>
              <TableCell>{row.numberWeeksOnSale}</TableCell>
              <TableCell>
                {currency_conversion.currencyFormat(row.finalWeekSales)}
              </TableCell>
              <TableCell>{formatDate(row.finalWeekEndingDate)}</TableCell>
              <TableCell>
                {currency_conversion.currencyFormat(row.totalSales)}
              </TableCell>
              <TableCell>{row.sellThru}%</TableCell>
              <TableCell>
                {row.numberOfWeeks80SellThru === "0"
                  ? "N/A"
                  : Number(row.numberOfWeeks80SellThru)}
              </TableCell>
              <TableCell>
                {row.numberOfWeeks90SellThru === "0"
                  ? "N/A"
                  : Number(row.numberOfWeeks90SellThru)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
