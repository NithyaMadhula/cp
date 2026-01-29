import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { currency_conversion } from "../../../utils/currency/currency_conversion";

const TicketPrices = (props) => {
  return (
    <FormControl style={{ minWidth: "100px", margin: "0 10px" }}>
      <InputLabel id="demo-simple-select-label">Ticket Price</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.price}
        onChange={props.onchange}        
      >
        {props.ticketPrices.map((x) => (
          <MenuItem value={x.value}>
            {currency_conversion.currencyFormat(x.value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TicketPrices;
