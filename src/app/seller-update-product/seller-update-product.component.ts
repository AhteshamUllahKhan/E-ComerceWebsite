import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {Router} from '@angular/router'


@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData: undefined | product
  productMessage: undefined | string
  constructor(private route: ActivatedRoute, private product: ProductService , private rtt:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.warn(data);
      this.productData = data;
    })
  }

  submit(data: product) {
    console.warn(data);
    if(this.productData)
    {
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is Updated"
        
      }
      setTimeout(() => {
        this.productMessage = undefined
        this.rtt.navigate(['seller-home']);
      }, 3000)
    })
  }
}
