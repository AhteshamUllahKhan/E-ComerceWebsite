import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userAuth=new EventEmitter<boolean>(false)
  userLogin(data: login) {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result)=>
    {
     // console.warn(result);
      if(result && result.body?.length)
      {
        this.userAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        console.warn(result)
    
      }
      else{
        this.userAuth.emit(true);
      }
    
    })
  }

  constructor( private http:HttpClient , private router:Router) {

   }
  userSignUp(user:signUp)
  {
this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>
{
  console.warn(result);
  if(result)
  {
    localStorage.setItem('user',JSON.stringify(result.body));
    this.router.navigate(['/']);

  }

})
  }
  userAuthReload()
  {
    if(localStorage.getItem('user'))
    this.router.navigate(['/'])
  }
}
