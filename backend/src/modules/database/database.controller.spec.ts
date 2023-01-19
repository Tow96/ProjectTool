import { LogIdRequest } from '@app/winston';
import { Test } from '@nestjs/testing';
import { DatabaseController, ProjectRepository } from '.';
import { CreateProjectDto } from './dto';
import { Project } from './entities';

const stubProjectExistent = (): Project => {
  return {
    id: 1,
    description: 'Simple description',
    imageLocation: '',
    location: 'some-place',
    name: 'Project',
    tags: ['tag1', 'tag2', 'tag3'],
  };
};

const stubLogIdReq = (): LogIdRequest => {
  return { 'x-log-id': 'test' } as LogIdRequest;
};

describe('AppController', () => {
  let databaseController: DatabaseController;
  let projectRepo: ProjectRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DatabaseController],
      providers: [ProjectRepository],
    }).compile();

    databaseController = moduleRef.get<DatabaseController>(DatabaseController);
    projectRepo = moduleRef.get<ProjectRepository>(ProjectRepository);
  });

  describe('create project', () => {
    describe('when project create is called with a project that is not already registered', () => {
      let body: CreateProjectDto;
      let result: any;
      beforeAll(() => {
        jest.clearAllMocks();
        body = stubProjectExistent();

        jest.spyOn(projectRepo, 'createProject');
        result = databaseController.createProject(stubLogIdReq(), body);
      });

      test('Then the data must be passed to the repository service', () => {
        expect(projectRepo.createProject).toBeCalledTimes(1);
        expect(projectRepo.createProject).toBeCalledWith(stubLogIdReq()['x-log-id'], body);
      });
    });
  });
});
