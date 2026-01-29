import * as React from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "reactstrap";
import IndexingTable from "./IndexingTable";
import TicketPrices from "./TicketPrices";
import IndexingGameDetails from "../IndexingGameDetails/IndexingGameDetails";
import { fetch_data } from "../../../shared/utils/fetch_data";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CSVLink } from "react-csv";
import GetApp from "@material-ui/icons/GetApp";
import ResultsCount from "../ResultsCount";
import Tooltip from "@material-ui/core/Tooltip";

const {
  customerIndexBasic,
  getTicketPrices,
  singlePublishedGame,
  fetchGamePrizeStructure,
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

const date = new Date();
const year = date.getFullYear();
const month = (1 + date.getMonth()).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const today = `${year}-${month}-${day}`;

const Indexing = (props: any) => {
  const [data, setData] = React.useState([]);
  const [gameData, setGameData] = React.useState<any>(null);
  const [prizeStructure, setPrizeStructure] = React.useState([]);
  const [price, setPrice] = React.useState("0.00");
  const [ticketPrices, setTicketPrices] = React.useState([]);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState(today);
  const [week, SetWeek] = React.useState("5");
  const [hasResults, setHasResults] = React.useState(false);

  const classes = useStyles();
  const fetchSearchData = () => {
    customerIndexBasic(price, start, end, week)
      .then((response: any) => {
        setData(response || []);
        setHasResults(true);
      })
      .catch((error: any) => console.error(error));
  };

  const fetchGameData = (id: any) => {
    setGameData(null);

    setTimeout(() => setGameData({}), 150);

    setTimeout(() => {
      singlePublishedGame(id)
        .then((data: any) => setGameData(data))
        .catch((error: any) => console.error(error));

      fetchGamePrizeStructure(id)
        .then((data: any) => setPrizeStructure(data || []))
        .catch((error: any) => console.error(error));
    }, 750);
  };

  React.useEffect(() => {
    getTicketPrices()
      .then((response: any) => {
        setTicketPrices(response);
      })
      .catch((error) => console.error(error));
  }, [setTicketPrices]);

  React.useEffect(() => {
    const subscription = props.source?.subscribe();
    return () => {
      subscription?.unsubscribe();
    };
  }, [props.source]);

  const hasData = () => data && data.length;
  const hasGameData = () => gameData;

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

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Index Week:"
            value={week}
            onChange={(e: any) => SetWeek(e.target.value)}
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
                  filename={`indexing-${new Date().toLocaleDateString()}.csv`}
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
              disabled={!price || !start || !end || !week}
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
        <IndexingTable data={data} onGameSelect={fetchGameData}></IndexingTable>
      )) ||
        ""}

      {(hasGameData() && (
        <IndexingGameDetails
          gameData={gameData}
          prizeStructure={prizeStructure}
        ></IndexingGameDetails>
      )) ||
        ""}
    </main>
  );
};

export default Indexing;
