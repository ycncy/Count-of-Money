import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          this.recursivelyStripPasswordFields(data);
        }
        return data;
      }),
    );
  }

  private recursivelyStripPasswordFields(obj: any) {
    for (const key of Object.keys(obj)) {
      if (key === 'password') {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        this.recursivelyStripPasswordFields(obj[key]);
      }
    }
  }
}
