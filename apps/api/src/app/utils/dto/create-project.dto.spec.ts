/*eslint-disable */
import { CreateProjectDto } from './create-project.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const stubCreateProjectDto = (): {
  name: any;
  description: any;
  location: any;
} => ({
  name: 'project',
  description: 'A fitting project description',
  location: '/folder-destination',
});

describe('Create Project Dto', () => {
  let testData: { name: any; description: any; location: any };
  let importedDto: CreateProjectDto;
  let errors: any;

  describe('name', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      testData = stubCreateProjectDto();
    });

    describe('When the name is not a string', () => {
      beforeAll(async () => {
        testData.name = 657684;
        importedDto = plainToInstance(CreateProjectDto, testData);
        errors = await validate(importedDto);
      });

      test('Then it should throw an error', () => {
        expect(errors.length).toBe(1);
      });

      test('Then it should have a name error', () => {
        expect(errors[0].property).toBe('name');
      });
    });

    describe('When the name is shorter than 3 characters', () => {
      beforeAll(async () => {
        testData.name = 's';
        importedDto = plainToInstance(CreateProjectDto, testData);
        errors = await validate(importedDto);
      });

      test('Then it should throw an error', () => {
        expect(errors.length).toBe(1);
      });

      test('Then it should have a name error', () => {
        expect(errors[0].property).toBe('name');
      });
    });
  });

  describe('description', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      testData = stubCreateProjectDto();
    });

    describe('When the description is not a string', () => {
      beforeAll(async () => {
        testData.description = 657684;
        importedDto = plainToInstance(CreateProjectDto, testData);
        errors = await validate(importedDto);
      });

      test('Then it should throw an error', () => {
        expect(errors.length).toBe(1);
      });

      test('Then it should have a name error', () => {
        expect(errors[0].property).toBe('description');
      });
    });
  });

  describe('name', () => {
    beforeAll(() => {
      jest.clearAllMocks();
      testData = stubCreateProjectDto();
    });

    describe('When the location is not a string', () => {
      beforeAll(async () => {
        testData.location = 657684;
        importedDto = plainToInstance(CreateProjectDto, testData);
        errors = await validate(importedDto);
      });

      test('Then it should throw an error', () => {
        expect(errors.length).toBe(1);
      });

      test('Then it should have a name error', () => {
        expect(errors[0].property).toBe('location');
      });
    });

    describe('When the name is an empty string', () => {
      beforeAll(async () => {
        testData.location = '';
        importedDto = plainToInstance(CreateProjectDto, testData);
        errors = await validate(importedDto);
      });

      test('Then it should throw an error', () => {
        expect(errors.length).toBe(1);
      });

      test('Then it should have a name error', () => {
        expect(errors[0].property).toBe('location');
      });
    });
  });
});
