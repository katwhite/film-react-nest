import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escapeField(value: any): string {
    if (value === undefined || value === null) {
      return '';
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    return String(value).replace(/[\t\n\r]/g, ' ');
  }

  formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const parts = [
      `level=${this.escapeField(level)}`,
      `timestamp=${this.escapeField(new Date().toISOString())}`,
      `message=${this.escapeField(message)}`,
    ];

    if (optionalParams.length) {
      parts.push(`context=${this.escapeField(optionalParams)}`);
    }

    return parts.join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('verbose', message, optionalParams));
  }

  fatal?(message: unknown, ...optionalParams: unknown[]) {
    console.error(this.formatMessage('fatal', message, optionalParams));
  }
}