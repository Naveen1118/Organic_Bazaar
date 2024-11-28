import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  userResp: UserResponse = new UserResponse();
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let userDetails = sessionStorage.getItem('userDetails') as any
    this.userResp = JSON.parse(userDetails);
    let token;  // Get the token from your AuthService
    if(this.userResp== null){
      token="auth token"
    }else{
      token = this.userResp.token
    }

    const excludedUrls = ['/login', '/signup','/subscription/getAll'];

    // Check if the request URL matches any excluded URL
    const shouldExclude = excludedUrls.some(url => req.url.includes(url));

    if (token && !shouldExclude) {
      // Clone the request and add the authorization header only if the URL is not excluded
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }

    // If the URL is excluded or there's no token, simply forward the original request
    return next.handle(req);
  }
}
