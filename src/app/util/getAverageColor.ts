
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


// export function extractDominantColor(imageUrl: string, callback: (color: string) => void) {
//   const img = new Image();
//   img.crossOrigin = "Anonymous";

//   img.onload = function () {
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');

//     if (!ctx) {
//       console.error('Failed to get 2d context from canvas');
//       return;
//     }

//     canvas.width = img.width;
//     canvas.height = img.height;

//     ctx.drawImage(img, 0, 0);

//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

//     // Prepare data for k-means clustering
//     const data = [];
//     for (let i = 0; i < imageData.length; i += 4) {
//       const r = imageData[i];
//       const g = imageData[i + 1];
//       const b = imageData[i + 2];
//       data.push([r, g, b]);
//     }

//     // K-means clustering algorithm
//     const clusters = kmeans(data, 1); // You can adjust the number of clusters based on your requirement
// console.log(clusters.centroids);

//     // Get the dominant color
//     const dominantColor =rgbToHex(clusters.centroids[0].map(Math.round)[0],clusters.centroids[0].map(Math.round)[1],clusters.centroids[0].map(Math.round)[2]);

//     callback(dominantColor);
//   };

//   img.src = imageUrl;
// }

// // K-means clustering algorithm
// function kmeans(data: number[][], k: number): { centroids: number[][] } {
//   // Implementation of k-means algorithm
//   // This is a simplified version for demonstration purposes
//   // You may need to use a more robust implementation in production

//   // Randomly initialize centroids
//   let centroids = data.slice(0, k);

//   let oldClusters: number[][][] | null = null;

//   // Run the algorithm until convergence
//   while (true) {
//     const clusters = new Array(k).fill(null).map(() => []);

//     // Assign each data point to the nearest centroid
//     for (const point of data) {
//       const nearestCentroidIndex = centroids.reduce((nearestIndex, centroid, index) => {
//         const distanceToNearest = distance(point, centroids[nearestIndex]);
//         const distanceToCurrent = distance(point, centroid);
//         return distanceToCurrent < distanceToNearest ? index : nearestIndex;
//       }, 0);
//       clusters[nearestCentroidIndex].push(point);
//     }

//     // Update centroids
//     const newCentroids = clusters.map(cluster => {
//       const sum = cluster.reduce((acc, point) => point.map((coord: number, i: number) => acc[i] + coord), [0, 0, 0]);
//       return sum.map(coordSum => coordSum / cluster.length);
//     });

//     // Check for convergence
//     if (JSON.stringify(oldClusters) === JSON.stringify(clusters)) {
//       return { centroids: newCentroids };
//     }

//     oldClusters = clusters;
//     centroids = newCentroids;
//   }
// }

// // Helper function to calculate Euclidean distance between two points
// function distance(point1: number[], point2: number[]): number {
//   return Math.sqrt(
//     point1.reduce((sum, coord, i) => sum + Math.pow(coord - point2[i], 2), 0)
//   );
// }