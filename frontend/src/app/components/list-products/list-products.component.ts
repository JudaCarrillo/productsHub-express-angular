import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  private _productService = inject(ProductService);
  private _toaStr = inject(ToastrService);

  listProducts: Product[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    this._productService.getAllProducts().subscribe((data) => {
      this.listProducts = data;
      this.loading = false;
    });
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getAllProducts();
      this._toaStr.warning(
        'This product was successfully removed',
        'Removed Product'
      );
    });
  }
}
