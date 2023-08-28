import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orderData: order[] | any;

  constructor(private product: ProductService) {

  }
  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((rst) => {
      this.getOrderList();

    })
  }

  getOrderList() {
    this.product.orderList().subscribe((rst) => {
      this.orderData = rst
    })



  }

}