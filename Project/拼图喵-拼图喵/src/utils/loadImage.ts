import { ImageSourceConfig, LoadedImageData } from '../../puzzle-game/Base/SourceLoader';

export const loadImage = (image: ImageSourceConfig): Promise<LoadedImageData> => {
  let method: Function;
  // #ifdef H5
  method = loadImageInH5;
  // #endif
  // #ifdef MP-WEIXIN
  method = loadImageInWeApp;
  // #endif
  return method(image);
}

const loadImageInH5 = (image: ImageSourceConfig): Promise<LoadedImageData> => {
  return new Promise((resolve, reject) => {
    const { src } = image;
    // var xhr = new XMLHttpRequest();
    // xhr.onload = function() {
    //   var reader = new FileReader();
    //   reader.onloadend = () => {
    //     const path = reader.result as string;
    //     resolve({ ...image, src: path, width: 750, height: 1334 });
    //   }
    //   reader.readAsDataURL(xhr.response);
    // };
    // xhr.open('GET', src);
    // xhr.responseType = 'blob';
    // xhr.send();
    const img = new Image();
    img.onload = () => {
      const { src, width, height } = img;
      resolve({ ...image, src, width, height });
    }
    img.onerror = reject;
    img.src = src as string;
  });
}

const loadImageInWeApp = (image: ImageSourceConfig): Promise<LoadedImageData> => {
  return new Promise((resolve, reject) => {
    const { src } = image;
    uni.getImageInfo({
      src: src as string,
      success: (res: UniApp.GetImageInfoSuccessData) => {
        const { path, width, height } = res;
        resolve({ ...image, src: path, width, height });
      },
      fail: reject,
    });
  });
}