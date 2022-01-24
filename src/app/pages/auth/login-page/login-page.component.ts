import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../../providers/services/auth.service";
import {Credentials} from "../../../providers/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy{
    form: FormGroup
    loginSub: Subscription | undefined

    constructor(
        private auth: AuthService,
        private router: Router,
        private snackBar:MatSnackBar,
        private route: ActivatedRoute) {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        })
    }

    ngOnInit() {}
    ngOnDestroy() {
        if (this.loginSub) this.loginSub.unsubscribe()
    }

    onSubmit() {
        this.form.disable()
        const credentials: Credentials = this.form.value
        this.loginSub = this.auth.login(credentials).subscribe(
            (response) => {
                if (response.success) {
                    this.auth.setToken(response.token)
                    this.auth.setUser(credentials)
                    this.router.navigate(['/products'], { replaceUrl: true})
                } else {
                    this.snackBar.open(response.message, 'Close', {duration: 3000})
                    this.form.enable()
                }
            },
            (err:any) => {
                this.snackBar.open(`Request error code ${err.status}. ${err.statusText}`, 'Close', {duration: 3000})
                this.form.enable()
            })
    }


}
