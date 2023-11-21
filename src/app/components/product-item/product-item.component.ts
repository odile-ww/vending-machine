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
    private change: number = 0;

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.balanceObservable.pipe(distinctUntilChanged()).subscribe(balance => {
            this.balance = balance;
            this.isDisabled = this.balance < this.item.price || this.item.quantity === 0;
        });
    }

    public selectProduct(product: IProduct): void {
        this.change = this.balance - product.price;
        this.balance = 0;
        this.paymentService.updateBalance(this.balance);
        this.updateProducts.emit(product);
        this.paymentService.setChange(this.change);
        this.paymentService.updateSelectedProduct(product);
    }
}
