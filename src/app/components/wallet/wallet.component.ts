import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { distinctUntilChanged } from 'rxjs';

import { VendingMachineService } from '../../services/vending-machine.service';
import { coinDenominations } from '../../constants/constants';
import { IProduct } from '../../interfaces/product.interface';

@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss',
    imports: [CommonModule],
})
export class WalletComponent implements OnInit {
    public selectedProduct: IProduct | null;
    public balance: number = 0;
    public tempBalance = 0;
    public change = 0;

    readonly coinDenominations = coinDenominations;

    constructor(private vendingMachineService: VendingMachineService) {}

    ngOnInit(): void {
        this.vendingMachineService.balanceObservable
            .pipe(distinctUntilChanged())
            .subscribe(balance => (this.balance = balance));
        this.vendingMachineService.changeObservable
            .pipe(distinctUntilChanged())
            .subscribe(change => (this.change = change));
        this.vendingMachineService.selectedProductObservable.pipe(distinctUntilChanged()).subscribe(product => {
            this.selectedProduct = product;
        });
    }

    public addCoins(amount: string): void {
        this.tempBalance += Math.round(parseFloat(amount) * 10) / 10;
    }

    public confirmTransaction(): void {
        this.balance += this.tempBalance;
        this.tempBalance = 0;
        this.vendingMachineService.updateBalance(this.balance);
    }

    public clear(): void {
        this.change = this.tempBalance;
        this.balance = 0;
        this.tempBalance = 0;
        this.vendingMachineService.updateBalance(0);
    }
}
