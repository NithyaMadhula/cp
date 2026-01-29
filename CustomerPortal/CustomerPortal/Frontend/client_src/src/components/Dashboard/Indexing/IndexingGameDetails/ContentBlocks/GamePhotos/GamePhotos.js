import React, { useState, useEffect } from "react";

//Styles
import {
  GamePhotoContainer,
  GameMainPhoto,
  GameAltPhotosContainer,
  GameAltPhoto,
  PhotoLightBox,
} from "./styles";

//Utils
import { image_paths } from "../../../../../../utils/constants/image_paths";

const GamePhotos = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageThumbnails, setImageThumbnails] = useState([]);
  const [showLightBox, setShowLightBox] = useState(false);

  const imageSort = () => {
    const { baseImageUrl } = image_paths;
    let imgUrl = baseImageUrl(props.gameData.imgName);

    let thumbnailArray = [];
    thumbnailArray.push(imgUrl);

    setSelectedImage(thumbnailArray[0]);
    setImageThumbnails(thumbnailArray);
  };

  //Get image thumnail index on click
  const imageSelect = (evt) => {
    const { target } = evt;
    const imageIndex = target.getAttribute("index");
    setSelectedImage(imageThumbnails[imageIndex]);
  };

  const showImageLightBox = () => {
    setShowLightBox(!showLightBox);
  };

  useEffect(() => {
    imageSort();
  });

  return (
    <GamePhotoContainer>
      <GameMainPhoto>
        <img
          onClick={() => {
            showImageLightBox();
          }}
          src={selectedImage}
          alt="IGT Game"
        />
        {showLightBox ? (
          <PhotoLightBox
            onClick={() => {
              showImageLightBox();
            }}
          >
            <img src={selectedImage} alt="IGT Game" />
          </PhotoLightBox>
        ) : null}
      </GameMainPhoto>
      <GameAltPhotosContainer>
        {imageThumbnails.map((img, i) => (
          <GameAltPhoto key={i}>
            <img
              onClick={imageSelect}
              src={img}
              index={i}
              key={i}
              alt="IGT Game thumbnail"
            />
          </GameAltPhoto>
        ))}
      </GameAltPhotosContainer>
    </GamePhotoContainer>
  );
};

export default GamePhotos;
