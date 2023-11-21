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
    public selectedProduct: IProduct;

    ngOnInit(): void {
        this.paymentService.changeObservable.pipe(distinctUntilChanged()).subscribe(change => {
            this.change = change;
        });
    }

    public takeChange(): void {
        this.change = 0;
        this.paymentService.setChange(this.change);
    }

    public takeProduct(): void {
        this.selectedProduct = {} as IProduct;
    }
}
