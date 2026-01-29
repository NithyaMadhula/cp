import React, { Component } from 'react';

//Styles
import {
  GamePhotoContainer,
  GameMainPhoto,
  GameAltPhotosContainer,
  GameAltPhoto,
  PhotoLightBox
} from './styles';

//Utils
import { image_paths } from '../../../../../utils/constants/image_paths';

class GamePhotos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null,
      imageThumbnails: null,
      showLightBox: false
    };
  }

  //Create an array of images for reference when clickling on thumbnails
  imageSort = () => {
    const { gameData, concept } = this.props;
    const { imgName } = gameData;
    const { baseImageUrl, imgBasePathConcepts } = image_paths;

    let imgUrl = concept ? imgBasePathConcepts(imgName) : baseImageUrl(imgName);

    let thumbnailArray = [];

    thumbnailArray.push(imgUrl);

    this.setState({
      selectedImage: thumbnailArray[0],
      imageThumbnails: thumbnailArray
    });
  };

  //Get image thumnail index on click
  imageSelect = evt => {
    const { imageThumbnails } = this.state;
    const { target } = evt;
    const imageIndex = target.getAttribute('index');
    this.setState({
      selectedImage: imageThumbnails[imageIndex]
    });
  };

  showImageLightBox = () => {
    this.setState(prevState => ({
      showLightBox: !prevState.showLightBox
    }));
  };

  componentWillMount() {
    this.imageSort();
  }

  render() {
    const { selectedImage, imageThumbnails, showLightBox } = this.state;

    return (
      <GamePhotoContainer>
        <GameMainPhoto>
          <img
            onClick={() => {
              this.showImageLightBox();
            }}
            src={selectedImage}
            alt="IGT Game"
          />
          {showLightBox ? (
            <PhotoLightBox
              onClick={() => {
                this.showImageLightBox();
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
                onClick={this.imageSelect}
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
  }
}

export default GamePhotos;
