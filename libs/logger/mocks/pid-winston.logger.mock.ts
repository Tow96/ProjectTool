/*eslint-disable*/
import { PidWinstonLogger } from '../src';
import { Provider } from '@nestjs/common';

const mockValue = {
  debug: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  verbose: jest.fn(),
  warn: jest.fn(),
  pidDebug: jest.fn(),
  pidError: jest.fn(),
  pidLog: jest.fn(),
  pidVerbose: jest.fn(),
  pidWarn: jest.fn(),
};

export const PidWinstonLoggerMock: Provider<any> = {
  provide: PidWinstonLogger,
  useValue: mockValue,
};
