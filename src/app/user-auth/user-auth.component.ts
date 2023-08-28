import { Component, OnInit } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
showLohin:boolean=true;
userError:string='';
  constructor(private user:UserService , private product:ProductService)
  {}
  ngOnInit(): void {
    this.user.userAuthReload()
  }

  signUp(data :signUp)
  {
console.warn(data)
this.user.userSignUp(data);
  }

Login(data :login)
{
 //       this.userError="";
  this.user.userLogin(data);
  this.user.userAuth.subscribe((result)=>{
  if(result)
  {
    this.userError="Please Enter valid credentials";
  }
  else{
    this.localCartToRemoteCall();
  }
  })
}

openSignUp()
{
 this.showLohin=false
}
openLogin()
{
this.showLohin=true
}



localCartToRemoteCall()
{
let data=localStorage.getItem('localCart')
let user = localStorage.getItem('user');
let userId=user&& JSON.parse(user).id;
if(data)
{
  let cartDataList:product[] = JSON.parse(data)
  
  //sending data in db 
  cartDataList.forEach((product:product,index)=>{
    let cartData : cart={
      ...product,
      productId:product.id,
      userId
    }

    delete cartData.id;
  setTimeout(()=>{
    this.product.addToCart(cartData).subscribe((rst)=>{
      if(rst)
      {
        console.warn("item");
        
      }
    })},500);


    if(cartDataList.length===index+1)
    {
      localStorage.removeItem('localCart')
    }
 })
}

setTimeout(()=>{
this.product.getCartList(userId);
},2000)


  
}

}

