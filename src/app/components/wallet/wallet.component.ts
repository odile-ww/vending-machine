import { Component, Input, OnInit } from '@angular/core';
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
    @Input() balance: number;
    public machineReadyState: boolean;
    readonly coinDenominations = coinDenominations;

    constructor(private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.paymentService.isReadyObservable
            .pipe(distinctUntilChanged())
            .subscribe(state => (this.machineReadyState = state));
    }

    public addCoins(amount: string): void {
        this.balance += Math.round(parseFloat(amount) * 10) / 10;
        this.paymentService.updateBalance(this.balance);
        this.paymentService.setReadyState(true);
    }

    public confirmTransaction(): void {
        this.paymentService.setCanSelect(true);
    }

    public clear(): void {
        this.balance = 0;
        this.paymentService.updateBalance(0);
        this.paymentService.setReadyState(false);
    }
}
