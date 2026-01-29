import * as React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const formatDate = (date: any) => new Date(date).toLocaleDateString();

const WeekEndings = (props: any) => {
  return (
    <FormControl style={{ minWidth: "140px", margin: "0 10px" }}>
      <InputLabel>Week Ending</InputLabel>
      <Select
        value={props.week}
        onChange={props.onchange}
        MenuProps={{ style: { maxHeight: "400px", textAlign: "center" } }}
      >
        {props.weekEndings.map((x: any) => (
          <MenuItem value={x.weekEnding}>{formatDate(x.weekEnding)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default WeekEndings;
