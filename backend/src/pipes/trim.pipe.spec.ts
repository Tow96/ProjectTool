import { TrimPipe } from './trim.pipe';
import { stubTrimPipe } from '../../test/stubs';

describe('Trim Pipe', () => {
  let trimPipe: TrimPipe;

  beforeAll(() => {
    trimPipe = new TrimPipe();

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('When the trim pipe receives anything of a type different to body', () => {
    let values;

    beforeAll(() => {
      values = trimPipe.transform(stubTrimPipe(), { type: 'custom' });
    });

    test('Then the data should be untouched', () => {
      expect(values).toEqual(stubTrimPipe());
    });
  });

  describe('When the trim pipe receives a body', () => {
    let values;

    beforeAll(() => {
      values = trimPipe.transform(stubTrimPipe(), { type: 'body' });
    });

    test('Then passwords should be untouched', () => {
      expect(values.password).toBe(stubTrimPipe().password);
    });

    test('Then any string type should be trimmed', () => {
      expect(values.test).toBe(stubTrimPipe().test.trim());
    });
  });
});
