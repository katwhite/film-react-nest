import { TskvLogger } from './tskv.logger';

describe('TSKVLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('formatMessage', () => {
    it('should produce key=value pairs', () => {
      const result = logger.formatMessage('info', 'message', 'context');
      expect(result).toMatch(/^level=info\ttimestamp=\d{4}-\d{2}-\d{2}T/);
      expect(result).toContain('\tmessage=message');
      expect(result).toContain('\tcontext=["context"]');
    });

    it('should escape special characters in fields', () => {
      const result = logger.formatMessage('warn', 'message\nwith\ttab');
      expect(result).toContain('message with tab');
      expect(result).not.toContain('\n');
      const match = result.match(/message=([^\t]+)/);
      expect(match).toBeTruthy();
      if (match) {
        expect(match[1]).not.toContain('\t');
        expect(match[1]).toContain('with tab');
      }
    });
  });

  it('log() should call console.log with formatted string', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('message');
    expect(consoleLogSpy).toHaveBeenCalled();
    const output = consoleLogSpy.mock.calls[0][0];
    expect(output).toContain('level=log');
    expect(output).toContain('message=message');
  });
});
