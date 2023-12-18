import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Roles} from "../decorators/roles.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = this.jwtService.verify(request.cookies.access_token, {
            secret: 'superSecretCashMoney',
        });
        return this.matchRoles(roles, user.role);
    }

    private matchRoles(roles: string[], userRole: string): boolean {
        return roles.includes(userRole);
    }
}