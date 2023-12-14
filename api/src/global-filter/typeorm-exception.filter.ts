import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import {TypeORMError} from "typeorm";
import {json, Response} from "express";

@Catch(TypeORMError)
export class TypeormExceptionFilter implements ExceptionFilter {

    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const excptionCode: string = ""
        console.log(exception);
        const message: string = exception.message;

        response.status(200).json({
            status: 200,
            message: message,
        });
    }

}