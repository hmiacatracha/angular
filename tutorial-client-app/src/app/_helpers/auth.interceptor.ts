import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../_service/auth/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';
//const TOKEN_HEADER_KEY = 'x-access-token';

/**
 * https://medium.com/@insomniocode/angular-autenticaci%C3%B3n-usando-interceptors-a26c167270f4
 * https://bezkoder.com/angular-jwt-authentication/
 */
@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

	constructor(private token: TokenStorageService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.token.getToken();
		let request = req;
		if (token) {
			request = req.clone({
				setHeaders: {
					TOKEN_HEADER_KEY: 'Bearer ${token}'
				}
			});
		}
		return next.handle(request);
	}
}

export const authInterceptorProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptorService,
		multi: true //permite añadir mas interceptros
	}
];

