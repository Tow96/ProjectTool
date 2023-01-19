import * as fs from 'fs';
import * as winston from 'winston';
import { PidWinstonLogger } from './pid-winston.logger';

// Libraries
describe('PidWinstonLogger', () => {
  let logger: PidWinstonLogger;
  const stubLog = {
    pid: 'pid',
    message: 'message',
  };

  beforeAll(() => {
    logger = new PidWinstonLogger();
    jest.clearAllMocks();
  });

  afterAll(() => {
    fs.rm(PidWinstonLogger.logsFolder, { recursive: true, force: true }, () => {
      // empty
    });
  });

  describe('Transports', () => {
    describe('When transports are caled with logging enabled', () => {
      let transports: winston.transport[];

      beforeAll(() => {
        process.env.DISABLE_LOGGING = 'false';
        transports = PidWinstonLogger.transports();
      });

      test('Then 3 transports should be returned', () => {
        expect(transports.length).toBe(3);
      });
    });

    describe('When transports are caled without logging enabled', () => {
      let transports: winston.transport[];

      beforeAll(() => {
        process.env.DISABLE_LOGGING = 'true';
        transports = PidWinstonLogger.transports();
      });

      test('Then 3 transports should be returned', () => {
        expect(transports.length).toBe(1);
      });
    });
  });

  describe('Logging', () => {
    describe('When pidError is called', () => {
      beforeAll(() => {
        jest.clearAllMocks();
        jest.spyOn(logger, 'error');
        logger.pidError(stubLog.pid, stubLog.message);
      });

      test('Then the native error, should be called only once', () => {
        expect(logger.error).toBeCalledTimes(1);
      });

      test('Then the native error should be called with an object containing a pid and message parameters', () => {
        expect(logger.error).toBeCalledWith(stubLog, undefined, undefined);
      });
    });

    describe('When pidWarn is called', () => {
      beforeAll(() => {
        jest.clearAllMocks();
        jest.spyOn(logger, 'warn');
        logger.pidWarn(stubLog.pid, stubLog.message);
      });

      test('Then the native warn, should be called only once', () => {
        expect(logger.warn).toBeCalledTimes(1);
      });

      test('Then the native warn should be called with an object containing a pid and message parameters', () => {
        expect(logger.warn).toBeCalledWith(stubLog, []);
      });
    });

    describe('When pidLog is called', () => {
      beforeAll(() => {
        jest.clearAllMocks();
        jest.spyOn(logger, 'log');
        logger.pidLog(stubLog.pid, stubLog.message);
      });

      test('Then the native log, should be called only once', () => {
        expect(logger.log).toBeCalledTimes(1);
      });

      test('Then the native log should be called with an object containing a pid and message parameters', () => {
        expect(logger.log).toBeCalledWith(stubLog, []);
      });
    });

    describe('When pidVerbose is called', () => {
      beforeAll(() => {
        jest.clearAllMocks();
        jest.spyOn(logger, 'verbose');
        logger.pidVerbose(stubLog.pid, stubLog.message);
      });

      test('Then the native verbose, should be called only once', () => {
        expect(logger.verbose).toBeCalledTimes(1);
      });

      test('Then the native verbose should be called with an object containing a pid and message parameters', () => {
        expect(logger.verbose).toBeCalledWith(stubLog, []);
      });
    });

    describe('When pidDebug is called', () => {
      beforeAll(() => {
        jest.clearAllMocks();
        jest.spyOn(logger, 'debug');
        logger.pidDebug(stubLog.pid, stubLog.message);
      });

      test('Then the native debug, should be called only once', () => {
        expect(logger.debug).toBeCalledTimes(1);
      });

      test('Then the native debug should be called with an object containing a pid and message parameters', () => {
        expect(logger.debug).toBeCalledWith(stubLog, []);
      });
    });
  });
});
