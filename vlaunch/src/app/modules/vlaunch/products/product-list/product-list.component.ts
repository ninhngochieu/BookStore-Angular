import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: any;
  subscription = new Subscription();

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    let page;

    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        page = params.page;
      })
    );

    if (page && page !== null) {
      this.productsService.getProducts({ page: page });
    } else {
      this.productsService.getProducts();
    }

    this.subscription.add(
      this.productsService.products$.subscribe((products) => {
        this.products = products;
      })
    );
  }
}
