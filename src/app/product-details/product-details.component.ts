import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productInfo: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(private active: ActivatedRoute, private product: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.active.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productInfo = data;

      // Remove Cart 
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((rst) => {
          let item = rst.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData=item[0];
            this.removeCart = true;
          }
        })
      }
    }
    )
  }



  handleQuantity(val: String) {

    if (this.productQuantity < 20 && val === 'max') {
      this.productQuantity += 1
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  AddToCart() {
    if (this.productInfo) {
      this.productInfo.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productInfo);
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productInfo,

          productId: this.productInfo.id,
          userId
        }
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((rst) => {
          if (rst) {
            this.product.getCartList(userId);
            this.removeCart = true;
           // alert("Product added")
          }
        })
      }

    }
  }
  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {


      this.product.removeItemfromCart(productId);
    
    }
    else {
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id;
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((rst)=>{
        if(rst)
        {
          this.product.getCartList(userId);
        }
      })
      this.removeCart = false;
    }

  }


}