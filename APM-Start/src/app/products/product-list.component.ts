import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  errorMessage: any;
  sub!: Subscription;
  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  performFilter(filter: string): IProduct[] {
    let filterBy = filter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  ngOnInit(): void {
    //this.listFilter = 'cart';
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = this.products;
        this.filteredProducts = products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  visibleImage: boolean = true;
  private _listFilter: string = '';
  filteredProducts: IProduct[] = [];

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ' + this._listFilter);
    this.filteredProducts = this.performFilter(value);
  }

  toggleImage(): void {
    // this.visibleImage === true
    //   ? (this.visibleImage = false)
    //   : (this.visibleImage = true);
    this.visibleImage = !this.visibleImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product list: ' + message;
  }

  products: IProduct[] = [];
}
