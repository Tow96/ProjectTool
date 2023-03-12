import { HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOADS_FOLDER } from '../utils';
import { v4 as uuidv4 } from 'uuid';

export const ImageInterceptor = () => {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: UPLOADS_FOLDER,
      filename: fileName,
    }),
    fileFilter,
  });
};

export const fileFilter = (
  req: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void
): void => {
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new HttpException('Invalid format type', 421), false);
  }

  callback(null, true);
};

export const fileName = (
  req: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void
): void => {
  const ext = file.originalname.split('.').pop();
  callback(null, `${uuidv4()}.${ext}`);
};
