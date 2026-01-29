import React, { useState } from "react";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "../Dashboard.module.css";
import SalesSellThruByPricePointTable from "./SalesSellThruByPricePointTable";

import { fetch_data } from "../../../utils/fetch_data/fetch_data";

const { fetchDynamicPricePoint } = fetch_data;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const SalesSellThruByPricePoint = props => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("0.00");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const classes = useStyles();
  const fetchSearchData = () => {
    console.log(`this.price:${price}`);
    console.log(`this.start:${start}`);
    console.log(`this.end:${end}`);

    fetchDynamicPricePoint(price, start, end)
      .then(response => setData(response || []))
      .catch(error => console.error(error));
  };

  const hasData = () => data && data.length;

  return (
    <main>
      <Card className={styles["dashboard-card"]}>
        <form
          noValidate
          className={classes.container}
          style={{ width: "100%" }}
        >
          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Ticket Price:"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start From:"
            placeholder=""
            type="date"
            value={start}
            onChange={e => setStart(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start To:"
            placeholder=""
            type="date"
            value={end}
            onChange={e => setEnd(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            style={{
              float: "right",
              backgroundColor: "#159cdb",
              margin: "auto 10px 0 auto"
            }}
            onClick={fetchSearchData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      <br />
      
      {(hasData() && <SalesSellThruByPricePointTable data={data}></SalesSellThruByPricePointTable>) || ""}
    </main>
  );
};

export default SalesSellThruByPricePoint;
