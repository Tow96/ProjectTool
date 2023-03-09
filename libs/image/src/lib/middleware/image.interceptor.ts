import { HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOADS_FOLDER } from '../utils';

export const ImageInterceptor = () => {
  return FileInterceptor('image', {
    storage: diskStorage({
      destination: UPLOADS_FOLDER,
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
