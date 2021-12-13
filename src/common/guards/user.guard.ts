import { lastValueFrom, Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const email = request.user.email;
    const user = await this.usersService.findOne(email);
    request.userId = user.id;
    return !!user;
  }
}
