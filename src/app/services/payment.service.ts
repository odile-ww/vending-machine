import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { products } from '../../assets/products';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    //coins balance
    private balanceSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
    public balanceObservable: Observable<number> = this.balanceSubject$.asObservable();

    //products state
    private productsSubject$: BehaviorSubject<IProduct[]> = new BehaviorSubject(products);

    public updateBalance(amount: number): void {
        this.balanceSubject$.next(amount);
    }

    public getProducts(): Observable<IProduct[]> {
        return this.productsSubject$;
    }

    public updateStock(items: IProduct[]) {
        this.productsSubject$.next(items);
    }
}
