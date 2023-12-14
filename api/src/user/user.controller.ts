import {
    Controller,
    SerializeOptions,
    Put,
    Request,
    Delete,
    Get,
    Param,
    HttpException,
    Body,
    Post, ParseArrayPipe, BadRequestException, UseGuards,
} from '@nestjs/common';
import {UserService} from './user.service';
import {UserEntity} from './entity/user.entity';
import {UpdateUserDto} from './dto/update-user.dto';
import {DecodedToken} from 'src/auth/auth.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {
    AddKeywordsToUserSwaggerDecorator,
    DeleteUserSwaggerDecorator,
    GetAllUserSwaggerDecorator,
    GetMeUserSwaggerDecorator,
    GetUserSwaggerDecorator, RemoveKeywordFromUserSwaggerDecorator,
    UpdateMeUserSwaggerDecorator,
    UpdateUserSwaggerDecorator,
} from '../swagger-decorator/user-swagger.decorators';
import {ResponseModel} from '../response-model/response.model';
import {AuthGuard} from "@nestjs/passport";
import {Roles} from "../auth/decorators/roles.decorator";

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@SerializeOptions({excludePrefixes: ['password', 'role', 'id']})
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UserService) {
    }

    @AddKeywordsToUserSwaggerDecorator()
    @Post('keywords')
    async addKeyword(
        @Request() req: Request & { user: DecodedToken },
        @Body(
            'keywords',
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true,
                exceptionFactory: () => {
                    throw new BadRequestException(
                        "Invalid parameter 'keywords': must be a valid list",
                    );
                },
            }),
        ) keywords: string[]
    ): Promise<ResponseModel> {
        return await this.usersService.addKeywords(req.user.sub, keywords);
    }

    @RemoveKeywordFromUserSwaggerDecorator()
    @Delete('keywords/:keyword')
    async removeKeyword(
        @Request() req: Request & { user: DecodedToken },
        @Param('keyword') keyword: string
    ): Promise<ResponseModel> {
        return await this.usersService.removeKeyword(req.user.sub, keyword);
    }

    @GetMeUserSwaggerDecorator()
    @Get('profile')
    async getProfile(
        @Request() req: Request & { user: DecodedToken },
    ): Promise<UserEntity> {
        return await this.usersService.findOne(req.user.sub);
    }

    @UpdateMeUserSwaggerDecorator()
    @Put('profile')
    async updateProfile(
        @Request() req: Request & { user: DecodedToken },
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<ResponseModel> {
        return await this.usersService.update(req.user.sub, updateUserDto);
    }

    @GetUserSwaggerDecorator()
    @Roles(['ADMIN'])
    @Get(':userId')
    async get(
        @Param('userId') userId: number,
    ): Promise<UserEntity> {
        return await this.usersService.findOne(userId);
    }

    @GetAllUserSwaggerDecorator()
    @Roles(['ADMIN'])
    @Get()
    async getAll(): Promise<UserEntity[]> {
        return await this.usersService.getAll();
    }

    @UpdateUserSwaggerDecorator()
    @Put(':userId')
    async update(
        @Request() req: Request & { user: DecodedToken },
        @Body() updateUserDto: UpdateUserDto,
        @Param('userId') userId: number,
    ): Promise<ResponseModel> {
        const authenticatedUserId = req.user.sub;
        if (authenticatedUserId === userId || req.user.role === 'ADMIN') {
            return await this.usersService.update(userId, updateUserDto);
        }
        throw new HttpException('Unauthorized', 401);
    }

    @DeleteUserSwaggerDecorator()
    @Delete(':userId')
    async delete(
        @Request() req: Request & { user: DecodedToken },
        @Param('userId') userId: number,
    ): Promise<ResponseModel> {
        const authenticatedUserId = req.user.sub;
        if (authenticatedUserId === userId || req.user.role === 'ADMIN') {
            return await this.usersService.delete(userId);
        }
        throw new HttpException('Unauthorized', 401);
    }
}
