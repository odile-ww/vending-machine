import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { coinDenominations } from './constants/constants';
import { PaymentService } from './services/payment.service';
import { IProduct } from './interfaces/product.interface';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    public products: IProduct[] = []; // Make type
    public balance: number = 0;
    public purchaseState = 'Waiting';

    readonly coinDenominations = coinDenominations;

    constructor(private paymentService: PaymentService) {}

    ngOnInit() {
        this.paymentService.getProducts().subscribe(result => (this.products = result));
    }

    public addCoins(amount: string): void {
        this.balance += Math.round(parseFloat(amount) * 10) / 10;
        this.paymentService.updateBalance(this.balance);
    }

    public takeChange(): void {
        this.balance = 0;
        this.paymentService.updateBalance(0);
    }

    public takeProduct(product: IProduct): void {
        console.log('clicked');
        if (product.price >= this.balance) {
            this.purchaseState = 'In progress';
        } else {
            this.purchaseState = 'Denied';
        }
        this.balance = this.balance - product.price;
        this.paymentService.updateBalance(this.balance);
        this.updateProducts(product);
    }

    private updateProducts(selected: IProduct) {
        const updatedStock = this.products.map((item: IProduct) => {
            if (item.id === selected.id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        this.paymentService.updateStock(updatedStock);
    }
}
