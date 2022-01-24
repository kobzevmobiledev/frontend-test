import {Injectable} from "@angular/core";
import {AuthResponse, Token, Credentials} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})

export class AuthService {
    serverURL = 'http://smktesting.herokuapp.com'
    token: string | null | undefined
    public user: Credentials | null | undefined

    constructor(private http: HttpClient, private router:Router) { }

    setToken(token: any) {
        this.token = token
        localStorage.setItem('auth-token', token)
    }

    getToken(): any {
        return this.token
    }

    isAuth(): boolean {
        return Boolean(this.token)
    }

    getUser(): Credentials {
        const credentials:Credentials | any = localStorage.getItem('auth-user')
        return JSON.parse(credentials)
    }

    setUser(user: Credentials | null) {
        this.user = user
        localStorage.setItem('auth-user', JSON.stringify({username:user?.username}))
    }

    login(credentials: Credentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.serverURL}/api/login/`, credentials)
    }

    register(credentials: Credentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.serverURL}/api/register/`, credentials)
    }

    logout() {
        this.setToken(null)
        this.setUser(null)
        localStorage.clear()
        this.router.navigate(['/login'])
    }

}
