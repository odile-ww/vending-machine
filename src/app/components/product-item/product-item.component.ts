import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

import { IProduct } from '../../interfaces/product.interface';
import { distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-product-item',
    standalone: true,
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.scss',
    imports: [CommonModule],
})
export class ProductItemComponent implements OnInit {
    @Input() item: IProduct;
    @Output() updateProducts = new EventEmitter<IProduct>();
    public isDisabled: boolean = true;
    private balance: number;
    private canSelectProduct: boolean;

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.balanceObservable.pipe(distinctUntilChanged()).subscribe(balance => {
            this.balance = balance;
        });
        this.paymentService.canSelectObservable.pipe(distinctUntilChanged()).subscribe(state => {
            this.canSelectProduct = state;
            console.log(this.balance <= this.item.price);
            this.isDisabled = this.balance <= this.item.price || !this.canSelectProduct;
        });
    }

    public selectProduct(product: IProduct): void {
        if (product.price >= this.balance) {
            this.canSelectProduct = true;
        } else {
            this.canSelectProduct = false;
        }
        this.balance = this.balance - product.price;
        this.paymentService.updateBalance(this.balance);
        this.updateProducts.emit(product);
    }
}
