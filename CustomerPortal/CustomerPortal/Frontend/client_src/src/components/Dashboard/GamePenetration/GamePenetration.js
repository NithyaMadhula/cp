import React, { useState } from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../Dashboard.module.css";
import TicketPrices from "./TicketPrices";
import WeekEndings from "./WeekEndings";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Plot from "react-plotly.js";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { LinearProgress } from "@material-ui/core";

// /<CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetch_data } from "../../../utils/fetch_data/fetch_data";

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const GamePenetration = (props) => {
  const [activeData, setActiveData] = useState([]);
  const [activeTotal, setActiveTotal] = useState(1);
  const [marketWeeksData, setMarketWeeksData] = useState([]);
  const [marketTotal, setMarketTotal] = useState(1);
  const [isGamePenLoaded, setIsGamePenLoaded] = useState(false);
  const [rosData, setRosData] = useState([]);
  const [rosTrendData, setRosTrendData] = useState([]);
  const [price, setPrice] = useState("0.00");
  const [ticketPrices, setTicketPrices] = useState([]);
  const [week, setWeek] = useState(null);
  const [weekEndings, setWeekEndings] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [start, setStart] = useState("");
  const [rosPrice, setRosPrice] = useState("0.00");

  const classes = useStyles();
  const fetchSearchData = () => {
    setIsGamePenLoaded(true);
    setActiveData([]);

    fetchWeeklyGamePenetration(week, price)
      .then((response) => {
        let total = response
          .map((x) => x.actualPrintRun)
          .reduce((a, b) => a + b, 0);

        setActiveTotal(total);
        setActiveData(response || []);
      })
      .catch((error) => console.error(error));

    fetchWeeksInMarketPenetration(week, price)
      .then((response) => {
        let total = response
          .map((x) => x.invRemaining)
          .reduce((a, b) => a + b, 0);

        setMarketTotal(total);
        setMarketWeeksData(response || []);
      })
      .catch((error) => console.error(error));

    fetchRateOfSalesPenetration(week, price)
      .then((response) => setRosData(response || []))
      .catch((error) => console.error(error));
  };

  const fetchRosData = () => {
    fetchRateOfSalesTrendPenetration(start, rosPrice)
      .then((response) => {
        let mapping = [];
        response = response || [];

        const games = response
          .map((x) => x.gameNumber)
          .filter((v, i, s) => s.indexOf(v) === i);

        for (let i = 0; i < games.length; i++) {
          const filtered = response.filter((x) => x.gameNumber == games[i]);

          mapping.push({
            y: filtered.map((x) => x.rate),
            x: Array.from({ length: filtered.length }, (v, k) => k + 1),
            name: `${games[i]} - ${filtered[0].gameName}`,
            text: filtered.map((x) => x.tooltipInfo),
            type: "line",
          });
        }

        setRosTrendData(mapping);
      })
      .catch((error) => console.error(error));
  };

  const hasData = (data) => data && data.length;
  const handleChange = (event, newValue) => setIndex(newValue);
  const getActiveMarkerSize = (value) => {
    const size = (value / activeTotal) * 100 * 5;
    return size > 10 ? (size > 50 ? 50 : size) : 10;
  };

  const getMarketMarkerSize = (value) => {
    const size = (value / marketTotal) * 100 * 5;
    return size > 10 ? (size > 75 ? 75 : size) : 10;
  };

  React.useEffect(() => {
    getTicketPrices()
      .then((response) => {
        setTicketPrices(response);
      })
      .catch((error) => console.error(error));

    getSalesWeekEndings()
      .then((response) => {
        setWeekEndings(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h2>Game Penetration</h2>
      <Card className={styles["dashboard-card"]}>
        <form
          noValidate
          className={classes.container}
          style={{ width: "100%" }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e) => {
                setPrice(e.target.value);
                if (isGamePenLoaded) {
                  fetchSearchData();
                }
              }}
              price={price}
            ></TicketPrices>
          )) ||
          <CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />}

          {(weekEndings.length && (
            <WeekEndings
              style={{ minWidth: "100px" }}
              weekEndings={weekEndings}
              onchange={(e) => {
                setWeek(e.target.value);
                if (isGamePenLoaded) {
                  fetchSearchData();
                }
              }}
              week={week}
            ></WeekEndings>
          )) ||
          <CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />}

          <Button
            variant="contained"
            color="primary"
            style={{
              float: "right",
              backgroundColor: "#159cdb",
              margin: "auto 10px 0 auto",
            }}
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
              className={classes.tabs}
              style={{
                height: "100%",
                minWidth: "175px",
                background: "#0D51A1",
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
                flexGrow: "1",
                maxHeight: "65vh",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: index !== 0 ? "none" : "flex",
              }}
            >
              {hasData(activeData) ? (
                <Plot
                  data={[
                    ...activeData.map((x) => ({
                      x: [x.penPercentage * 100],
                      y: [x.currentWeekValidations],
                      mode: "markers",
                      marker: {
                        color: "#1b9ddb",
                        line: { color: "#0D51A1", width: 2 },
                        size: getActiveMarkerSize(x.actualPrintRun),
                      },
                      text: [x.tooltipInfo],
                      name: `${x.gameName} - ${x.gameNumber}`,
                    })),
                  ]}
                  layout={{
                    flexGrow: "1",
                    width: 1250,
                    height: 500,
                    title: "Active Penetration vs. Sales (validations)",
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
                flexGrow: "1",
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
                    data={[
                      ...marketWeeksData.map((x) => ({
                        x: [x.penPercentage * 100],
                        y: [x.validationAmt],
                        mode: "markers",
                        marker: {
                          color: x.bubbleColor.toLowerCase(),
                          line: { color: "#555", width: 2 },
                          size: getMarketMarkerSize(x.invRemaining),
                        },
                        text: [x.tooltipInfo],
                        name: `${x.gameName} - ${x.gameNumber}`,
                      })),
                    ]}
                    layout={{
                      flexGrow: "1",
                      width: 1250,
                      height: 500,
                      title: "Active Penetration vs. Sales (validations)",
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
                flexGrow: "1",
                maxHeight: "65vh",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                display: index !== 2 ? "none" : "flex",
              }}
            >
              <Plot
                data={[
                  {
                    x: [...rosData.map((x) => x.gameName)],
                    y: [...rosData.map((x) => x.rate)],
                    type: "bar",
                    text: [...rosData.map((x) => x.tooltipInfo)],
                    marker: {
                      color: [
                        ...rosData.map((x) =>
                          x.price.replace("$", "") == price
                            ? "#ff902e"
                            : "#0D51A1"
                        ),
                      ],
                    },
                  },
                ]}
                layout={{
                  flexGrow: "1",
                  width: 1250,
                  height: 540,
                  margin: { b: 140 },
                  title: `Rate of Sales for ${week}`,
                  showlegend: false,
                  bargap: 0.2,
                  xaxis: {
                    tickangle: -30,
                  },
                }}
              />
            </div>
          </div>
        </Card>
      ) : (
        <></>
      )}

      <h2>Rate of Sale Trend By Game</h2>
      <Card className={styles["dashboard-card"]}>
        <form
          noValidate
          className={classes.container}
          style={{ width: "100%" }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e) => {
                setRosPrice(e.target.value);
              }}
              price={rosPrice}
            ></TicketPrices>
          )) ||
          <CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />}

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
            variant="contained"
            color="primary"
            style={{
              float: "right",
              backgroundColor: "#159cdb",
              margin: "auto 10px 0 auto",
            }}
            onClick={fetchRosData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      <br />
      {(hasData(rosTrendData) && (
        <div style={{ margin: "20px auto" }}>
          <Card>
            <Plot
              style={{ width: "100%", height: "100%" }}
              data={rosTrendData}
              layout={{
                flexGrow: "1",
                width: 1250,
                height: 500,
                title: "Rate of Sales Trend by Game",
                xaxis: { title: "Weeks after Launch" },
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
