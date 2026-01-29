import React, { useState, useEffect } from "react";
import { Card } from "@material-ui/core";
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
import { currency_conversion } from "../../../../../shared/utils/currency_conversion";

//API Data Fetch
import { fetch_data } from "../../../../../shared/utils/fetch_data";

const formatDate = (date) => new Date(date).toLocaleDateString();

const getStyle = (value) => {
  if (!value) return {};
  value = value.replace("%", "");

  return {
    fontWeight: 700,
    color: Number(value) > 0 ? "green" : !Number(value) ? "black" : "red",
  };
};

const dataContainer = (data, ticketData) => {
  //debugger;
  return (
    <>
      <ExpansionPanel style={{ background: "#FFFFFF" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <TableContainer style={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Current Week Ending</TableCell>
                  <TableCell align="right">Week Sales</TableCell>
                  <TableCell align="right">YTD Sales</TableCell>
                  <TableCell align="right">Prior Year Week</TableCell>
                  <TableCell align="right">Prior Year Week Sales</TableCell>
                  <TableCell align="right">Prior Year YTD Sales</TableCell>
                  <TableCell align="right">Week Difference</TableCell>
                  <TableCell align="right">% Change Week</TableCell>
                  <TableCell align="right">YTD Difference</TableCell>
                  <TableCell align="right">% Change Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    {formatDate(data.currWeek)}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(
                      data.currWeekSales,
                      0,
                      true
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(data.ytdSales, 0, true)}
                  </TableCell>
                  <TableCell align="right">
                    {data.priorYearWeek &&
                    new Date(data.priorYearWeek).getFullYear > 2015
                      ? formatDate(data.priorYearWeek)
                                          : formatDate(data.priorYearWeek)}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(
                      data.priorYearWeekSales,
                      0,
                      true
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(
                      data.priorYearYTDSales,
                      0,
                      true
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(
                      data.weekDifference,
                      0,
                      true
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={getStyle(data.percentChangeWeek)}
                  >
                    {data.percentChangeWeek}
                  </TableCell>
                  <TableCell align="right">
                    {currency_conversion.currencyFormat(
                      data.ytdDifference,
                      0,
                      true
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={getStyle(data.percentChangeYear)}
                  >
                    {data.percentChangeYear || "N/A"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableContainer
            style={{
              width: "100%",
              marginRight: "35px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">
                    <span style={{ display: "block", width: "143px" }}>
                      Ticket Price
                    </span>
                  </TableCell>
                  <TableCell align="right">Week Sales</TableCell>
                  <TableCell align="right">YTD Sales</TableCell>
                  <TableCell align="right">Percent of Total</TableCell>
                  <TableCell align="right">Prior Year Week Sales</TableCell>
                  <TableCell align="right">Prior Year YTD Sales</TableCell>
                  <TableCell align="right">Week Difference</TableCell>
                  <TableCell align="right">% Change Week</TableCell>
                  <TableCell align="right">YTD Difference</TableCell>
                  <TableCell align="right">% Change Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketData.map((x) => (
                  <TableRow>
                    <TableCell align="right">
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
                      {currency_conversion.currencyFormat(x.ytdSales, 0, true)}
                    </TableCell>
                    <TableCell align="right">{x.percentSalesYTD}</TableCell>
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
                      {x.percentChangeYear || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
};
const TotalSalesOverview = (props) => {
  const [data, setData] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = () => {
    const { instantWeeklySales, ticketBreakdown } = fetch_data;

    instantWeeklySales()
        .then((response) => {
            console.log(response)
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });

    ticketBreakdown(null, 1)
      .then((response) => {
        //removes rows not containing data.  eg: $15 price point
        let filtered = response.filter(
          (x) => x.percentChangeYear || x.currWeekSales
        );
        setTicketData(filtered);
      })
      .catch((error) => {
        setError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>{data && ticketData ? dataContainer(data, ticketData) : null}</div>
  );
};

export default TotalSalesOverview;
