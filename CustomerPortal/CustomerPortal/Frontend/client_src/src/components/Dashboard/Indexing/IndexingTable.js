import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function IndexingTable(props) {
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

  let rosTotal = props.data
    .map((x) => Number(x.averageRoS))
    .reduce(function (a, b) {
      return a + b;
    }, 0);

  const onGameClick = (row) => () => props.onGameSelect(row.gameID);

  return (
    <TableContainer component={Paper} style={{ maxHeight: "65vh" }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{getSortCell("startDate", "Start Date")}</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>
              {getSortCell("averageSales", "Average Sales", (x) => {
                const value = (x || "").replace(/[$,]*/g, "");
                return value ? Number(value) : 0;
              })}
            </TableCell>
            <TableCell>
              {getSortCell("standardIndex", "Standard Index", (x) => Number(x))}
            </TableCell>
            <TableCell>
              {getSortCell("averageRoS", "Average RoS", (x) => Number(x))}
            </TableCell>
            <TableCell>
              {getSortCell("rosIndex", "RoS Index", (x) => Number(x))}
            </TableCell>
            <TableCell>Active Penetration</TableCell>
            <TableCell>
              {getSortCell("sellThru", "Sell-Thru", (x) => Number(x))}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.gameRefNumber}>
              <TableCell>{formatDate(row.startDate)}</TableCell>
              <TableCell
                onClick={onGameClick(row)}
                style={{ color: "#0D51A1" }}
              >
                {row.gameRefNumber} {row.gameName}
              </TableCell>
              <TableCell>{row.averageSales}</TableCell>
              <TableCell>{row.standardIndex}</TableCell>
              <TableCell>${row.averageRoS}</TableCell>
              <TableCell>{row.rosIndex}</TableCell>
              <TableCell>{row.activePenetration}%</TableCell>
              <TableCell>{row.sellThru}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
