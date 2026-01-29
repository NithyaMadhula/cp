import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import GetApp from '@material-ui/icons/GetApp';
import { currency_conversion } from '../../../utils/currency/currency_conversion';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function NorthAmericanLotteryTable(props) {
  const [order, setOrder] = React.useState();
  const [orderBy, setOrderBy] = React.useState();
  const [sortedData, setSortedData] = React.useState(props.data);
  const classes = useStyles();
  let counter = 0;

  const handleRequestSort = (event, property, converter) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setSortedData(stableSort(props.data, getComparator(converter)));
  };

  const createSortHandler = (property, converter) => (event) => {
    return handleRequestSort(event, property, converter);
  };

  function descendingComparator(a, b, orderBy, converter) {
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

  function getComparator(converter) {
    return order === 'desc'
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
        direction={orderBy === id ? order : 'asc'}
        onClick={createSortHandler(id, converter)}
      >
        {<span style={{ color: '#3f51b5' }}>{label}</span>}
      </TableSortLabel>
    );
  };

  function naloTable(props) {
    return (
      <>
        <h2>
          North American Lotteries
          <CSVLink data={sortedData}>
            <GetApp
              style={{
                color: 'rgb(63, 81, 181)',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                position: 'relative',
                top: '6px',
                left: '10px',
              }}
            />
          </CSVLink>
        </h2>
        <Card>
          <TableContainer component={Paper} style={{ maxHeight: '60vh' }}>
            <Table stickyHeader className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>{getSortCell('businessName', 'Name')}</TableCell>
                  <TableCell align="right">{getSortCell('revenueYTDPrior', 'Revenue YTD 2019')}</TableCell>
                  <TableCell align="right">{getSortCell('revenueYTDCurrent', 'Revenue YTD 2020')}</TableCell>
                  <TableCell align="right">{getSortCell('percentChange', 'Percent Change', (x) => Number(x))}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .filter((row) => !!row)
                  .map((row) => (
                    <TableRow key={row.lotteryId}>
                      <TableCell
                        style={{
                          fontWeight: row.lotteryId === 0 ? '700' : '400',
                        }}
                      >
                        {row.businessName}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: row.lotteryId === 0 ? '700' : '400',
                        }}
                      >
                        {currency_conversion.currencyFormat(row.revenueYTDPrior, 0)}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: row.lotteryId === 0 ? '700' : '400',
                        }}
                      >
                        {currency_conversion.currencyFormat(row.revenueYTDCurrent, 0)}
                      </TableCell>
                      <TableCell align="right">
                        <strong
                          style={{
                            color: Number(row.percentChange) > 0 ? 'green' : !Number(row.percentChange) ? 'black' : 'red',
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
