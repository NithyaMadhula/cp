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

function withCeiling(value) {
  return value > 150 ? "--" : value;
}

export default function ActiveGamesSellThruTable(props) {
  const [isSorted, setIsSorted] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [sortedData, setSortedData] = React.useState(props.data);
  const classes = useStyles();

  const handleRequestSort = (event, property, converter) => {
    setIsSorted(orderBy === property);
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
      ? (a, b) => -descendingComparator(a, b, orderBy, converter)
      : (a, b) => descendingComparator(a, b, orderBy, converter);
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
        active={orderBy === id && isSorted}
        direction={orderBy === id ? order : "asc"}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: "#3f51b5" }}>{label}</span>}
      </TableSortLabel>
    );
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: "75vh" }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell>Launch Date</TableCell>
            <TableCell>Ticket Price</TableCell>
            <TableCell>Ticket Quantity Received</TableCell>
            <TableCell>Number of Weeks on Sale</TableCell>
            <TableCell>Current Week Ending</TableCell>
            <TableCell>
              {getSortCell("currWeekSales", "Current Week Sales", (x) =>
                Number(x)
              )}
            </TableCell>
            <TableCell>{getSortCell("salesToDate", "Sales To-Date")}</TableCell>
            <TableCell>
              {getSortCell("averageSales", "Average Sales")}
            </TableCell>
            <TableCell>
              {getSortCell("sellThru", "Sell-Thru", (x) => Number(x))}
            </TableCell>
            <TableCell>13 Week Average</TableCell>
            <TableCell>13 Week Sell-Thru</TableCell>
            <TableCell>Weeks Remaining (at 13 week average)</TableCell>
            <TableCell>Weeks until 80% Sell-Thru</TableCell>
            <TableCell>Weeks until 90% Sell-Thru</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(sortedData && sortedData.length ? sortedData : []).map((row) => (
            <TableRow key={row.gameReference}>
              <TableCell>{`${row.gameReference} ${row.gameName}`}</TableCell>
              <TableCell>{formatDate(row.startDate)}</TableCell>
              <TableCell>${row.ticketPrice}.00</TableCell>
              <TableCell>{numberWithCommas(row.ticketQtyReceived)}</TableCell>
              <TableCell>{row.numberWeeksOnSale}</TableCell>
              <TableCell>{formatDate(row.weekEndDate)}</TableCell>
              <TableCell>
                {currency_conversion.currencyFormat(row.currWeekSales, 0)}
              </TableCell>
              <TableCell>
                {currency_conversion.currencyFormat(row.salesToDate, 0)}
              </TableCell>
              <TableCell>
                {currency_conversion.currencyFormat(row.averageSales, 0)}
              </TableCell>
              <TableCell>{row.sellThru}%</TableCell>
              <TableCell>
                {row.week13Average
                  ? currency_conversion.currencyFormat(row.week13Average, 0)
                  : "N/A"}
              </TableCell>
              <TableCell>
                {row.week13SellThru ? row.week13SellThru : "N/A"}
              </TableCell>
              <TableCell>
                {row.weeksRemaining13WeekAverage
                  ? row.weeksRemaining13WeekAverage
                  : "N/A"}
              </TableCell>
              <TableCell title={row.numberOfWeeks80SellThru}>
                {withCeiling(Number(row.numberOfWeeks80SellThru))}
              </TableCell>
              <TableCell title={row.numberOfWeeks90SellThru}>
                {withCeiling(Number(row.numberOfWeeks90SellThru))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
