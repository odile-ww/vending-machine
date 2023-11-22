import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../interfaces/product.interface';
import { VendingMachineService } from '../../services/vending-machine.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-dispenser',
    standalone: true,
    templateUrl: './dispenser.component.html',
    styleUrl: './dispenser.component.scss',
    imports: [CommonModule],
})
export class DispenserComponent implements OnInit {
    constructor(private vendingMachineService: VendingMachineService) {}
    public change: number;
    public selectedProduct: IProduct | null;

    ngOnInit(): void {
        this.vendingMachineService.changeObservable.pipe(distinctUntilChanged()).subscribe(change => {
            this.change = change;
        });
        this.vendingMachineService.selectedProductObservable.pipe(distinctUntilChanged()).subscribe(product => {
            this.selectedProduct = product;
        });
    }

    public takeProduct(): void {
        this.selectedProduct = null;
        this.change = 0;
        this.vendingMachineService.updateSelectedProduct(this.selectedProduct);
        this.vendingMachineService.setChange(this.change);
    }
}
