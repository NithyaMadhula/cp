import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { currency_conversion } from "../../../shared/utils/currency_conversion";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function PrizeStructureTable(props: any) {
    const classes = useStyles();
    let counter = 0;

    return (
        <TableContainer component={Paper} style={{ maxHeight: "80vh" }}>
            <Table stickyHeader className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Prize Amount</TableCell>
                        <TableCell align="right">Number of Prizes</TableCell>
                        <TableCell>Prize Description</TableCell>
                        <TableCell align="center">Top Prize</TableCell>                        
                        <TableCell>Prize Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row: any) => (
                        <TableRow key={counter++}>
                            <TableCell align="right">
                                {currency_conversion.currencyFormat(row.prizeAmount)}
                            </TableCell>
                            <TableCell align="right">
                                {numberWithCommas(row.numberOfPrizes)}
                            </TableCell>
                            {/*<TableCell>{row.prizeDescription}</TableCell>*/}
                            <TableCell align="center">
                                {row.topPrize ? (
                                    <CheckCircleOutlineIcon style={{ color: "#4DAA57" }} />
                                ) : (
                                        <span></span>
                                    )}
                            </TableCell>
                            <TableCell>{row.prizeTypeName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
