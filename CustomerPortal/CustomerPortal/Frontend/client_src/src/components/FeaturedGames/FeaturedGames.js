import React from "react";
import { withRouter } from "react-router";
import { LinearProgress } from "@material-ui/core";
import FeaturedGameDetails from "./FeaturedGameDetails";

import { fetch_data } from "../../utils/fetch_data/fetch_data";
const { gamesFeatured } = fetch_data;

const FeaturedGames = (props) => {
  const [featuredGames, setFeaturedGames] = React.useState(null);
  const loading = () => featuredGames === null;
  const noResults = () => featuredGames && !featuredGames.length;

  React.useEffect(() => {
    gamesFeatured()
      .then((response) => setFeaturedGames(response))
      .catch((error) => setFeaturedGames([]));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "600px",
        background: "#EEEEEE",
        padding: "20px",
      }}
    >
      <h2>Featured Games</h2>
      {loading() ? <LinearProgress /> : <></>}
      {noResults() ? <h2>Featured games are currently unavailable.</h2> : <></>}
      {loading() || noResults() ? (
        <></>
      ) : (
        featuredGames.map((x) => (
          <FeaturedGameDetails data={x}></FeaturedGameDetails>
        ))
      )}
    </div>
  );
};

export default withRouter(FeaturedGames);
