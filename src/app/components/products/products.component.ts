import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../interfaces/product.interface';
import { PaymentService } from '../../services/payment.service';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [CommonModule, ProductItemComponent],
})
export class ProductsComponent implements OnInit {
    @Input() products: IProduct[] = [];
    @Input() balance: number;
    @Input() purchaseState: string; // make type

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        console.log('product component is rendering');
    }

    public selectProduct(product: IProduct): void {
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
