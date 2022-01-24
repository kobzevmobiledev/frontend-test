import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product, Rate, RateResponse, Review} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductsService {
    serverURL = 'http://smktesting.herokuapp.com'
    constructor(private http:HttpClient) {
    }

    getProducts():Observable<Product[]>{
        return this.http.get<Product[]>(`${this.serverURL}/api/products/`)
    }

    setRate(id:number, review:Review):Observable<RateResponse>{
        return this.http.post<RateResponse>(`${this.serverURL}/api/reviews/${id}`, review)
    }

    getReviews(id:number):Observable<any[]>{
        return this.http.get<any[]>(`${this.serverURL}/api/reviews/${id}`)
    }

}
