import {applyDecorators} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SignInDto} from "../auth/auth.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";

export function LoginSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Login' }),
        ApiResponse({
            status: 200,
            description: 'Successfully logged in.',
            type: String,
        }),
        ApiBody({ type: SignInDto })
    );
}

export function RegisterSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Register' }),
        ApiResponse({
            status: 200,
            description: 'Successfully registered.',
            type: String,
        }),
        ApiBody({ type: CreateUserDto })
    );
}

export function GoogleCallbackSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Login with Google callback' }),
        ApiResponse({
            status: 200,
            description: 'Successfully logged in with Google.',
            type: String,
        })
    );
}

export function GoogleLoginSwaggerDecorator() {
    return applyDecorators(
        ApiOperation({ summary: 'Login with Google' }),
        ApiResponse({
            status: 200,
            description: 'Successfully logged in with Google.',
            type: String,
        })
    );
}


