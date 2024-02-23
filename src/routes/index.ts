import express from 'express';
import image from './image';

const api = express.Router();

api.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    'This is Image Processing API.\nPlease add /images?filename=""&width=""&height="" into path of url to resize an image\n Example: /images?filename=HCM&width=200&height=200',
  );
});

api.use('/images', image);

export default api;
