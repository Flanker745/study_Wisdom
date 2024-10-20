export const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // To handle CORS issues for images from other origins
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  