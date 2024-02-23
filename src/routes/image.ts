import express, { Request, Response } from 'express';
import resize from '../utilities/resize';
import path from 'path';
import { checkFileExisted } from '../utilities/findFile';
import { imagePath } from '../index.common';

const image = express.Router();

image.get('/', async (req: Request, res: Response): Promise<void> => {
  const fileName = req.query.filename;
  const filePath = path.resolve(`${imagePath}/full/${fileName}.jpg`);
  const isFileExisted = checkFileExisted(filePath);

  const width = req.query.width ? +req.query.width : 300;
  const height = req.query.height ? +req.query.height : 300;

  /* This code snippet is handling the logic for processing image resizing requests in an Express
  route. Here's a breakdown of what each condition is checking: */
  if (!fileName || !isFileExisted) {
    res.send(
      'Please intput the fileName or fileName is not existed\nExample: /images?filename=HCM&width=200&height=200',
    );
  } else if (isNaN(+width) || isNaN(+height)) {
    res.send('Please input width or height of the image as a number');
  } else if (+width <= 0 || +height <= 0) {
    res.send('Please input width or height of the image as a number');
  } else if (fileName && !isNaN(+width) && !isNaN(+height)) {
    const image = await resize(fileName as string, width, height);
    res.sendFile(image);
  }
});

export default image;
