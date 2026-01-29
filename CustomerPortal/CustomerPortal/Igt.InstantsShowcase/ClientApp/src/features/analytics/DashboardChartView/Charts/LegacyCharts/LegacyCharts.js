import React from "react";
import Plot from "react-plotly.js";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketPrices from "./TicketPrices";

//API Data Fetch
import { fetch_data } from "../../../../../shared/utils/fetch_data";
import { currency_conversion } from "../../../../../shared/utils/currency_conversion";

const {
  fetchWeeklySalesSnapshot,
  fetchWeeklySalesYear,
  fetchWeeklySalesYearPricePoint,
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

const LegacyCharts = (props) => {
  const [snapshot, setSnapshot] = React.useState([]);
  const [salesYear, setSalesYear] = React.useState([]);
  const [salesYearPricePoint, setSalesYearPricePoint] = React.useState([]);
  const [ticketPrices, setTicketPrices] = React.useState([]);
  const [price, setPrice] = React.useState("0.00");
  const [maxSales, setMaxSales] = React.useState([]);
  const [maxSalesPricePoint, setMaxSalesPricePoint] = React.useState([]);

  const classes = useStyles();

  const fetchData = () => {
    getTicketPrices()
      .then((response) => {
        setTicketPrices(response);

        if (response.length > 0) {
          handlePrice(response[0].value);
        }
      })
      .catch((error) => console.error(error));
      { 
       /** This is commented out due to a server error not returning the data fetch*/
    fetchWeeklySalesSnapshot().then((response) => {
      let mapping = [];
      let filtered = response.filter((x) => x.priorWeekSales || x.currentWeekSales);
        
      mapping.push({
        x: filtered.map((x) => x.ticketPrice),
        y: filtered.map((x) => x.priorWeekSales),
        name: filtered[0].priorYear,
        type: "bar",
      });

      mapping.push({
        x: filtered.map((x) => x.ticketPrice),
        y: filtered.map((x) => x.currentWeekSales),
        name: filtered[0].currentYear,
        type: "bar",
      });

      setSnapshot(mapping);
    });
    }
    fetchWeeklySalesYear().then((response) => {
      let mapping = [];
      const years = response
        .map((x) => x.year)
        .filter((v, i, s) => s.indexOf(v) === i);

      for (let i = 0; i < years.length; i++) {
        const filtered = response.filter((x) => x.year == years[i]);

        mapping.push({
          y: filtered.map((x) => x.weekSales),
          x: Array.from({ length: filtered.length }, (v, k) => k + 1),
          name: years[i],
          type: "line",
        });
      }

      setSalesYear(mapping);

      if (mapping.length) {
        setMaxSales(Math.max(...response.map((x) => x.weekSales)));
      }
    });
  };

  const handlePrice = (newPrice) => {
    setPrice(newPrice);

    fetchWeeklySalesYearPricePoint(newPrice)
      .then((response) => {
        let mapping = [];

        const years = response
          .map((x) => x.year)
          .filter((v, i, s) => s.indexOf(v) === i);

        for (let i = 0; i < years.length; i++) {
          const filtered = response.filter((x) => x.year == years[i]);

          mapping.push({
            y: filtered.map((x) => x.weekSales),
            x: Array.from({ length: filtered.length }, (v, k) => k + 1),
            name: years[i],
            type: "line",
          });
        }

        setSalesYearPricePoint(mapping);

        if (mapping.length) {
          setMaxSalesPricePoint(Math.max(...response.map((x) => x.weekSales)));
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchWeeklySalesByPricepoint = () => {
    fetchWeeklySalesYearPricePoint(price)
      .then((response) => setSalesYearPricePoint(response || []))
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ margin: "20px auto", width: "100%" }}>
      <Card>
        <h3 className="section-text pl-2">
          Sales By Ticket Price - Fiscal YTD and Prior Period
        </h3>
        <Plot
          style={{ width: "100%", height: "100%" }}
          data={snapshot}
          layout={{
            flexGrow: "1",
            width: 1250,
            height: 500,
            font: { family: "'Verlag A', 'Verlag B'" },
            xaxis: {
              tickvals: ticketPrices.map((x) => x.value),
              ticktext: ticketPrices.map((x) =>
                currency_conversion.currencyFormat(x.value)
              ),
              type: "category",
            },
          }}
        ></Plot>
      </Card>
      <br></br>
      <Card>
        <h3 className="section-text pl-2">
          Weekly Sales Current &amp; Prior Fiscal Years
        </h3>
        <Plot
          style={{ width: "100%", height: "100%" }}
          data={salesYear}
          layout={{
            flexGrow: "1",
            width: 1250,
            height: 500,
            font: { family: "'Verlag A', 'Verlag B'" },
            xaxis: { title: "Fiscal Week" },
            yaxis: { range: [0, maxSales * 1.2] },
          }}
        ></Plot>
      </Card>
      <br></br>
      <Card>
        <form
          noValidate
          className={classes.container}
          style={{
            width: "50%",
            position: "relative",
            top: "100px",
            zIndex: 2,
          }}
        >
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: "100px" }}
              ticketPrices={ticketPrices}
              onchange={(e) => {
                handlePrice(e.target.value);
              }}
              price={price}
            ></TicketPrices>
          )) ||
            ""}
        </form>

        {salesYearPricePoint && salesYearPricePoint.length ? (
          <>
            <h3 className="section-text pl-2">
              {`$${price}.00 - Weekly Sales Current & Prior Fiscal Years`}
            </h3>
            <Plot
              style={{ width: "100%", height: "100%" }}
              data={salesYearPricePoint}
              layout={{
                flexGrow: "1",
                width: 1250,
                height: 500,
                font: { family: "'Verlag A', 'Verlag B'" },
                xaxis: { title: "Fiscal Week" },
                yaxis: { range: [0, maxSalesPricePoint * 1.2] },
              }}
            ></Plot>
          </>
        ) : (
          <></>
        )}
      </Card>
      <br />
    </div>
  );
};

export default LegacyCharts;
