import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { distinctUntilChanged, take } from 'rxjs';

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
    public products: IProduct[] = [];

    constructor(private paymentService: PaymentService) {}
    ngOnInit() {
        this.paymentService
            .getProducts()
            .pipe(take(1))
            .subscribe(result => {
                this.paymentService.updateStock(result);
            });

        this.paymentService.productsObservable
            .pipe(distinctUntilChanged())
            .subscribe(products => (this.products = products));
    }

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
