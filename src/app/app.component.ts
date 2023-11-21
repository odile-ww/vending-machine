import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { distinctUntilChanged, take } from 'rxjs';

import { PaymentService } from './services/payment.service';
import { IProduct } from './interfaces/product.interface';
import { ProductsComponent } from './components/products/products.component';
import { WalletComponent } from './components/wallet/wallet.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ProductsComponent, WalletComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    public products: IProduct[] = [];
    public balance: number = 0;
    public change: number = 0;

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.paymentService
            .getProducts()
            .pipe(take(1))
            .subscribe(result => {
                this.products = result;
                this.paymentService.updateStock(result);
            });
        this.paymentService.balanceObservable
            .pipe(distinctUntilChanged())
            .subscribe(balance => (this.balance = balance));
        this.paymentService.productsObservable
            .pipe(distinctUntilChanged())
            .subscribe(products => (this.products = products));
        this.paymentService.changeObservable.pipe(distinctUntilChanged()).subscribe(change => {
            this.change = change;
        });
    }

    public takeChange(): void {
        this.change = 0;
        this.paymentService.setChange(this.change);
    }
}
