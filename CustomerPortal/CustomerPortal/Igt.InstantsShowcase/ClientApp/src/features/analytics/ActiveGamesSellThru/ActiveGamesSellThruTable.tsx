import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { currency_conversion } from "../../../shared/utils/currency_conversion";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatDate = (date: any) => new Date(date).toLocaleDateString();

function numberWithCommas(x: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function withCeiling(value: number) {
  return value > 999 ? "--" : value;
}

export default function ActiveGamesSellThruTable(props: any) {
  const [isSorted, setIsSorted] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<string>("");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [sortedData, setSortedData] = React.useState<any[]>(props.data);
  const classes = useStyles();

  const handleRequestSort = (event: any, property: any, converter: any) => {
    setIsSorted(orderBy === property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setSortedData(stableSort(props.data, getComparator(converter)));
  };

  const createSortHandler = (property: any, converter: any) => (event: any) => {
    return handleRequestSort(event, property, converter);
  };

  function descendingComparator(a: any, b: any, orderBy: any, converter: any) {
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

  function getComparator(converter: any) {
    return order === "desc"
      ? (a: any, b: any) => -descendingComparator(a, b, orderBy, converter)
      : (a: any, b: any) => descendingComparator(a, b, orderBy, converter);
  }

  function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
  }

  const getSortCell = (id: any, label: any, converter?: any) => {
    return (
      <TableSortLabel
        active={orderBy === id && isSorted}
        direction={orderBy === id ? order : ("asc" as any)}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: "#3f51b5" }}>{label}</span>}
      </TableSortLabel>
    );
  };

  const getForecastedInfo = (item: any, threshold: number, prop: string) => {
    if (withCeiling(Number(item[prop])) == "--") return;

    if (Number(item.sellThru) < threshold) {
      return (
        <Tooltip
          title={`Week has been forecasted due to current sell thru under ${threshold}%`}
          arrow
          placement="bottom"
          style={{ fontSize: "16px", margin: "6px 1px" }}
        >
          <InfoOutlinedIcon />
        </Tooltip>
      );
    } else {
      return <></>;
    }
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: "75vh" }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Game</TableCell>
            <TableCell>
              {getSortCell("startDate", "Launch Date", (x: any) => {
                try {
                  return new Date(x).toISOString().split("T")[0];
                } catch {
                  return 0;
                }
              })}
            </TableCell>
            <TableCell>Ticket Price</TableCell>
            <TableCell>Ticket Quantity Received</TableCell>
            <TableCell>Number of Weeks on Sale</TableCell>
            <TableCell>Current Week Ending</TableCell>
            <TableCell>
              {getSortCell("currWeekSales", "Current Week Sales", (x: any) =>
                Number(x)
              )}
            </TableCell>
            <TableCell>{getSortCell("salesToDate", "Sales To-Date")}</TableCell>
            <TableCell>
              {getSortCell("averageSales", "Average Sales")}
            </TableCell>
            <TableCell>
              {getSortCell("sellThru", "Sell-Thru", (x: any) => Number(x))}
            </TableCell>
            <TableCell>13 Week Average</TableCell>
            <TableCell>13 Week Sell-Thru</TableCell>
            <TableCell>Weeks Remaining (at 13 week average)</TableCell>
            <TableCell>Weeks until 80% Sell-Thru</TableCell>
            <TableCell>Weeks until 90% Sell-Thru</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(sortedData && sortedData.length ? sortedData : []).map(
            (row: any) => (
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
                  {getForecastedInfo(row, 80, "numberOfWeeks80SellThru")}
                </TableCell>
                <TableCell title={row.numberOfWeeks90SellThru}>
                  {withCeiling(Number(row.numberOfWeeks90SellThru))}
                  {getForecastedInfo(row, 90, "numberOfWeeks90SellThru")}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
