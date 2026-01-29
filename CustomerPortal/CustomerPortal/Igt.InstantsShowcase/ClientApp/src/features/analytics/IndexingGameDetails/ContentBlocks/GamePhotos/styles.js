import styled from "styled-components";

export const GamePhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;

export const GameMainPhoto = styled.div`
  width: 100%;
  /* max-height: 400px; */
  display: flex;
  justify-content: flex-start;
  cursor: pointer;

  & > img {
    max-width: 100%;
  }
`;

export const GameAltPhotosContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 6px;
  overflow: auto;
  display: none; // temporary to hide thumbnails because we only have one image per product currently.
`;

export const GameAltPhoto = styled.div`
  width: 30%;
  cursor: pointer;
  display: flex;
  max-height: 300px;

  & > img {
    width: 100%;
  }
`;

export const PhotoLightBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
