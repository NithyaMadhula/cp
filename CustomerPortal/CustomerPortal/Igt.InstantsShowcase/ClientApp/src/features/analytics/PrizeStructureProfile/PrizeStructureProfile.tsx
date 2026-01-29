import * as React from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";
import TicketPrices from "./TicketPrices";
import LotteriesOfInterest from "./LotteriesOfInterest";
import ExcludedGames from "./ExcludedGames";
import { fetch_data } from "../../../shared/utils/fetch_data";
import Plot from "react-plotly.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { currency_conversion } from "../../../shared/utils/currency_conversion";

const { getUser, getTicketPrices, fetchPrizeStructureProfile } = fetch_data;

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

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const LOI_KEY = "lotteries-of-interest";

const mapToLine = (value: any) => {
  let mapping = [];

  const mappedGames = (value || [])
    .map((x: any) => x.GameID)
    .filter((v: any, i: any, s: any) => s.indexOf(v) === i);

  for (let i = 0; i < mappedGames.length; i++) {
    const filtered = value.filter((x: any) => x.GameID == mappedGames[i]);

    mapping.push({
      y: filtered.map((x: any) => x["Percentage Allocated"] * 100),
      x: filtered.map((x: any) => x["Prize Tier Type"]),
      name: `${filtered[0].GameReferenceID} - ${
        filtered[0].GameName || filtered[0]["Game Name"]
            }`,

      text: filtered.map((x: any) => x["Tooltip Info"]),
      source: filtered,
      type: "line",
    });
  }
  return mapping;
};

const mapTotalToLine = (value: any, isComparison?: any) => ({
  y: value.map((x: any) => x.AveragePLPercentAllocated * 100),
    x: value.map((x: any) => x.prizeClassification),
    name: `${isComparison ? value[0].SubDivisionCode : ""} Total % Allocation`,

  text: value.map(
    (x: any) =>
      `${isComparison ? value[0].SubDivisionCode : ""} Total Allocation (${
        x.prizeClassification
          }) - ${(x.AveragePLPercentAllocated * 100).toFixed(2)}%`
  ),
  type: "line",
  line: isComparison
    ? { width: 4.5 }
    : {
        color: "rgb(0, 0, 0)",
        width: 4.5,
      },
});

const mapComparisonTotalToLine = (value: any) => {
  let mapping = [];

  const mappedSubdivision = (value || [])
    .map((x: any) => x.SubDivisionCode)
    .filter((v: any, i: any, s: any) => s.indexOf(v) === i);

  for (let i = 0; i < mappedSubdivision.length; i++) {
    const filtered = value.filter(
      (x: any) => x.SubDivisionCode == mappedSubdivision[i]
    );

    mapping.push(mapTotalToLine(filtered, true));
  }
  return mapping;
};

const getTopPrizeComparisonOdds = (value: any) => {
  return [
    {
      x: value.map((x: any) => x.LocalAbbreviation),
      y: value.map((y: any) => y.AverageOdds),
      text: value.map((x: any) => `Odds: ${Number(x.AverageOdds).toFixed(2)}`),
      marker: {
        color: value.map((x: any) =>
            x.LocalAbbreviation == "VA" ? "#ff902e" : "#002EE5"
        ),
      },
      name: "Average Odds",
      type: "bar",
    },
  ];
};

const getTopPrizeComparisonPrize = (value: any) => {
  return [
    {
      x: value.map((x: any) => x.LocalAbbreviation),
      y: value.map((y: any) => y.AverageTopPrizeAmount),
      text: value.map(
        (y: any) =>
          `Average Top Prize Amount: ${currency_conversion.currencyFormat(
            y.AverageTopPrizeAmount
          )}`
      ),
      marker: {
        color: value.map((x: any) =>
            x.LocalAbbreviation == "VA" ? "#ff902e" : "#002EE5"
        ),
      },
      name: "Average Top Prize",
      type: "bar",
    },
  ];
};

const getTopPrizeComparisonPrizeOdds = (value: any) => {
  // averageTopPrizeOdds: 844607.80920817761,
  return [
    {
      x: value.map((x: any) => x.LocalAbbreviation),
      y: value.map((y: any) => numberWithCommas(y.AverageTopPrizeOdds)),
      text: value.map(
        (y: any) =>
          `Average Top Prize Odds:  ${numberWithCommas(
            Number(y.AverageTopPrizeOdds).toFixed(2)
          )}`
      ),
      marker: {
        color: value.map((x: any) =>
            x.LocalAbbreviation == "VA" ? "#ff902e" : "#002EE5"
        ),
      },
      name: "Average Top Prize Odds",
      type: "bar",
    },
  ];
};

const date = new Date();
const year = date.getFullYear();
const month = (1 + date.getMonth()).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const today = `${year}-${month}-${day}`;

const PrizeStructureProfile = (props: any) => {
  const [classficationByCustomer, setClassficationByCustomer] = React.useState(
    []
  );
  const [percentByExclusion, setPercentByExclusion] = React.useState([]);
  const [percentTotalByExclusion, setPercentTotalByExclusion] = React.useState(
    []
  );
  const [topPrizeByExclusion, setTopPrizeByExclusion] = React.useState([]);
  const [games, setGames] = React.useState([]);
  const [percentByCustomer, setPercentByCustomer] = React.useState([]);
  const [percentTotalByCustomer, setPercentTotalByCustomer] = React.useState(
    []
  );
  const [topPrizeByCustomer, setTopPrizeByCustomer] = React.useState([]);
  const [
    percentTotalByComparison,
    setPercentTotalByComparison,
  ] = React.useState([]);
  const [topPrizeByComparison, setTopPrizeByComparison] = React.useState([]);
  const [
    classficationByComparison,
    setClassficationByComparison,
  ] = React.useState([]);

  const [ticketPrices, setTicketPrices] = React.useState([]);
  const [price, setPrice] = React.useState(null);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState(today);
  const [customerCodes, setCustomerCodes] = React.useState<string[]>([]);
  const [excludeGameIds, setExcludeGameIds] = React.useState([]);

  const hasData = (data: any) => data && data.length;

  const getData = (value?: any) => {
    let gameIds = excludeGameIds;
    if (value) {
      gameIds = value;
    }

    return fetchPrizeStructureProfile(
      price,
      start,
      end || new Date(),
      customerCodes ? customerCodes.join(",") : null,
      gameIds.length ? gameIds.join(",") : null
    );
  };

  const classes = useStyles();
  const fetchSearchData = () => {
    getData()
      .then((response: any) => {
        setClassficationByCustomer(response.ClassficationByCustomer);
        setGames(response.Games);
        setPercentByCustomer(
          excludeGameIds && excludeGameIds.length
            ? response.PercentByExclusion
            : response.PercentByCustomer
        );
        setPercentTotalByCustomer(
          excludeGameIds && excludeGameIds.length
            ? response.PercentTotalByExclusion
            : response.PercentTotalByCustomer
        );
        setTopPrizeByCustomer(
          excludeGameIds && excludeGameIds.length
            ? response.TopPrizeByExclusion
            : response.TopPrizeByCustomer
        );

        if (customerCodes) {
          setPercentTotalByComparison(response.PercentTotalByComparison);
          setTopPrizeByComparison(response.TopPrizeByComparison);
          setClassficationByComparison(response.ClassficationByComparison);
        }
      })
      .catch((error: any) => console.error(error));
  };
  React.useEffect(() => {
    getUser()
      .then((response: any) => {
        setCustomerCodes([response.organizationCode]);
      })
      .catch((error: any) => console.error(error));

    getTicketPrices()
      .then((response: any) => {
        setTicketPrices(response);
      })
      .catch((error) => console.error(error));
  }, [setCustomerCodes, setTicketPrices]);

  const updateWithExclusion = (value: any) => {
    getData(value)
      .then((response: any) => {
        setExcludeGameIds(value);
        setPercentByExclusion(response.PercentByExclusion);
        setPercentTotalByExclusion(response.PercentTotalByExclusion);

        setPercentByCustomer(response.PercentByExclusion);
        setPercentTotalByCustomer(response.PercentTotalByExclusion);
      })
      .catch((error: any) => console.error(error));
  };

  return (
    <main>
      <Card className={"dashboard-card"}>
        <form
          noValidate
          className={classes.container}
          style={{ width: "100%" }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e: any) => {
                setPrice(e.target.value);
              }}
              price={price}
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
            onChange={(e: any) => setStart(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start To:"
            placeholder=""
            type="date"
            value={end}
            onChange={(e: any) => setEnd(e.target.value)}
          />

          <LotteriesOfInterest handleChange={setCustomerCodes} />
          <ExcludedGames
            data={games}
            excludeGameIds={excludeGameIds}
            setExcludeGameIds={setExcludeGameIds}
            update={updateWithExclusion}
          />

          <Button
            disabled={!price || !start || !end}
            color="primary"
            className="ml-auto mt-2"
            onClick={fetchSearchData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      <br />
      {(hasData(percentByCustomer) && (
        <div style={{ margin: "20px auto" }}>
          <Card>
            <Plot
              style={{ flexGrow: 1, width: "100%", height: "100%" }}
              data={
                [
                  ...mapToLine(percentByCustomer),
                  mapTotalToLine(percentTotalByCustomer),
                ] as any[]
              }
              layout={{
                width: 1250,
                height: 500,
                margin: { b: 100 },
                title: "Prize Structure Profile",
                xaxis: { title: { text: "Tiers", font: { size: 10.5 } } },
                  font: { family: "'Verlag A', 'Verlag B'" },
                yaxis: {
                  title: {
                    text: "% of Prize Fund Allocated",
                    font: { size: 10.5 },
                  },
                },
                hovermode: "closest",
              }}
            ></Plot>
          </Card>
        </div>
      )) ||
        ""}

      {(hasData(percentTotalByComparison) && (
        <div style={{ margin: "20px auto" }}>
          <Card>
            <Plot
              style={{ flexGrow: 1, width: "100%", height: "100%" }}
              data={mapComparisonTotalToLine(percentTotalByComparison) as any[]}
              layout={{
                width: 1250,
                height: 500,
                margin: { b: 100 },
                title: "Static Prize Structure Profiles of Selected Lotteries",
                font: { family: "'Verlag A', 'Verlag B'" },
                xaxis: { title: { text: "Tiers", font: { size: 10.5 } } },
                yaxis: {
                  title: {
                    text: "% of Prize Fund Allocated",
                    font: { size: 10.5 },
                  },
                },
                hovermode: "closest",
              }}
            ></Plot>
          </Card>
        </div>
      )) ||
        ""}

      {(hasData(topPrizeByComparison) && (
        <div style={{ margin: "20px auto" }}>
          <Card style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <Plot
                style={{ flex: 1, height: "100%" }}
                data={getTopPrizeComparisonOdds(topPrizeByComparison) as any[]}
                layout={{
                  width: 400,
                  height: 500,
                  margin: { b: 100 },
                  font: { family: "'Verlag A', 'Verlag B'" },
                  title: "Average Odds",
                  hovermode: "closest",
                }}
              ></Plot>
            </div>
            <div style={{ flex: 1 }}>
              <Plot
                style={{ flexGrow: 1, height: "100%" }}
                data={getTopPrizeComparisonPrize(topPrizeByComparison) as any[]}
                layout={{
                  width: 400,
                  height: 500,
                  font: { family: "'Verlag A', 'Verlag B'" },
                  margin: { b: 100 },
                  title: "Average Top Prize",
                  hovermode: "closest",
                }}
              ></Plot>
            </div>
            <div style={{ flex: 1 }}>
              <Plot
                style={{ flexGrow: 1, height: "100%" }}
                data={
                  getTopPrizeComparisonPrizeOdds(topPrizeByComparison) as any[]
                }
                layout={{
                  width: 400,
                  height: 500,
                  margin: { b: 100 },
                  title: "Average Top Prize Odds",
                  font: { family: "'Verlag A', 'Verlag B'" },
                  hovermode: "closest",
                }}
              ></Plot>
            </div>
          </Card>
        </div>
      )) ||
        ""}
    </main>
  );
};

export default PrizeStructureProfile;
