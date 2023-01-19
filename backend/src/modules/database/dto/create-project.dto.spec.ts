// Libraries
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

// Models
import { CreateProjectDto } from './create-project.dto';

const stubCreateProjectDto = (): {
  name: any;
  description: any;
  tags: any;
  location: any;
  img: any;
} => {
  return {
    name: 'project1',
    description: 'short description',
    tags: ['tag1', 'tag2', 'tag3'],
    location: '/some-folder',
    img: null,
  };
};

describe('CreateProjectDto', () => {
  let stubData: {
    name: any;
    description: any;
    tags: any;
    location: any;
    img: any;
  };
  let createProjectDto: CreateProjectDto;
  let errors: any;

  beforeAll(() => {
    stubData = stubCreateProjectDto();
  });

  describe('name', () => {
    describe('When the name is not a string', () => {
      beforeAll(async () => {
        stubData.name = 4687354;
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test('Then it should have an error with property name and constraint isString', () => {
        expect(errors).toContainEqual(
          expect.objectContaining({
            property: 'name',
            constraints: expect.objectContaining({
              isString: expect.any(String),
            }),
          }),
        );
      });
    });

    describe('When the name is a string with less than 3 characters', () => {
      beforeAll(async () => {
        stubData.name = '';
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test('Then it should have an error with property name and constraint minLength', () => {
        expect(errors).toContainEqual(
          expect.objectContaining({
            property: 'name',
            constraints: expect.objectContaining({
              minLength: expect.any(String),
            }),
          }),
        );
      });
    });

    describe('When the name is correct', () => {
      beforeAll(async () => {
        stubData = stubCreateProjectDto();
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test("Then there shouldn't be any errors", () => {
        expect(errors.length).toBe(0);
      });
    });
  });

  describe('description', () => {
    describe('When the description is correct', () => {
      beforeAll(async () => {
        stubData = stubCreateProjectDto();
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test("Then there shouldn't be any errors", () => {
        expect(errors.length).toBe(0);
      });
    });

    describe('When the description is not a string', () => {
      beforeAll(async () => {
        stubData.description = 4687354;
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test('Then it should have an error with property description and constraint isString', () => {
        expect(errors).toContainEqual(
          expect.objectContaining({
            property: 'description',
            constraints: expect.objectContaining({
              isString: expect.any(String),
            }),
          }),
        );
      });
    });
  });

  describe('tags', () => {
    describe('When the tags are correct', () => {
      beforeAll(async () => {
        stubData = stubCreateProjectDto();
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test("Then there shouldn't be any errors", () => {
        expect(errors.length).toBe(0);
      });
    });

    describe('When the tags are not an array', () => {
      beforeAll(async () => {
        stubData.tags = 4687354;
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test('Then it should have an error with property tags and constraint isArray', () => {
        expect(errors).toContainEqual(
          expect.objectContaining({
            property: 'tags',
            constraints: expect.objectContaining({
              isArray: expect.any(String),
            }),
          }),
        );
      });
    });

    describe('When the tags are not a string array', () => {
      beforeAll(async () => {
        stubData.tags = ['4687354', 25];
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test('Then it should have an error with property tags and constraint isString', () => {
        expect(errors).toContainEqual(
          expect.objectContaining({
            property: 'tags',
            constraints: expect.objectContaining({
              isString: expect.any(String),
            }),
          }),
        );
      });
    });
  });

  describe('location', () => {
    describe('When the description is correct', () => {
      beforeAll(async () => {
        stubData = stubCreateProjectDto();
        createProjectDto = plainToInstance(CreateProjectDto, stubData);

        errors = await validate(createProjectDto);
      });

      test("Then there shouldn't be any errors", () => {
        expect(errors.length).toBe(0);
      });

      describe('When the location is not a string', () => {
        beforeAll(async () => {
          stubData.location = 4687354;
          createProjectDto = plainToInstance(CreateProjectDto, stubData);

          errors = await validate(createProjectDto);
        });

        test('Then it should have an error with property location and constraint isString', () => {
          expect(errors).toContainEqual(
            expect.objectContaining({
              property: 'location',
              constraints: expect.objectContaining({
                isString: expect.any(String),
              }),
            }),
          );
        });
      });

      describe('When the location is an empty string', () => {
        beforeAll(async () => {
          stubData.location = '';
          createProjectDto = plainToInstance(CreateProjectDto, stubData);

          errors = await validate(createProjectDto);
        });

        test('Then it should have an error with property location and constraint isNotEmpty', () => {
          expect(errors).toContainEqual(
            expect.objectContaining({
              property: 'location',
              constraints: expect.objectContaining({
                isNotEmpty: expect.any(String),
              }),
            }),
          );
        });
      });
    });

    // describe('When the location does not start with /', () => {
    //   test.todo('Then it should be added');
    // });
  });
});
