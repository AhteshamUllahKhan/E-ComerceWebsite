import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import{faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  //Define
  productMessage: string | undefined;
  productList: product[] | undefined;
 indexoff:undefined|number;
  icon=faTrash;
  editicon=faEdit;

  constructor(private productt: ProductService) {

  }


  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
     this.productt.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is Deleted"
        this.list();
      }
    });
     setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }



  list() {
    this.productt.productList().subscribe((result) => {
      console.warn(result);
      this.productList = result;
       this.indexoff = [result].indexOf(result); 
    
    })
  }


}
