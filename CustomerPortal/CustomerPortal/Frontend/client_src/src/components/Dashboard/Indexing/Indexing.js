import React, { useState, useEffect } from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../Dashboard.module.css";
import IndexingTable from "./IndexingTable";
import TicketPrices from "./TicketPrices";
import IndexingGameDetails from "./IndexingGameDetails/IndexingGameDetails";
import { fetch_data } from "../../../utils/fetch_data/fetch_data";
// /<CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Indexing = (props) => {
  const [data, setData] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [prizeStructure, setPrizeStructure] = useState([]);
  const [price, setPrice] = useState("0.00");
  const [ticketPrices, setTicketPrices] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [week, SetWeek] = useState("1");

  const classes = useStyles();
  const fetchSearchData = () => {
    customerIndexBasic(price, start, end, week)
      .then((response) => setData(response || []))
      .catch((error) => console.error(error));
  };

  const fetchGameData = (id) => {
    setGameData(null);

    setTimeout(() => setGameData({}), 150);

    setTimeout(() => {
      singlePublishedGame(id)
        .then((data) => setGameData(data))
        .catch((error) => console.error(error));

      fetchGamePrizeStructure(id)
        .then((data) => setPrizeStructure(data || []))
        .catch((error) => console.error(error));
    }, 750);
  };

  useEffect(() => {
    getTicketPrices()
      .then((response) => {
        setTicketPrices(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const hasData = () => data && data.length;
  const hasGameData = () => gameData;

  return (
    
    <main>
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
              }}
              price={price}
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

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start To:"
            placeholder=""
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Index Week:"
            value={week}
            onChange={(e) => SetWeek(e.target.value)}
          />

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
