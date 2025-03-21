import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'TESTE ' + exception.message,
      error: 'Not Found',
    });
  }
}
