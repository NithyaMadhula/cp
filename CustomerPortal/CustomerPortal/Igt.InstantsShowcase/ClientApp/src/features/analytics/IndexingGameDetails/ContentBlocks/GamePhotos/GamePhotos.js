import React, { useState } from "react";

//Styles
import { GamePhotoContainer, GameMainPhoto, PhotoLightBox } from "./styles";

//Utils
import image_paths from "../../../../../shared/utils/image_paths";
const { baseImageUrl } = image_paths;

const GamePhotos = (props) => {
  const [showLightBox, setShowLightBox] = useState(false);

  const showImageLightBox = () => {
    setShowLightBox(!showLightBox);
  };

  return (
    <GamePhotoContainer>
      <GameMainPhoto>
        <img
          onClick={() => {
            showImageLightBox();
          }}
          src={baseImageUrl(props.gameData.imgName)}
                  alt="Brightstar Game"
        />
        {showLightBox ? (
          <PhotoLightBox
            onClick={() => {
              showImageLightBox();
            }}
          >
            <img src={baseImageUrl(props.gameData.imgName)} alt="IGT Game" />
          </PhotoLightBox>
        ) : null}
      </GameMainPhoto>
    </GamePhotoContainer>
  );
};

export default GamePhotos;
