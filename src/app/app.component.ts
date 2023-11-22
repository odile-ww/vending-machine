import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent, WalletComponent, DispenserComponent } from './components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, ProductsComponent, WalletComponent, DispenserComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
