import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function AddToFavoritesSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a cryptocurrency to user favorites' }),
    ApiParam({
      name: 'coinId',
      description: 'Cryptocurrency ID',
      schema: {
        type: 'number',
        example: '1',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully added cryptocurrency to favorites.',
    }),
    ApiResponse({
      status: 404,
      description: 'User or cryptocurrency not found.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function RemoveFromFavoritesSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove a cryptocurrency from user favorites' }),
    ApiParam({
      name: 'coinId',
      description: 'Cryptocurrency ID',
      schema: {
        type: 'number',
        example: '1',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully removed cryptocurrency from favorites.',
    }),
    ApiResponse({
      status: 404,
      description: 'User or cryptocurrency not found.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function GetFavoritesSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get user favorites' }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved user favorites.',
    }),
    ApiResponse({
      status: 404,
      description: 'User not found.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function GetDefaultFavoritesSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get default favorites' }),
    ApiResponse({
      status: 200,
      description: 'Successfully get default favorites.',
    }),
    HttpCode(200),
  );
}

export function AddDefaultFavoriteSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Add a default favorite' }),
    ApiQuery({
      name: 'coinId',
      description: 'Cryptocurrency ID',
      schema: {
        type: 'number',
        example: '1',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully added default favorite.',
    }),
    ApiResponse({
      status: 404,
      description: 'Cryptocurrency not found.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function DeleteDefaultFavoriteSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a default favorite' }),
    ApiQuery({
      name: 'coinId',
      description: 'Cryptocurrency ID',
      schema: {
        type: 'number',
        example: '1',
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully deleted default favorite.',
    }),
    ApiResponse({
      status: 404,
      description: 'Cryptocurrency not found.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}
