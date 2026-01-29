const imgPathHelper = (path) => {
  if (!path) return path;

  return path.replace("#", "%23");
};

const image_paths = {
  baseImageUrl: (imgPath) =>
    `https://d1r8und1zd13kc.cloudfront.net/printedgames/${imgPathHelper(
      imgPath
    )}`,

  imgBasePathConcepts: (imgPath) =>
    `https://d1r8und1zd13kc.cloudfront.net/concepts/${imgPathHelper(
      imgPath
    )}`,
};

export default image_paths;