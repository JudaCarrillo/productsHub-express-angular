import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product.model';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ProgressBarComponent,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',
})
export class AddEditProductComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _productService = inject(ProductService);
  private _router = inject(Router);
  private _activatedRouter = inject(ActivatedRoute);
  private _toaStr = inject(ToastrService);
  loading: boolean = false;
  id!: number;
  productForm!: FormGroup;
  operation!: string;

  constructor() {
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(1)]],
      stock: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.getIdProduct();

    if (this.id) {
      this.operation = 'Edit';
      this.getProductById(this.id);
    } else {
      this.operation = 'Add';
    }
  }

  public getIdProduct() {
    this._activatedRouter.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  public hasErrors(field: string, typeError: string) {
    return (
      this.productForm.get(field)?.hasError(typeError) &&
      this.productForm.get(field)?.touched
    );
  }

  public getProductById(id: number) {
    this.loading = true;
    this._productService.getProductById(id).subscribe((data: Product) => {
      this.loading = false;
      this.productForm.patchValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
    });
  }

  public productManagement(event: Event) {
    event.preventDefault();

    const strPrice = this.productForm.value.price;
    const numberPrice = parseFloat(strPrice);
    const strStock = this.productForm.value.stock;
    const numberStock = parseInt(strStock);

    const product: Product = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: numberPrice,
      stock: numberStock,
    };

    this.loading = true;

    if (!this.id) {
      this._productService.createProduct(product).subscribe(() => {
        this.loading = false;
        this._toaStr.success(
          `The product ${product.name} was successfully registered`,
          'Registered product'
        );
        this._router.navigate(['/']);
      });
    } else {
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this._toaStr.info(
          `The product ${product.name} was updated successfully`,
          'Updated product'
        );
        this._router.navigate(['/']);
      });
    }
  }
}
