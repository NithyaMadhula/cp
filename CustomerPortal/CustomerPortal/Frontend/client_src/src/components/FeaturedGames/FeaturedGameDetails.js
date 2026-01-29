import React from "react";
import { Card } from "@material-ui/core";
import { fetch_data } from "../../utils/fetch_data/fetch_data";
import GamePhotos from "../Dashboard/Indexing/IndexingGameDetails/ContentBlocks/GamePhotos/GamePhotos";
const { singlePublishedGame } = fetch_data;

const FeaturedGameDetails = (props) => {
  const [gameData, setGameData] = React.useState(null);
  const loading = () => gameData === null;

  React.useEffect(
    () => {
      singlePublishedGame(props.data.gameID)
        .then((response) => setGameData(response))
        .catch((error) => setGameData({}));
    },
    [props.data.gameID]
  );

  return (
    <>
      {!loading() && (
        <Card>
          <GamePhotos concept={false} gameData={gameData}></GamePhotos>
        </Card>
      )}
    </>
  );
};

export default FeaturedGameDetails;
