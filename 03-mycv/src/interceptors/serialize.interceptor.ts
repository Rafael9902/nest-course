import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { UseInterceptors, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

interface ClassConstructor {
	new (...args: any[]): {}
}

export const Serialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: any){}

	intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
		return handler.handle().pipe(
			map((data: any) => {
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		)
	}
}
