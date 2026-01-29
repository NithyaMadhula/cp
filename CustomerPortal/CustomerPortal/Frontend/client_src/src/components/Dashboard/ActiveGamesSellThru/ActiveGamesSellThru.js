import React, { useState } from "react";
import { LinearProgress } from "@material-ui/core";
import ActiveGamesSellThruTable from "./ActiveGamesSellThruTable";

import { fetch_data } from "../../../utils/fetch_data/fetch_data";
const { fetchActiveGamesSellThru } = fetch_data;

const ActiveGamesSellThru = (props) => {
  const [data, setData] = useState([]);
  const hasData = () => !!(data && data.length);

  React.useEffect(() => {
    fetchActiveGamesSellThru()
      .then((response) => setData(response || []))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <br />
      {hasData() ? (
        <ActiveGamesSellThruTable data={data}></ActiveGamesSellThruTable>
      ) : (
        <LinearProgress />
      )}
    </main>
  );
};

export default ActiveGamesSellThru;
