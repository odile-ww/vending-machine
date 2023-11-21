import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private apiUrl = '/api/products';

    //coins state
    private balanceSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
    public balanceObservable: Observable<number> = this.balanceSubject$.asObservable();
    private changeSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
    public changeObservable: Observable<number> = this.changeSubject$.asObservable();

    //products state
    private productsSubject$ = new BehaviorSubject<IProduct[]>([]);
    public productsObservable: Observable<IProduct[]> = this.productsSubject$.asObservable();
    private selectedProductSubject$ = new BehaviorSubject<IProduct>({} as IProduct);
    public selectedProductObservable: Observable<IProduct> = this.selectedProductSubject$.asObservable();

    //transaction state
    private isReadySubject$ = new BehaviorSubject<boolean>(false);
    public isReadyObservable: Observable<boolean> = this.isReadySubject$.asObservable();

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

    public setReadyState(state: boolean): void {
        this.isReadySubject$.next(state);
    }

    public setChange(amount: number): void {
        this.changeSubject$.next(amount);
    }

    public updateSelectedProduct(product: IProduct): void {
        this.selectedProductSubject$.next(product);
    }
}
