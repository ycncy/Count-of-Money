import { applyDecorators, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserEntity } from '../user/entity/user.entity';
import { UpdateUserDto } from '../user/dto/update-user.dto';

export function UpdateUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
    ApiQuery({
      name: 'id',
      description: 'User ID',
      schema: {
        type: 'number',
        example: '1,2,3,4,5',
      },
    }),
    ApiResponse({
      status: 200,
      type: UserEntity,
      description: 'Successfully updated user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    HttpCode(200),
    ApiBody({ type: UpdateUserDto }),
  );
}

export function DeleteUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user' }),
    ApiQuery({
      name: 'id',
      description: 'User ID',
      schema: {
        type: 'number',
        example: '1,2,3,4,5',
      },
    }),
    ApiResponse({
      status: 200,
      type: UserEntity,
      description: 'Successfully deleted user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    HttpCode(200),
  );
}

export function GetUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user' }),
    ApiResponse({
      status: 200,
      type: UserEntity,
      description: 'Successfully get user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    HttpCode(200),
  );
}

export function GetAllUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all users' }),
    ApiResponse({
      status: 200,
      type: [UserEntity],
      description: 'Successfully get users.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function GetMeUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Get my profile' }),
    ApiResponse({
      status: 200,
      type: UserEntity,
      description: 'Successfully get user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function UpdateMeUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Update my profile' }),
    ApiResponse({
      status: 200,
      type: UserEntity,
      description: 'Successfully updated user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    ApiResponse({ status: 404, description: 'User not found.' }),
    HttpCode(200),
    ApiBody({ type: UpdateUserDto }),
  );
}
