import fs from 'fs';

/**
 * The function `checkFileExisted` in TypeScript checks if a file exists at the specified file path.
 * @param {string} filePath - The `filePath` parameter in the `checkFileExisted` function is a string
 * that represents the path to the file that you want to check for existence.
 * @returns A boolean value indicating whether the file exists at the specified file path.
 */
export const checkFileExisted = (filePath: string): boolean => {
  const isExisted: boolean = fs.existsSync(`${filePath}`);

  return isExisted;
};
