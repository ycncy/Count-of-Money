import { applyDecorators, HttpCode } from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiResponse} from '@nestjs/swagger';
import { UserEntity } from '../user/entity/user.entity';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import {ResponseModel} from "../response-model/response.model";

export function UpdateUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user' }),
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

export function AddKeywordsToUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Add keywords to user' }),
    ApiBody({
        schema: {
            type: 'object',
            properties: {
                keywords: {
                    type: 'array',
                    items: {
                        type: 'string',
                    }
                }
            }
        }
    }),
    ApiResponse({
      status: 200,
      type: ResponseModel,
      description: 'Successfully added keywords to user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}

export function RemoveKeywordFromUserSwaggerDecorator() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove keyword from user' }),
    ApiParam({
        name: 'keyword',
        type: 'string',
        required: true,
    }),
    ApiResponse({
      status: 200,
      type: ResponseModel,
      description: 'Successfully removed keyword from user.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized.' }),
    HttpCode(200),
  );
}