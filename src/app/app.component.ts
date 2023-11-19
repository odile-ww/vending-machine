import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { coinDenominations } from './constants/constants';
import { PaymentService } from './services/payment.service';
import { IProduct } from './interfaces/product.interface';
import { ProductsComponent } from './components/products/products.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ProductsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    public products: IProduct[] = [];
    public balance: number = 0;
    public purchaseState = 'Waiting';

    readonly coinDenominations = coinDenominations;

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.paymentService.getProducts().subscribe(result => (this.products = result));
        this.paymentService.balanceObservable.subscribe(balance => {
            this.balance = balance;
        });
    }

    public addCoins(amount: string): void {
        this.balance += Math.round(parseFloat(amount) * 10) / 10;
        this.paymentService.updateBalance(this.balance);
    }

    public takeChange(): void {
        this.balance = 0;
        this.paymentService.updateBalance(0);
    }
}
