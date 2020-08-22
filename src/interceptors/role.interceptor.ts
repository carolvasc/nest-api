import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Result } from '../backoffice/models/result.model';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public roles: string[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    console.log(payload);

    let hasRole = false;
    payload.roles.forEach(role => {
      if (this.roles.includes(role)) hasRole = true;
    });

    if (!hasRole) {
      throw new HttpException(
        new Result('Acesso não autorizado', null, [], false),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
