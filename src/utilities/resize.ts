import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { checkFileExisted } from './findFile';
import { imagePath } from '../index.common';

/**
 * The `resize` function asynchronously resizes an image file to the specified width and height,
 * creating a thumbnail version if it does not already exist.
 * @param {string} fileName - The `fileName` parameter is a string that represents the name of the
 * image file without the file extension.
 * @param {number} width - The `width` parameter in the `resize` function represents the desired width
 * in pixels to which the image should be resized.
 * @param {number} height - The `height` parameter in the `resize` function represents the desired
 * height in pixels to which the image should be resized. This parameter determines the vertical size
 * of the output image after resizing.
 * @returns The function `resize` returns a Promise that resolves to a string. The string returned is
 * either the path of the newly resized image file if it was created, or the path of the existing
 * thumbnail image file if it already existed.
 */
const resize = async (
  fileName: string,
  width: number,
  height: number,
): Promise<string> => {
  const filePath = path.resolve(`${imagePath}/full/${fileName}.jpg`);

  const thumbFile = path.resolve(
    `${imagePath}/thumb/${fileName}-${width}-${height}.jpg`,
  );
  const isImageExisted = checkFileExisted(thumbFile);

  /* This block of code is a conditional statement within the `resize` function. Here's what it does: */
  if (!isImageExisted) {
    const filePath_Thumb = path.resolve(
      `${imagePath}/thumb/${fileName}-${width}-${height}.jpg`,
    );
    await sharp(filePath).resize(width, height).toFile(filePath_Thumb);
    const readStream = fs.createReadStream(filePath_Thumb);
    return readStream.path as string;
  } else {
    return thumbFile;
  }
};

export default resize;
