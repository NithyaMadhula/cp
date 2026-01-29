import * as React from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";
import TicketPrices from "./TicketPrices";
import ClosedGamesSalesSellThruTable from "./ClosedGamesSalesSellThruTable";
import { fetch_data } from "../../../shared/utils/fetch_data";
import CircularProgress from "@material-ui/core/CircularProgress";
import GetApp from "@material-ui/icons/GetApp";
import { CSVLink } from "react-csv";
import ResultsCount from "../ResultsCount";
import Tooltip from "@material-ui/core/Tooltip";

const { fetchClosedGamesSalesSellThru, getTicketPrices } = fetch_data;

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

const date = new Date();
const year = date.getFullYear();
const month = (1 + date.getMonth()).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const today = `${year}-${month}-${day}`;

const ClosedGamesSalesSellThru = (props: any) => {
  const [data, setData] = React.useState([]);
  const [price, setPrice] = React.useState("0.00");
  const [ticketPrices, setTicketPrices] = React.useState([]);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState(today);
  const [hasResults, setHasResults] = React.useState(false);

  const classes = useStyles();
  const fetchSearchData = () => {
    fetchClosedGamesSalesSellThru(price, start, end)
      .then((response: any) => {
        let d = response || [];
        d.sort((a: any, b: any) => b.totalSales - a.totalSales);
        setData(d);
        setHasResults(true);
      })
      .catch((error: any) => console.error(error));
  };

  const hasData = () => data && data.length;

  React.useEffect(() => {
    getTicketPrices()
      .then((response: any) => {
        setTicketPrices(response);
      })
      .catch((error: any) => console.error(error));
  }, [setTicketPrices]);

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
            onChange={(e) => setStart(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start To:"
            placeholder=""
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <div style={{ float: "right", margin: "auto 10px 0 auto" }}>
            {hasData() ? (
              <Tooltip
                title={`Download report.`}
                arrow
                placement="bottom"
                style={{ fontSize: "16px", margin: "6px 1px" }}
              >
                <CSVLink
                  data={data}
                  filename={`closed-games-${new Date().toLocaleDateString()}.csv`}
                >
                  <GetApp
                    style={{
                      color: "rgb(21, 156, 219)",
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      position: "relative",
                      top: "2px",
                      left: "-10px",
                    }}
                  />
                </CSVLink>
              </Tooltip>
            ) : (
              ""
            )}

            <Button
              disabled={!price || !start || !end}
              color="primary"
              onClick={fetchSearchData}
            >
              Generate Report
            </Button>
          </div>
        </form>
      </Card>
      {hasResults ? <ResultsCount count={data.length} /> : <></>}

      {(hasData() && (
        <ClosedGamesSalesSellThruTable
          data={data}
        ></ClosedGamesSalesSellThruTable>
      )) || <></>}
    </main>
  );
};

export default ClosedGamesSalesSellThru;
