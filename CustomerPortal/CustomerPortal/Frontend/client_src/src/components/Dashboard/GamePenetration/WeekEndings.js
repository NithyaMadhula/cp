import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const formatDate = (date) => new Date(date).toLocaleDateString();

const WeekEndings = (props) => {
  return (
    <FormControl style={{ minWidth: "100px", margin: "0 10px" }}>
      <InputLabel id="demo-simple-select-label">Week Ending</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.week}
        onChange={props.onchange}
        MenuProps={{ style: { maxHeight: "400px", textAlign: "center" } }}
      >
        {props.weekEndings.map((x) => (
          <MenuItem value={x.weekEnding}>{formatDate(x.weekEnding)}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default WeekEndings;
