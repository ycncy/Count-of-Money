import { ApiProperty } from '@nestjs/swagger';
import { ResponseModel } from './response.model';

export class ErrorModel {
  @ApiProperty()
  error: ResponseModel;
}
