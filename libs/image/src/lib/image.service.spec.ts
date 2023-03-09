import { Test } from '@nestjs/testing';
import { ImageService } from './image.service';
import { PidWinstonLoggerMock } from '@pt/logger/mocks';
import * as fs from 'fs';
import { UPLOADS_FOLDER } from './utils';

describe('AppService', () => {
  let service: ImageService;

  beforeAll(async () => {
    jest.clearAllMocks();
    jest.mock('fs');

    jest
      .spyOn(fs, 'readdirSync')
      .mockReturnValue([
        'a' as unknown as fs.Dirent,
        'b' as unknown as fs.Dirent,
      ]);

    jest
      .spyOn(fs, 'statSync')
      .mockReturnValue({ birthtime: new Date(0, 0, 0) } as fs.Stats);

    jest.spyOn(fs, 'unlinkSync').mockReturnValue();

    const app = await Test.createTestingModule({
      providers: [ImageService, PidWinstonLoggerMock],
    }).compile();

    service = app.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('clearUploadsFolder', () => {
    it('Should be defined', () => {
      expect(service.clearUploadsFolder).toBeDefined();
    });

    it('Should get all the files in the uploads directory', () => {
      service.clearUploadsFolder();

      expect(fs.readdirSync).toHaveBeenCalledWith(UPLOADS_FOLDER);
    });
  });

  describe('imageSchedule', () => {
    it('Should be defined', () => {
      expect(service.imageSchedule).toBeDefined();
    });

    describe('When imageSchedule is called', () => {
      beforeAll(() => {
        jest.spyOn(service, 'clearUploadsFolder').mockReturnValueOnce();
        service.imageSchedule();
      });

      it('Should call the clearUploadsFolderFunction', () => {
        expect(service.clearUploadsFolder).toHaveBeenCalledTimes(1);
      });
    });
  });
});
