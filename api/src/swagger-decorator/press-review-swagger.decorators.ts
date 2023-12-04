import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function GetLatestNewsSwaggerDecorator() {
  return applyDecorators(
    ApiQuery({
      name: 'news',
      description: 'List of news tags',
      schema: {
        type: 'string',
        example: 'bitcoin, etherum',
      },
        required: false
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved news.',
    }),
    ApiOperation({
      summary: 'Get latest news',
    }),
  );
}
