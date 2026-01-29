import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import GetApp from "@material-ui/icons/GetApp";
import { currency_conversion } from "../../../shared/utils/currency_conversion";
import { CSVLink } from "react-csv";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function NorthAmericanLotteryTable(props: any) {
  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");
  const [sortedData, setSortedData] = React.useState(props.data);
  const classes = useStyles();
  let counter = 0;

  const handleRequestSort = (event: any, property: any, converter: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setSortedData(stableSort(props.data, getComparator(converter)));
  };

  const createSortHandler = (property: any, converter: any) => (event: any) => {
    return handleRequestSort(event, property, converter);
  };

  function descendingComparator(a: any, b: any, orderBy: any, converter: any) {
    if (a.lotteryId === 0) {
      return 10;
    } else if (b.lotteryId === 0) {
      return -10;
    }

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
      ? (a: any, b: any) => descendingComparator(a, b, orderBy, converter)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy, converter);
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
        active={orderBy === id}
        direction={orderBy === id ? order : ("asc" as any)}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: "#3f51b5" }}>{label}</span>}
      </TableSortLabel>
    );
  };

  function naloTable(props: any) {
    return (
      <>
        <Tooltip
          title={`Download report.`}
          arrow
          placement="bottom"
          style={{ fontSize: "16px", margin: "6px 1px", float: "right" }}
        >
          <CSVLink
            data={sortedData}
            filename={`nalo-${new Date().toLocaleDateString()}.csv`}
          >
            <GetApp
              style={{
                color: "rgb(21, 156, 219)",
                width: "30px",
                height: "30px",
                cursor: "pointer",
                position: "relative",
                top: "6px",
                left: "10px",
                float: "right",
              }}
            />
          </CSVLink>
        </Tooltip>{" "}
        <br /><br />
        <Card>
          <TableContainer component={Paper} style={{ maxHeight: "60vh" }}>
            <Table stickyHeader className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {getSortCell("businessName", "Jurisdiction")}
                  </TableCell>
                  <TableCell align="right">
                    {getSortCell("revenueYTDPrior", "Prior Year")}
                  </TableCell>
                  <TableCell align="right">
                    {getSortCell("revenueYTDCurrent", "Current Year")}
                  </TableCell>
                  <TableCell align="right">
                    {getSortCell("percentChange", "Percent Change", (x: any) =>
                      Number(x)
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .filter((row: any) => !!row)
                  .map((row: any) => (
                    <TableRow key={row.lotteryId}>
                      <TableCell
                        style={{
                          fontWeight: row.lotteryId === 0 ? 700 : 400,
                        }}
                      >
                        {row.businessName}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: row.lotteryId === 0 ? 700 : 400,
                        }}
                      >
                        {currency_conversion.currencyFormat(
                          row.revenueYTDPrior,
                          0
                        )}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: row.lotteryId === 0 ? 700 : 400,
                        }}
                      >
                        {currency_conversion.currencyFormat(
                          row.revenueYTDCurrent,
                          0
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <strong
                          style={{
                            color:
                              Number(row.percentChange) > 0
                                ? "green"
                                : !Number(row.percentChange)
                                ? "black"
                                : "red",
                          }}
                        >
                          {row.percentChange.toFixed(1)}%
                        </strong>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
    );
  }

  return <>{naloTable(props)}</>;
}
