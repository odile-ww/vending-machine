import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { distinctUntilChanged } from 'rxjs';

import { PaymentService } from '../../services/payment.service';
import { coinDenominations } from '../../constants/constants';

@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss',
    imports: [CommonModule],
})
export class WalletComponent implements OnInit {
    public balance: number = 0;
    public tempBalance = 0;
    public change = 0;

    readonly coinDenominations = coinDenominations;

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.balanceObservable
            .pipe(distinctUntilChanged())
            .subscribe(balance => (this.balance = balance));
        this.paymentService.changeObservable.pipe(distinctUntilChanged()).subscribe(change => (this.change = change));
    }

    public addCoins(amount: string): void {
        this.tempBalance += Math.round(parseFloat(amount) * 10) / 10;
    }

    public confirmTransaction(): void {
        this.balance = this.tempBalance;
        this.tempBalance = 0;
        this.paymentService.updateBalance(this.balance);
        this.paymentService.setReadyState(true);
    }

    public clear(): void {
        this.change = this.tempBalance;
        this.balance = 0;
        this.tempBalance = 0;
        this.paymentService.updateBalance(0);
        this.paymentService.setReadyState(false);
    }
}
