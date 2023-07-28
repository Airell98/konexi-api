import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorData = exception.getResponse();

    const logError = {
      urlOrigin: request.url,
      hostName: request.hostname,
      errorData: errorData,
      httpMethod: request.method,
      headers: request.headers,
    };

    this.logger.error(JSON.stringify(logError));

    const errorResult = {
      error: 'Internal Server Error',
      message: errorData,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (typeof errorData === 'string') {
      switch (status) {
        case HttpStatus.NOT_FOUND:
          errorResult.error = 'Not Found';
          errorResult.statusCode = status;
          break;
        case HttpStatus.UNAUTHORIZED:
          errorResult.error = 'Unauthorized';
          errorResult.statusCode = status;
          break;
        case HttpStatus.FORBIDDEN:
          errorResult.error = 'Forbidden';
          errorResult.statusCode = status;
          break;
        case HttpStatus.BAD_REQUEST:
          errorResult.error = 'Bad Request';
          errorResult.statusCode = status;
          break;
        case HttpStatus.CONFLICT:
          errorResult.error = 'Conflict';
          errorResult.statusCode = status;
          break;
        default:
          break;
      }
      response.status(status).json(errorResult);
    } else {
      response.status(status).json(errorData);
    }
  }
}
