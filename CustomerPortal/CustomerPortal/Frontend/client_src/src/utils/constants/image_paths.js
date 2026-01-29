const imgPathHelper = (path) => {
  if (!path) return path;

  return path.replace("#", "%23");
};

export const image_paths = {
  baseImageUrl: (imgPath) =>
    `https://igt-customerportal.s3.amazonaws.com/printedgames/${imgPathHelper(
      imgPath
    )}`,

  imgBasePathConcepts: (imgPath) =>
    `https://igt-customerportal.s3.amazonaws.com/concepts/${imgPathHelper(
      imgPath
    )}`,
};
