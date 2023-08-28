import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }


  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }
    ).subscribe((result) => {

      // this.isSellerLoggedIn.next(true);
      if (result) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        // console.warn('result', result);
      }
    })

  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data: login) {
    //console.warn(data)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.warn(result)
      if (result && result.body && result.body.length === 1) {

        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        console.warn("Login Successfull")
        console.warn('result', result);
      }
      else {
        console.warn("Login Failed")
        this.isLoginError.emit(true);
      }

    })


  }
}
