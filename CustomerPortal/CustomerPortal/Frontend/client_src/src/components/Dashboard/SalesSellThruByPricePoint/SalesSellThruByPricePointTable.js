import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SalesSellThruByPricePointTable(props) {
  const classes = useStyles();
  let counter = 0;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Game</TableCell>
            <TableCell align="center">Launch Date</TableCell>
            <TableCell align="center">Ticket Price</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">1</TableCell>
            <TableCell align="center">2</TableCell>
            <TableCell align="center">3</TableCell>
            <TableCell align="center">4</TableCell>
            <TableCell align="center">5</TableCell>
            <TableCell align="center">6</TableCell>
            <TableCell align="center">7</TableCell>
            <TableCell align="center">8</TableCell>
            <TableCell align="center">9</TableCell>
            <TableCell align="center">10</TableCell>
            <TableCell align="center">11</TableCell>
            <TableCell align="center">12</TableCell>
            <TableCell align="center">13</TableCell>
            <TableCell align="center">14</TableCell>
            <TableCell align="center">15</TableCell>
            <TableCell align="center">16</TableCell>
            <TableCell align="center">17</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={counter}>
              <TableCell align="center">
                {counter % 4 == 0 ? `${row.gameReference} ${row.gameName}` : ""}
              </TableCell>
              <TableCell align="center">
                {counter % 4 == 0 ? row.startDate : ""}
              </TableCell>
              <TableCell align="center">
                {counter++ % 4 == 0 ? `$${row.ticketPrice}.00` : ""}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.col1}</TableCell>
              <TableCell align="center">{row.col2}</TableCell>
              <TableCell align="center">{row.col3}</TableCell>
              <TableCell align="center">{row.col4}</TableCell>
              <TableCell align="center">{row.col5}</TableCell>
              <TableCell align="center">{row.col6}</TableCell>
              <TableCell align="center">{row.col7}</TableCell>
              <TableCell align="center">{row.col8}</TableCell>
              <TableCell align="center">{row.col9}</TableCell>
              <TableCell align="center">{row.col10}</TableCell>
              <TableCell align="center">{row.col11}</TableCell>
              <TableCell align="center">{row.col12}</TableCell>
              <TableCell align="center">{row.col13}</TableCell>
              <TableCell align="center">{row.col14}</TableCell>
              <TableCell align="center">{row.col15}</TableCell>
              <TableCell align="center">{row.col16}</TableCell>
              <TableCell align="center">{row.col17}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
