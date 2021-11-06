import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackingIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let headers;

    if (context.getType() === 'http') {
      headers = context.switchToHttp().getRequest().headers;
    }

    headers.trackingId = uuidv4();
    return next.handle();
  }
}
