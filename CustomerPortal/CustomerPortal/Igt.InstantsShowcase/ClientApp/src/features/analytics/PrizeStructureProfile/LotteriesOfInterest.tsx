import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { fetch_data } from "../../../shared/utils/fetch_data";

const { fetchLotteries, getUser } = fetch_data;

const LotteriesOfInterest = (props: any) => {
  const [lotteries, setLotteries] = React.useState<any[]>([]);
  const [selectedLotteries, setSelectedLotteries] = React.useState<any[]>([]);

  const hasData = (data: any) => data && data.length;

  React.useEffect(() => {
    getUser().then((user: any) => {
      setSelectedLotteries([user.organizationCode]);
    });

    fetchLotteries()
      .then((response) => {
        setLotteries(response);
      })
      .catch((error) => console.error(error));
  }, [setSelectedLotteries, setLotteries]);

  return (
    <>
      {hasData(lotteries) ? (
        <FormControl
          style={{ minWidth: "200px", maxWidth: "200px", margin: "0 10px" }}
          title={lotteries
            .filter((x: any) => selectedLotteries.indexOf(x.code) > -1)
            .map((x: any) => x.name)
            .join("\n")}
        >
          <InputLabel>Jurisdictions of Interest</InputLabel>
          <Select
            style={{ maxHeight: "50vh" }}
            multiple
            value={selectedLotteries}
            onChange={(e: any) => {
              setSelectedLotteries(e.target.value);
              props.handleChange(e.target.value);
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected: any) =>
              lotteries
                .filter((x: any) => selected.indexOf(x.customerCode) > -1)
                .map((x: any) => x.businessName)
                .join(", ")
            }
          >
            {lotteries.map((lottery: any) => (
              <MenuItem key={lottery.customerCode} value={lottery.customerCode}>
                <Checkbox
                  color="primary"
                  checked={selectedLotteries.indexOf(lottery.customerCode) > -1}
                />
                <ListItemText primary={lottery.businessName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <CircularProgress
          style={{ width: "25px", height: "25px", margin: "15px" }}
        />
      )}
    </>
  );
};

export default LotteriesOfInterest;
