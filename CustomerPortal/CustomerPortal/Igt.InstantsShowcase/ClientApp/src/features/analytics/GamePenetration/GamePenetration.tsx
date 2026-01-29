import * as React from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";
import TicketPrices from "./TicketPrices";
import WeekEndings from "./WeekEndings";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Plot from "react-plotly.js";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import CircularProgress from "@material-ui/core/CircularProgress";

import { fetch_data } from "../../../shared/utils/fetch_data";
import ResultsCount from "../ResultsCount";

const {
  fetchWeeklyGamePenetration,
  fetchWeeksInMarketPenetration,
  fetchRateOfSalesPenetration,
  fetchRateOfSalesTrendPenetration,
  getSalesWeekEndings,
  getTicketPrices,
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

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const GamePenetration = (props: any) => {
  const [activeData, setActiveData] = React.useState([]);
  const [activeTotal, setActiveTotal] = React.useState(1);
  const [marketWeeksData, setMarketWeeksData] = React.useState<any[]>([]);
  const [marketTotal, setMarketTotal] = React.useState(1);
  const [isGamePenLoaded, setIsGamePenLoaded] = React.useState(false);
  const [rosData, setRosData] = React.useState<any>([]);
  const [rosTrendData, setRosTrendData] = React.useState<any>([]);
  const [price, setPrice] = React.useState("0.00");
  const [ticketPrices, setTicketPrices] = React.useState([]);
  const [week, setWeek] = React.useState(null);
  const [weekEndings, setWeekEndings] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [start, setStart] = React.useState("");
  const [rosPrice, setRosPrice] = React.useState("0.00");
  const [rosTrendLoaded, setRosTrendLoaded] = React.useState(false);

  const classes = useStyles();
  const fetchSearchData = () => {
    setIsGamePenLoaded(true);
    setActiveData([]);

    fetchWeeklyGamePenetration(week, price)
      .then((response: any) => {
        let total = response
          .map((x: any) => x.actualPrintRun)
          .reduce((a: any, b: any) => a + b, 0);

        setActiveTotal(total);

        const activeDataMapping =
          response?.map((v: any) => ({
            x: [v.penPercentage * 100],
            y: [v.currentWeekValidations],
            mode: "markers",
            marker: {
              color: "#1b9ddb",
                line: { color: "#002EE5", width: 2 },
              size: getActiveMarkerSize(v.actualPrintRun),
            },
            text: [v.tooltipInfo],
            name: `${v.gameName} - ${v.gameNumber}`,
          })) ?? [];

        setActiveData(activeDataMapping || []);
      })
      .catch((error: any) => console.error(error));

    fetchWeeksInMarketPenetration(week, price)
      .then((response: any) => {
        let total = response
          .map((x: any) => x.invRemaining)
          .reduce((a: any, b: any) => a + b, 0);

        setMarketTotal(total);

        const resultMarketWeeksData =
          response?.map((v: any) => ({
            x: [v.penPercentage * 100],
            y: [v.validationAmt],
            mode: "markers",
            marker: {
              color: v.bubbleColor.toLowerCase(),
              line: { color: "#555", width: 2 },
              size: getMarketMarkerSize(v.invRemaining),
            },
            text: [v.tooltipInfo],
            name: `${v.gameName} - ${v.gameNumber}`,
          })) ?? [];

        setMarketWeeksData(resultMarketWeeksData);
      })
      .catch((error: any) => console.error(error));

    fetchRateOfSalesPenetration(week, price)
      .then((response: any) => {
        const rosData = response?.length
          ? [
              {
                x: [...response.map((x: any) => x.gameName)],
                y: [...response.map((x: any) => x.rate)],
                type: "bar",
                text: [...response.map((x: any) => x.tooltipInfo)],
                marker: {
                  color: [
                    ...response.map((x: any) =>
                        x.price.replace("$", "") == price ? "#ff902e" : "#002EE5"
                    ),
                  ],
                },
              },
            ]
          : [];

        setRosData(rosData);
      })
      .catch((error: any) => console.error(error));
  };

  const fetchRosData = () => {
    fetchRateOfSalesTrendPenetration(start, rosPrice)
      .then((response: any) => {
        let mapping = [];
        response = response || [];

        const games = response
          .map((x: any) => x.gameNumber)
          .filter((v: any, i: any, s: any) => s.indexOf(v) === i);

        for (let i = 0; i < games.length; i++) {
          const filtered = response.filter(
            (x: any) => x.gameNumber == games[i]
          );

          mapping.push({
            y: filtered.map((x: any) => x.rate),
            x: (Array as any).from(
              { length: filtered.length },
              (v: any, k: any) => k + 1
            ),
            name: `${games[i]} - ${filtered[0].gameName}`,
            text: filtered.map((x: any) => x.tooltipInfo),
            type: "line",
          });
        }

        setRosTrendData(mapping);
        setRosTrendLoaded(true);
      })
      .catch((error: any) => console.error(error));
  };

  const hasData = (data: any) => data && data.length;
  const handleChange = (event: any, newValue: any) => setIndex(newValue);
  const getActiveMarkerSize = (value: any) => {
    const size = (value / activeTotal) * 100 * 5;
    return size > 10 ? (size > 50 ? 50 : size) : 10;
  };

  const getMarketMarkerSize = (value: any) => {
    const size = (value / marketTotal) * 100 * 5;
    return size > 10 ? (size > 75 ? 75 : size) : 10;
  };

  React.useEffect(() => {
    getTicketPrices()
      .then((response: any) => {
        setTicketPrices(response);
      })
      .catch((error: any) => console.error(error));

    getSalesWeekEndings()
      .then((response: any) => {
        setWeekEndings(response);
      })
      .catch((error: any) => console.error(error));
  }, [setTicketPrices, setWeekEndings]);

  return (
    <main>
      <Card className={"dashboard-card"}>
        <h3 className="section-text pl-2">Game Penetration</h3>
        <form
          noValidate
          className={classes.container + " py-2"}
          style={{ width: "100%" }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e: any) => {
                setPrice(e.target.value);
                if (isGamePenLoaded) {
                  fetchSearchData();
                }
              }}
              price={price}
            ></TicketPrices>
          )) || (
            <CircularProgress
              style={{ width: "25px", height: "25px", margin: "15px" }}
            />
          )}

          {(weekEndings.length && (
            <WeekEndings
              style={{ minWidth: "100px" }}
              weekEndings={weekEndings}
              onchange={(e: any) => {
                setWeek(e.target.value);
                if (isGamePenLoaded) {
                  fetchSearchData();
                }
              }}
              week={week}
            ></WeekEndings>
          )) || (
            <CircularProgress
              style={{ width: "25px", height: "25px", margin: "15px" }}
            />
          )}

          <Button
            disabled={!price || !week}
            color="primary"
            className="ml-auto"
            onClick={fetchSearchData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      <br />
      {isGamePenLoaded ? (
        <Card style={{ height: "65vh" }}>
          <div
            style={{
              height: "100vh",
              width: "100%",
              overflowY: "scroll",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={index}
              onChange={handleChange}
              style={{
                height: "100%",
                minWidth: "175px",
                  background: "#002EE5",
              }}
              TabIndicatorProps={{ style: { background: "#ff902e" } }}
            >
              <Tab
                label={
                  <>
                    <span style={{ display: "block" }}>Active Penetration</span>
                    <span style={{ fontSize: "10px" }}>
                      Bubble Size: Print Run
                    </span>
                  </>
                }
                {...a11yProps(0)}
                style={{ color: "#FFFFFF" }}
              />
              <Tab
                {...a11yProps(1)}
                style={{ color: "#FFFFFF" }}
                label={
                  <>
                    <span style={{ display: "block" }}>Active Penetration</span>
                    <span style={{ fontSize: "10px" }}>
                      Bubble Size: Remaining Inventory
                    </span>
                  </>
                }
              />
              <Tab
                {...a11yProps(2)}
                style={{ color: "#FFFFFF" }}
                label={`Rate of Sale (${week})`}
              />
            </Tabs>
            <div
              hidden={index !== 0}
              style={{
                flexGrow: 1,
                maxHeight: "65vh",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: index !== 0 ? "none" : "flex",
              }}
            >
              {hasData(activeData) ? (
                <Plot
                  style={{ flexGrow: 1 }}
                  data={activeData}
                  layout={{
                    width: 1250,
                    height: 500,
                    title: "Active Penetration vs. Sales (validations)",
                    font: { family: "'Verlag A', 'Verlag B'" },
                    xaxis: {
                      title: "Active Penetration %",
                      tickvals: [20, 40, 60, 80],
                      ticktext: ["20%", "40%", "60%", "80%"],
                    },
                    yaxis: {
                      title: "Sales based on Validations",
                      tickvals: [-500000, 0, 500000, 1000000, 1500000],
                      ticktext: [
                        "  -$.5MM",
                        "  $0",
                        "  $.5MM",
                        "  $1MM",
                        "  $1.5MM",
                      ],
                    },
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div
              hidden={index !== 1}
              style={{
                flexGrow: 1,
                maxHeight: "65vh",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: index !== 1 ? "none" : "flex",
                flexDirection: "column",
              }}
            >
              {hasData(marketWeeksData) ? (
                <>
                  <Plot
                    style={{ flexGrow: 1 }}
                    data={marketWeeksData}
                    layout={{
                      width: 1250,
                      height: 500,
                      title: "Active Penetration vs. Sales (validations)",
                      font: { family: "'Verlag A', 'Verlag B'" },
                      xaxis: {
                        title: "Active Penetration %",
                        tickvals: [20, 40, 60, 80],
                        ticktext: ["20%", "40%", "60%", "80%"],
                      },
                      yaxis: {
                        title: "Sales based on Validations",
                        tickvals: [-500000, 0, 500000, 1000000, 1500000],
                        ticktext: [
                          "  -$.5MM",
                          "  $0",
                          "  $.5MM",
                          "  $1MM",
                          "  $1.5MM",
                        ],
                      },
                    }}
                  />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      width: "600px",
                      paddingRight: "125px",
                    }}
                  >
                    <span style={{ flex: "1" }}>
                      <FiberManualRecordIcon style={{ color: "green" }} /> 0-13
                      Weeks
                    </span>
                    <span style={{ flex: "1" }}>
                      <FiberManualRecordIcon style={{ color: "blue" }} /> 14-26
                      Weeks
                    </span>
                    <span style={{ flex: "1" }}>
                      <FiberManualRecordIcon style={{ color: "yellow" }} />{" "}
                      27-52 Weeks
                    </span>
                    <span style={{ flex: "1" }}>
                      <FiberManualRecordIcon style={{ color: "red" }} />
                      53+ Weeks
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              hidden={index !== 2}
              style={{
                flexGrow: 1,
                maxHeight: "65vh",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: index !== 2 ? "none" : "flex",
              }}
            >
              <Plot
                style={{ flexGrow: 1 }}
                data={rosData}
                layout={{
                  width: 1250,
                  height: 540,
                  margin: { b: 140 },
                  title: `Rate of Sales for ${week}`,
                  font: { family: "'Verlag A', 'Verlag B'" },
                  showlegend: false,
                  bargap: 0.2,
                  xaxis: {
                    tickangle: -30,
                  },
                  yaxis: { title: "Sales/Retailer Activated ($)" },
                }}
              />
            </div>
          </div>
        </Card>
      ) : (
        <></>
      )}

      <Card className={"dashboard-card"}>
        <h3 className="section-text pl-2">Rate of Sale Trend By Game</h3>
        <form
          noValidate
          className={classes.container + " py-2"}
          style={{ width: "100%" }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e: any) => {
                setRosPrice(e.target.value);

                if (hasData(rosTrendData)) {
                  fetchRosData();
                }
              }}
              price={rosPrice}
            ></TicketPrices>
          )) || (
            <CircularProgress
              style={{ width: "25px", height: "25px", margin: "15px" }}
            />
          )}

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start From:"
            placeholder=""
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <Button
            disabled={!rosPrice || !start}
            color="primary"
            className="ml-auto"
            onClick={fetchRosData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      {rosTrendLoaded ? <ResultsCount count={rosTrendData?.length} /> : <br />}
      {(hasData(rosTrendData) && (
        <div style={{ margin: "20px auto" }}>
          <Card>
            <Plot
              style={{ width: "100%", height: "100%", flexGrow: 1 }}
              data={rosTrendData}
              layout={{
                width: 1250,
                height: 500,
                font: { family: "'Verlag A', 'Verlag B'" },
                title: "Rate of Sales Trend by Game",
                xaxis: { title: "Weeks after Launch" },
                yaxis: { title: "Sales/Retailer Activated ($)" },
                hovermode: "closest",
              }}
            ></Plot>
          </Card>
        </div>
      )) ||
        ""}
    </main>
  );
};

export default GamePenetration;
