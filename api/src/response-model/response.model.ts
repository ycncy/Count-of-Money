import { ApiProperty } from '@nestjs/swagger';

export class ResponseModel {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  [key: string]: any;
}
