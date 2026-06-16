import { LoggerService, Injectable, LogLevel } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  error(message: any, ...optionalParams: any[]) {
      console.error(this.formatMessage('error', message, optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
      console.warn(this.formatMessage('warn', message, optionalParams));
  }
  debug?(message: any, ...optionalParams: any[]) {
      console.debug(this.formatMessage('debug', message, optionalParams));
  }
  verbose?(message: any, ...optionalParams: any[]) {
      console.debug(this.formatMessage('verbose', message, optionalParams));
  }
  fatal?(message: any, ...optionalParams: any[]) {
      console.error(this.formatMessage('fatal', message, optionalParams));
  }
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, timestamp: new Date().toISOString(),
      ...(optionalParams.length && { context: optionalParams }) });
  }
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }
}