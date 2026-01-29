import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { currency_conversion } from "../../../shared/utils/currency_conversion";

const TicketPrices = (props: any) => {
  return (
    <FormControl style={{ minWidth: "100px", margin: "0 10px" }}>
      <InputLabel>Ticket Price</InputLabel>
      <Select
        value={props.price || 0}
        onChange={props.onchange}
      >
        {props.ticketPrices.map((x: any) => (
          <MenuItem value={x.value}>
            {currency_conversion.currencyFormat(x.value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TicketPrices;
