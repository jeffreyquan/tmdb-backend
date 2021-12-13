import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'users/entities/user.entity';

// https://docs.nestjs.com/custom-decorators
export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  },
);
