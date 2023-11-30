import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListCoinInfoModel } from '../coin/model/list-coin-info.model';
import { ApiCoinInfoModel } from '../coin/model/api-coin-info.model';
import { CoinInfoModel } from '../coin/model/coin-info.model';
import { ApiParam } from '@nestjs/swagger';
import { EditCoinDto } from '../coin/dto/edit-coin.dto';

export function GetCryptosSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get daily information about one or multiple cryptocurrencies',
    }),
    ApiQuery({
      name: 'cmids',
      required: false,
      description: 'List of cryptocurrencies IDs',
      schema: {
        type: 'string',
        example: '1,2,3,4,5',
      },
    }),
    ApiResponse({
      status: 200,
      type: [ListCoinInfoModel],
      description: 'Successfully retrieved cryptocurrency information.',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(200),
  );
}

export function GetAllApiCryptosSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get top 100 cryptocurrencies from API',
    }),
    ApiResponse({
      status: 200,
      type: [ApiCoinInfoModel],
      description: 'Successfully retrieved cryptocurrencies.',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(200),
  );
}

export function SaveAllApiCryptosSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get top 100 cryptocurrencies from API',
    }),
    ApiResponse({
      status: 201,
      type: [ApiCoinInfoModel],
      description: 'Successfully retrieved cryptocurrencies.',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(201),
  );
}

export function GetHistorySwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get cryptocurrency history by ID and period' }),
    ApiResponse({
      status: 200,
      type: CoinInfoModel,
      description: 'Successfully retrieved cryptocurrency history.',
    }),
    ApiParam({
      name: 'coinID',
      description: 'ID of the cryptocurrency to get history',
      schema: {
        example: 1,
      },
    }),
    ApiParam({
      name: 'period',
      enum: ['month', 'week', '5days', 'day', 'hour', 'minute'],
      description: 'Period of time to get history',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(200),
  );
}

export function GetByIdSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get cryptocurrency by ID' }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved cryptocurrency.',
    }),
    ApiParam({
      name: 'coinID',
      description: "ID of the cryptocurrency to get it's information",
      schema: {
        example: 1,
      },
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(200),
  );
}

export function CreateSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new cryptocurrency from yahoo finance API data',
    }),
    ApiResponse({
      status: 201,
      description: 'Successfully created a new cryptocurrency.',
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Cryptocurrency already exists.',
    }),
    HttpCode(201),
  );
}

export function EditSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Edit cryptocurrency by ID' }),
    ApiParam({
      name: 'coinID',
      description: 'ID of the cryptocurrency',
      schema: {
        example: 1,
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully edited cryptocurrency.',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(200),
    ApiBody({ type: EditCoinDto }),
  );
}

export function DeleteSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete cryptocurrency by ID' }),
    ApiParam({
      name: 'coinID',
      description: 'ID of the cryptocurrency',
      schema: {
        example: 1,
      },
    }),
    ApiResponse({
      status: 204,
      description: 'Successfully deleted cryptocurrency.',
    }),
    ApiResponse({ status: 404, description: 'Cryptocurrency not found.' }),
    HttpCode(204),
  );
}
