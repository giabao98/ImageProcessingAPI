import { checkFileExisted } from '../utilities/findFile';
import app from '..';
import supertest from 'supertest';
import path from 'path';
import resize from '../utilities/resize';

const request = supertest(app);

const correctPath = 'src/images/full/Wow.jpg';
const falsePath = 'src/images/full/Wow1111.jpg';

describe('Utilities test', () => {
  it('1. The function should return false for non-existent images.', () => {
    expect(checkFileExisted(falsePath)).toEqual(false);
  });

  it('2. The function should return true for existent images.', () => {
    expect(checkFileExisted(correctPath)).toEqual(true);
  });
});

describe('Endpoint response test', () => {
  it(`3. Should the application default to the "/" endpoint if the user doesn't specify a path`, async () => {
    const response = await request.get('/');
    expect(response.statusCode).toEqual(200);
  });

  it(`4. Should the /api endpoint be accessed even if the user doesn't specify a path`, async () => {
    const response = await request.get('/api');
    expect(response.statusCode).toEqual(200);
  });

  it(`5. The /api/images endpoint should be accessible even if the user doesn't provide a path.`, async () => {
    const response = await request.get('/api/images');
    expect(response.statusCode).toEqual(200);
  });

  it(`6. The /api/image endpoint should return an error message if the user tries to upload an image without specifying a filename`, async () => {
    const response = await request.get('/api/image');
    expect(response.statusCode).not.toEqual(200);
  });
});

describe('Image Processing Test', () => {
  it(`7. If a thumbnail already exists, the resize function should return it. `, async () => {
    const filePath_Thumb = path.resolve(`src/images/thumb/Wow-200-200.jpg`);
    expect(await resize('Wow', 200, 200)).toEqual(filePath_Thumb);
  });
});
