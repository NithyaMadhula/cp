import { Card, LinearProgress } from "@material-ui/core";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NorthAmericanLotteryTable from "./NorthAmericanLotteryTable";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { fetch_data } from "../../../shared/utils/fetch_data";
import { currency_conversion } from "../../../shared/utils/currency_conversion";

const {
  fetchNaloLotterySales,
  fetchNaloYtdSales,
  ticketBreakdown,
} = fetch_data;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const getStyle = (value: any) => {
  if (!value) return {};
  value = value.replace("%", "");

  return {
    fontWeight: 700,
    color: Number(value) > 0 ? "green" : !Number(value) ? "black" : "red",
  };
};

const NorthAmericanLottery = (props: any) => {
  const [init, setInit] = React.useState(false);
  const [naloSalesData, setNaloSalesData] = React.useState({});
  const [naloYtdData, setNaloYtdData] = React.useState<any>({});
  const [ticketData, setTicketData] = React.useState(null);
  const [start, setStart] = React.useState("1/1/" + (new Date().getFullYear()).toString());
  const hasData = (data: any) => data && data.length;

  React.useEffect(() => {
    setNaloSalesData({});

    fetchNaloLotterySales(start)
      .then((response: any) => {
        setNaloSalesData(response);
      })
      .catch((error: any) => console.error(error))
      .finally(() => setInit(true));

    fetchNaloYtdSales(start)
      .then((response: any) => {
        setNaloYtdData(response[0]);
      })
      .catch((error: any) => console.error(error));

    ticketBreakdown(null, 0)
      .then((response: any) => {
        //removes rows when data is missing
        const filtered = response.filter(
          (x: any) => x.percentChangeYear || x.currWeekSales
        );
        setTicketData(filtered);

        if (!filtered.length) {
          console.warn(
            "NALO - missing data, ticketBreakdown[].percentChangeYear not returned from API."
          );
        }
      })
      .catch((error: any) => console.error(error));
  }, [setNaloSalesData, setInit, setNaloYtdData, setTicketData]);

  return (
    <main>
      {!hasData(naloSalesData) ||
      !(naloYtdData && naloYtdData.currWeek) ||
      !hasData(ticketData) ? (
        <LinearProgress />
      ) : (
        <></>
      )}

      {naloYtdData && naloYtdData.currWeek ? (
        <>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div style={{ display: "block" }}>
                <h3 className="section-text pl-2">
                  {props.lotteryName} Instants CYTD Sales
                </h3>
                <br />
                <TableContainer style={{ maxWidth: "510px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          Current Week Ending
                        </TableCell>
                        <TableCell align="center">Prior CYTD Sales</TableCell>
                        <TableCell align="center">CYTD Sales</TableCell>
                        <TableCell align="center">Percent Change</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          {new Date(naloYtdData.currWeek).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {currency_conversion.currencyFormat(
                            naloYtdData.priorYearYTDSales,
                            0,
                            true
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {currency_conversion.currencyFormat(
                            naloYtdData.ytdSales,
                            0,
                            true
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={getStyle(naloYtdData.percentChangeYear)}
                        >
                          {naloYtdData.percentChangeYear
                            ? naloYtdData.percentChangeYear
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <TableContainer
                style={{
                  width: "100%",
                }}
              >
                {hasData(ticketData) ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Ticket Price</TableCell>
                        <TableCell align="right">Week Sales</TableCell>
                        <TableCell align="right">CYTD Sales</TableCell>
                        <TableCell align="right">Percent of Total</TableCell>
                        <TableCell align="right">
                          Prior Year Week Sales
                        </TableCell>
                        <TableCell align="right">
                          Prior Year CYTD Sales
                        </TableCell>
                        <TableCell align="right">Week Difference</TableCell>
                        <TableCell align="right">% Change Week</TableCell>
                        <TableCell align="right">CYTD Difference</TableCell>
                        <TableCell align="right">% Change Year</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(ticketData || []).map((x: any) => (
                        <TableRow>
                          <TableCell align="center">
                            {currency_conversion.currencyFormat(x.ticketPrice)}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.currWeekSales,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.ytdSales,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {x.percentSalesYTD}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.priorYearWeekSales,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.priorYearYTDSales,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.weekDifference,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={getStyle(x.percentChangeWeek)}
                          >
                            {x.percentChangeWeek}
                          </TableCell>
                          <TableCell align="right">
                            {currency_conversion.currencyFormat(
                              x.ytdDifference,
                              0,
                              true
                            )}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={getStyle(x.percentChangeYear)}
                          >
                            {x.percentChangeYear ? x.percentChangeYear : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <></>
                )}
              </TableContainer>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      ) : (
        <></>
      )}
      <br />
      {/* <LotteriesOfInterest />
      
      <br /> */}
      {hasData(naloSalesData) ? (
        <NorthAmericanLotteryTable
          data={naloSalesData}
        ></NorthAmericanLotteryTable>
      ) : (
        <></>
      )}
    </main>
  );
};

export default NorthAmericanLottery;
