import { JsonLogger } from "./json.logger";

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('formatMessage', () => {
    it('should return a JSON string with level, message, timestamp and optional context', () => {
      const result = logger.formatMessage('info', 'message', 'context1', 'context2');
      const parsed = JSON.parse(result);
      expect(parsed).toMatchObject({
        level: 'info',
        message: 'message',
        context: ['context1', 'context2'],
      });
      expect(parsed.timestamp).toBeDefined();
    });

    it('should handle no optional params', () => {
      const result = logger.formatMessage('error', 'no context');
      const parsed = JSON.parse(result);
      expect(parsed.context).toBeUndefined();
    });
  });

  describe('log methods', () => {
    it('log() should call console.log with formatted JSON', () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      logger.log('hello');
      expect(consoleLogSpy).toHaveBeenCalled();
      const callArg = consoleLogSpy.mock.calls[0][0];
      expect(() => JSON.parse(callArg)).not.toThrow();
      expect(JSON.parse(callArg)).toMatchObject({ level: 'log', message: 'hello' });
    });

    it('error() should call console.error', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      logger.error('error');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('fatal() should call console.error', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      logger.fatal('fatal');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('warn() should call console.warn', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      logger.warn('warn');
      expect(warnSpy).toHaveBeenCalled();
    });

    it('debug() should call console.debug', () => {
      const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
      logger.debug('debug');
      expect(debugSpy).toHaveBeenCalled();
    });

    it('verbose() should call console.debug', () => {
      const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
      logger.verbose('verbose');
      expect(debugSpy).toHaveBeenCalled();
    });
  });
});