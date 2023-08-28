import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary, product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | any;
  available = false;
  cartPrice: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }



  constructor(private product: ProductService , private router:Router) { }
  cartDataa : product |any ;
  ngOnInit(): void {
    this.loadDetails();
}

removeToCart(cartId:number|undefined)
{
  let user = localStorage.getItem('user')
  let userId = user && JSON.parse(user).id;
  cartId && this.cartData && this.product.removeToCart(cartId).subscribe((rst)=>{
    this.loadDetails();
    if(rst)
    {
      this.product.getCartList(userId);
    }
  })
}


checkout()
{
  this.router.navigate(['checkout']);
}


loadDetails()
{
  
  this.product.currentCart().subscribe((rst) => {
    this.cartData = rst;
    let price = 0;
    rst.forEach((item) => {
      if (item.quantity) {
        price = price + (+item.price * + item.quantity);
      }
    });
    this.cartPrice.price = price;
    this.cartPrice.discount = price / 10
    this.cartPrice.delivery = 100;
    this.cartPrice.tax = price / 8
    this.cartPrice.total = price / 8 + (price) + 100 - (price / 10)
    console.warn(this.cartPrice);
    if(this.cartData)
    {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 4000);
     
    }
})
}


}