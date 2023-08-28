import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  popularProduct:undefined|product[];
  trendyProducts:undefined|product[];
 // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product:ProductService)
  {}
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>
    {
      console.warn(data)
      this.popularProduct=data;
    })
    this.product.trendyProducts().subscribe((data)=>
    {
      console.warn(data)
      this.trendyProducts=data;
    
    })
  }

}
