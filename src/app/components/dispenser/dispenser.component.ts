import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../interfaces/product.interface';
import { PaymentService } from '../../services/payment.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-dispenser',
    standalone: true,
    templateUrl: './dispenser.component.html',
    styleUrl: './dispenser.component.scss',
    imports: [CommonModule],
})
export class DispenserComponent implements OnInit {
    constructor(private paymentService: PaymentService) {}
    public change: number;
    public selectedProduct: IProduct | null;

    ngOnInit(): void {
        this.paymentService.changeObservable.pipe(distinctUntilChanged()).subscribe(change => {
            this.change = change;
        });
        this.paymentService.selectedProductObservable.pipe(distinctUntilChanged()).subscribe(product => {
            this.selectedProduct = product;
        });
    }

    public takeChange(): void {
        this.change = 0;
        this.paymentService.setChange(this.change);
    }

    public takeProduct(): void {
        this.selectedProduct = null;
        this.paymentService.updateSelectedProduct(this.selectedProduct);
    }
}
