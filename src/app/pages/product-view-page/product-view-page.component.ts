import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Product, Rate, Review } from "../../providers/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../../providers/services/products.service";
import { AuthService } from "../../providers/services/auth.service";
import { Location } from '@angular/common'
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-product-view-page',
    templateUrl: './product-view-page.component.html',
    styleUrls: ['./product-view-page.component.scss']
})
export class ProductViewPageComponent implements OnInit {
    form: FormGroup
    product: Product | any
    ratingArr: Rate[] = []
    rating: number = 0
    reviews: any = []

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService,
        public authService: AuthService,
        private location: Location,
        private snackBar: MatSnackBar,
        ) {
        this.form = new FormGroup({
            text: new FormControl(null, [Validators.required]),
        })
    }

    ngOnInit(): void {
        //  Generate stars array
        for (let i = 0; i < 5; i++) {
            this.ratingArr.push({id: i, active: false})
        }

        this.route.queryParams.subscribe(params => this.product = params)

        this.getReviews()
    }

    setRate(id: number) {
        this.rating = id
        // @ts-ignore
        this.ratingArr = this.ratingArr.map((rate: any, i: number) => {
            rate.active = !!(rate.id < id);
            return rate
        })
        console.log(this.ratingArr, 'ratingArr')
    }

    onSubmit() {
        const review: Review = {
            text: this.form.value.text,
            rate: this.rating
        }


        this.productsService.setRate(this.product.id, review).subscribe(
            (rate) => {
                console.log(rate, 'rate')
            },
            (err: any) => {
                this.snackBar.open(`Request error code ${err.status}. ${err.statusText}`, 'Close', {duration: 3000})
            })
    }

    getReviews() {
        this.productsService.getReviews(this.product.id,).subscribe(
            (reviews) => {
                this.reviews = reviews.map((review) => Object({...review, stars: this.numToArray(review.rate)}))
            },
            (err: any) => {
                this.snackBar.open(`Request error code ${err.status}. ${err.statusText}`, 'Close', {duration: 3000})
            })
    }


    // Utils
    numToArray(num:number) {
        return Array.from({ length: 5 }).map((rate: any, i: number) => {
            return Object({active: !!(i + 1 <= num)});
        })
    }

    navBack() {
        this.router.navigate(['/products']);
    }

}
