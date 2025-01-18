
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import * as dotenv from "dotenv";
  import { JwtService } from '@nestjs/jwt';

  dotenv.config();
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.JWTCONSTANSSECRET
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
        const authorizationHeader = request.headers['authorization'];
        if (!authorizationHeader) {
          return undefined;
        }
        const [type, token] = authorizationHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
      }
      
  }
  