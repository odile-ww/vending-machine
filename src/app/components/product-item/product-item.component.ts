import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IProduct } from '../../interfaces/product.interface';

@Component({
    selector: 'app-product-item',
    standalone: true,
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.scss',
    imports: [CommonModule],
})
export class ProductItemComponent implements OnInit {
    @Input() item: IProduct;

    ngOnInit(): void {
        console.log(this.item);
    }
}
