
export async function getAverageColorFromImageUrl(imageUrl: string): Promise<string> {
  const imgElement = new Image();
  imgElement.crossOrigin = "Anonymous"; // To avoid CORS issues
  imgElement.src = imageUrl;

  return new Promise((resolve, reject) => {
      imgElement.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) {
              reject('Canvas 2D context is not supported.');
              return;
          }

          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          context.drawImage(imgElement, 0, 0);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          let totalR = 0;
          let totalG = 0;
          let totalB = 0;

          for (let i = 0; i < imageData.data.length; i += 4) {
              totalR += imageData.data[i];
              totalG += imageData.data[i + 1];
              totalB += imageData.data[i + 2];
          }

          const pixelCount = imageData.data.length / 4;
          const avgR = Math.round(totalR / pixelCount);
          const avgG = Math.round(totalG / pixelCount);
          const avgB = Math.round(totalB / pixelCount);

          const hexColor = rgbToHex(avgR, avgG, avgB);
          resolve(hexColor);
      };

      imgElement.onerror = (error) => {
          reject(`Error loading image: ${error}`);
      };
  });
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

export function getComplementaryColor(hexColor: string): string {
  // Remove the '#' symbol if present
  const cleanHexColor = hexColor.replace('#', '');

  // Parse the hex color components
  const r = parseInt(cleanHexColor.substr(0, 2), 16);
  const g = parseInt(cleanHexColor.substr(2, 2), 16);
  const b = parseInt(cleanHexColor.substr(4, 2), 16);

  // Calculate the complementary color components
  const compR = (255 - r).toString(16).padStart(2, '0'); // Invert R component
  const compG = (255 - g).toString(16).padStart(2, '0'); // Invert G component
  const compB = (255 - b).toString(16).padStart(2, '0'); // Invert B component

  // Combine the complementary color components
  const complementaryColor = `#${compR}${compG}${compB}`;

  return complementaryColor;
}

export function getContrastColor(hexColor: string): string {
  // Remove the '#' symbol if present
  const cleanHexColor = hexColor.replace('#', '');

  // Parse the hex color components
  const r = parseInt(cleanHexColor.substr(0, 2), 16) / 255;
  const g = parseInt(cleanHexColor.substr(2, 2), 16) / 255;
  const b = parseInt(cleanHexColor.substr(4, 2), 16) / 255;

  // Calculate the relative luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Choose white or black based on the luminance value
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

// // Example usage:
// const imageUrl = 'https://example.com/image.jpg';
// getAverageColorFromImageUrl(imageUrl)
//   .then((averageColor) => {
//       console.log('Average color:', averageColor);
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//   });