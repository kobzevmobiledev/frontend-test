import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../providers/services/products.service";
import {Product} from "../../providers/interfaces";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-products-page',
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
    products: Product[] | undefined
    constructor(
        private productsService: ProductsService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.getProducts()
    }

    getProducts() {
        const img_root_folder = 'http://smktesting.herokuapp.com/static/'
        this.productsService.getProducts().subscribe(
            (products) => {
                this.products = products.map(item => Object({...item, img: img_root_folder + item.img}))
            },
            (err: any) => {
                this.snackBar.open(`Request error code ${err.status}. ${err.statusText}`, 'Close', {duration: 3000})
            })
    }


    showProduct(product:Product){
        this.router.navigate(['/product', product.id], { queryParams: product, skipLocationChange: true})
    }

}
