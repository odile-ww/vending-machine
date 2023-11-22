import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineService } from '../../services/vending-machine.service';

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

    constructor(private vendingMachineService: VendingMachineService) {}

    ngOnInit(): void {
        this.vendingMachineService.balanceObservable.pipe(distinctUntilChanged()).subscribe(balance => {
            this.balance = balance;
            this.isDisabled = this.balance < this.item.price || this.item.quantity === 0;
        });
    }

    public selectProduct(product: IProduct): void {
        this.change = this.balance - product.price;
        this.balance = 0;
        this.vendingMachineService.updateBalance(this.balance);
        this.updateProducts.emit(product);
        this.vendingMachineService.setChange(this.change);
        this.vendingMachineService.updateSelectedProduct(product);
    }
}
