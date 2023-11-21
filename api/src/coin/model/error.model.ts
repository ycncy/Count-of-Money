import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetails {
  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}

export class ErrorModel {
  @ApiProperty()
  error: ErrorDetails;
}
