import { Component, Input } from '@angular/core';
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
export class ProductsComponent {
    @Input() products: IProduct[] = [];
    @Input() balance: number;
    @Input() purchaseState: string; // make type

    constructor(private paymentService: PaymentService) {}

    public onUpdateProducts(selected: IProduct) {
        const updatedStock = this.products.map((item: IProduct) => {
            if (item.id === selected.id) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        this.paymentService.updateStock(updatedStock);
    }
}
