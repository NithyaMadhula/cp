import * as React from "react";
import { LinearProgress } from "@material-ui/core";
import ActiveGamesSellThruTable from "./ActiveGamesSellThruTable";

import { fetch_data } from "../../../shared/utils/fetch_data";
import GetApp from "@material-ui/icons/GetApp";
import { CSVLink } from "react-csv";
import ResultsCount from "../ResultsCount";
import Tooltip from "@material-ui/core/Tooltip";

const { fetchActiveGamesSellThru } = fetch_data;

const ActiveGamesSellThru = (props: any) => {
  const [data, setData] = React.useState([]);
  const hasData = () => !!(data && data.length);

  React.useEffect(() => {
    fetchActiveGamesSellThru()
      .then((response: any) => {
        let d = response || [];
        d.sort((a: any, b: any) => b.salesToDate - a.salesToDate);
        setData(d);
      })
      .catch((error: any) => console.error(error));
  }, [setData]);

  return (
    <main>
      {hasData() ? (
        <>
          <ResultsCount count={data.length} pStyle={{ float: "right" }} />
          <Tooltip
            title={`Download report.`}
            arrow
            placement="bottom"
            style={{ fontSize: "16px", margin: "6px 1px", float: "right" }}
          >
            <CSVLink
              data={data}
              filename={`active-games-${new Date().toLocaleDateString()}.csv`}
            >
              <GetApp
                style={{
                  color: "rgb(21, 156, 219)",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  position: "relative",
                  right: "10px",
                  top: "-10px",
                  float: "right",
                }}
              />
            </CSVLink>
          </Tooltip>
        </>
      ) : (
        ""
      )}
          {console.log(data) }
      {hasData() ? (
        <ActiveGamesSellThruTable data={data}></ActiveGamesSellThruTable>
      ) : (
        <LinearProgress />
      )}
    </main>
  );
};

export default ActiveGamesSellThru;
