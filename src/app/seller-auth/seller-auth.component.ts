import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp, login } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService)
{}
authError:string='';

// signUp(data:SignUp) :void{
//  // console.warn(data)
//   this.seller.userSignUp(data).subscribe((result)=> {
//     if(result)
//     {
//       this.router.navigate(['seller-home'])
//     }
//   });

ngOnInit():void{
  this.seller.reloadSeller()
}

signUp(data:signUp) :void{
 // console.warn(data)
  this.seller.userSignUp(data)
} 
login(data:signUp) :void{
  this.authError="";
 // console.warn(data)
  this.seller.userLogin(data)
  this.seller.isLoginError.subscribe((isError)=>{
  if(isError)
  {this.authError="User Email or password is not correct"}
  }
  )
  // this.seller.userSignUp(data)
 } 
 
showLogin=false;
openLogin()
{
this.showLogin=true
}

openSignUp()
{
  this.showLogin=false
}


}