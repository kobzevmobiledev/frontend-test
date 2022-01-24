import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../providers/services/auth.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    username:string | undefined = 'Guest'

    constructor( public authService: AuthService, private router:Router ) { }

    ngOnInit(): void { }

    logout() {
        this.authService.logout()
    }

}
