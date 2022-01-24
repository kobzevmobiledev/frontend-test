import {Component, OnInit} from '@angular/core';
import { fromEvent } from 'rxjs';
import {AuthService} from "./providers/services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'rn-service';
    isAuth = false

    constructor(public authService: AuthService, private router:Router, private snackBar:MatSnackBar) {
    }

    ngOnInit() {
        // Check token
        const token = localStorage.getItem('auth-token')
        if (token) this.authService.setToken(token)

        // Check connection
        this.checkConnection()

        // Logged in and redirect
        this.isAuth = this.authService.isAuth()
        if (this.isAuth) {
            this.router.navigate(['/products'])
            return
        }
        this.router.navigate(['/login'])
    }

    // Check connection
    checkConnection(){
        const offline = fromEvent(window, 'offline')
        const online = fromEvent(window, 'online')

        offline.subscribe(()=> {
            this.message('Connection problem.')
        })

        online.subscribe(()=> {
            this.message('Connection stable.')
        })
    }

    // Connection message
    message(text:string){
        this.snackBar.open(text, 'Close', {duration: 3000})
    }


}
