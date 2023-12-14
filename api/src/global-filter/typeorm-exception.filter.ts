import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException, HttpStatus,
} from '@nestjs/common';
import {TypeORMError} from "typeorm";
import {json, Response} from "express";

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {

    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        if (exception["code"] === "23505") {
            response.status(HttpStatus.CONFLICT).json({
                status: HttpStatus.CONFLICT,
                message: exception["detail"],
            });
            return;
        }
    }

}