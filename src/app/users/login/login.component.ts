import { Component, OnInit } from '@angular/core';
import { loginForm } from '../../shared/interfaces/loginform.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm: loginForm

  public messageAlert: string = ''
  public typeAlert: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  ngOnInit(){
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(form.value).subscribe(
        () => {
          console.log('onSubmit isAuth', this.authService.isAuth())
          
          if(!this.authService.isAuth()){
            this.messageAlert = 'Данные не верны'
            this.typeAlert = 'alert-danger'
            form.reset()
          }else{
            const navigationExtras: NavigationExtras = {state: {data: 'Успешная авторизация', type: 'alert-success'}}
            this.router.navigate(['films'], navigationExtras)
          }
        },
        err => {
          this.messageAlert = err
          this.typeAlert = 'alert-danger'
        }
      )
    }
  }

}
