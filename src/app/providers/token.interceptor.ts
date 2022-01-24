import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable()
export class TokenInterceptor implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.authService.isAuth()){
            request = request.clone({
                setHeaders:{
                    Authorization: this.authService.getToken()
                }
            })
        }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse): Observable<any>=>{
                if(error.status === 401){
                    this.router.navigate(['/login'], {
                       queryParams:{
                           sessionExpired:true
                       }
                    })
                }

                return throwError(error)
            })
        );
    }

}
