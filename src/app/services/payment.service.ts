import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private apiUrl = '/api/products';

    //coins balance
    private balanceSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
    public balanceObservable: Observable<number> = this.balanceSubject$.asObservable();

    //products state
    private productsSubject$: BehaviorSubject<IProduct[]>;

    constructor(private httpClient: HttpClient) {}

    public updateBalance(amount: number): void {
        this.balanceSubject$.next(amount);
    }

    public getProducts(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.apiUrl);
    }

    public updateStock(items: IProduct[]) {
        this.productsSubject$.next(items);
    }
}
