import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../providers/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Credentials} from "../../../providers/interfaces";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    form: FormGroup
    loading = false
    registerSub: Subscription | undefined

    constructor(private router: Router,
                private authService: AuthService,
                private snackBar: MatSnackBar,
                private formBuilder: FormBuilder) {
        this.form = new FormGroup({
            username: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
            })
    }

    ngOnInit(): void { }

    ngOnDestroy() {
        if (this.registerSub) this.registerSub.unsubscribe()
    }

    // Form submit
    onSubmit() {
        this.form.disable()
        this.loading = true
        const credentials: Credentials = this.form.value
        this.authService.register(credentials).subscribe((response) => {
            if(response.success){
                this.formEnableDelay()
                this.router.navigate(['/login'])
                this.snackBar.open('Register success, now you can login to system', 'Close', {duration: 3000})
                this.loading = false
            }
            else{
                this.snackBar.open(response.message, 'Close', {duration: 3000})
                this.form.enable()
            }

            },
            (err: HttpErrorResponse) => {
                this.snackBar.open(`Request error code ${err.status}. ${err.statusText}`, 'Close', {duration: 3000})
                this.formEnableDelay()
                this.loading = false
            })
    }

    formEnableDelay() {
        setTimeout(() => {
            this.form.enable()
        }, 1000)
    }
}
