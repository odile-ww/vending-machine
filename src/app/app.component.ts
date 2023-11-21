import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './components/products/products.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { DispenserComponent } from './components/dispenser/dispenser.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ProductsComponent, WalletComponent, DispenserComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
