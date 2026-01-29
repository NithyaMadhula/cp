import * as React from "react";
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

const formatDate = (date: any) => new Date(date).toLocaleDateString();

export default function IndexingTable(props: any) {
  const [isSorted, setIsSorted] = React.useState(false);
  const [order, setOrder] = React.useState<string>("");
  const [orderBy, setOrderBy] = React.useState<string>("");
  const [sortedData, setSortedData] = React.useState(props.data);
  const classes = useStyles();

  React.useEffect(() => {
    setIsSorted(false);
    setOrder("");
    setOrderBy("");
    setSortedData(props.data);
  }, [props]);

  const handleRequestSort = (event: any, property: any, converter?: any) => {
    setIsSorted(orderBy === property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setSortedData(stableSort(props.data, getComparator(converter)));
  };

  const createSortHandler = (property: any, converter?: any) => (
    event: any
  ) => {
    return handleRequestSort(event, property, converter);
  };

  function descendingComparator(a: any, b: any, orderBy: any, converter?: any) {
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
        direction={(orderBy === id ? order : "asc") as any}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: "#3f51b5" }}>{label}</span>}
      </TableSortLabel>
    );
  };

  let rosTotal = props.data
    .map((x: any) => Number(x.averageRoS))
    .reduce(function (a: any, b: any) {
      return a + b;
    }, 0);

  const onGameClick = (row: any) => () => props.onGameSelect(row.gameID);

  return (
    <TableContainer component={Paper} style={{ maxHeight: "65vh" }}>
      <Table stickyHeader className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{getSortCell("startDate", "Start Date")}</TableCell>
            <TableCell>Game</TableCell>
            <TableCell>
              {getSortCell("averageSales", "Average Sales", (x: any) => {
                const value = (x || "").replace(/[$,]*/g, "");
                return value ? Number(value) : 0;
              })}
            </TableCell>
            <TableCell>
              {getSortCell("standardIndex", "Standard Index", (x: any) =>
                Number(x)
              )}
            </TableCell>
            <TableCell>
              {getSortCell("averageRoS", "Average RoS", (x: any) => Number(x))}
            </TableCell>
            <TableCell>
              {getSortCell("rosIndex", "RoS Index", (x: any) => Number(x))}
            </TableCell>
            <TableCell>Active Penetration</TableCell>
            <TableCell>
              {getSortCell("sellThru", "Sell-Thru", (x: any) => Number(x))}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row: any) => (
            <TableRow key={row.gameRefNumber}>
              <TableCell>{formatDate(row.startDate)}</TableCell>
              <TableCell
                onClick={onGameClick(row)}
                      style={{ color: "#002EE5" }}
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
