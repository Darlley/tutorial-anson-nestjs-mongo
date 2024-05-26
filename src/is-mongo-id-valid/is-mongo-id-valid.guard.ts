import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isValidObjectId } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class IsMongoIdValidGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const keys = this.reflector.get<string[]>(
      'is-mongo-id-valid',
      context.getHandler(),
    );

    if (!keys) {
      return true;
    }

    for (const key of keys) {
      const paramId = request.params[key];
      if (!isValidObjectId(paramId)) {
        throw new BadRequestException(
          `O parâmetro ${key} não é um ID válido do MongoDB.`,
        );
      }
    }

    return true;
  }
}
