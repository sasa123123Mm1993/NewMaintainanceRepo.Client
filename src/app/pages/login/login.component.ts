import { Component, Inject, inject, Injectable, InjectionToken, input, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Login } from '../../shared/models/Login';
import { HttpClient } from '@angular/common/http';
import { LoginRes } from '../../shared/models/LoginRes';
import { AuthService } from '../../shared/service/auth.service';
import { json } from 'stream/consumers';
import { MeterService } from '../../services/meter.service';
const STORAGE_KEY = '';
// export const MY_AWESOME_SERVICE_STORAGE =
//     new InjectionToken<StorageService>('MY_AWESOME_SERVICE_STORAGE');
@Component({

  selector: 'app-login',
  standalone: true,
  imports: [FloatLabelModule,RouterModule,CommonModule,FormsModule,DividerModule,ButtonModule,InputTextModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export default class LoginComponent {

  @Injectable()
  email = '';
  password = '';
  authService = inject(AuthService);
  router = inject(Router);
  @Input() item = ''; 
  
  constructor(private http: HttpClient,
    // @Inject(SESSION_STORAGE) private storage: StorageService,
    // @Inject(MY_AWESOME_SERVICE_STORAGE) private Tokenstorage: StorageService,
    private meterService: MeterService,
  ) {
    this.LoginObj = new Login();
  }


  LoginObj!: Login;
  Response!:LoginRes;
  isLogged() {
    this.router.navigateByUrl('/dashboard');
  }

  

  // OnLogin() {
  //   debugger;7095
  //   this.http.post('http://192.168.15.10:1501/v1/api/Auth/Login/',this.LoginObj).subscribe((
  //   res:any)=>{
  //    if(res.result){
  //     alert("Login Successfully");
  //     localStorage.setItem('User Token',res.data.message);
  //     this.router.navigateByUrl('/dashboard');
  //    }
  //    else{
  //     alert(res.message);
  //    }
  //   })
  //   }


  login(event: Event) {
    debugger;
    event.preventDefault();
    console.log(`Login: ${this.email} / ${this.password}`);
    this.authService
      .login({
        email: this.email,
        password: this.password,}).subscribe({
        next: (res) => {
        alert('Login success!');
        this.Response = res;
        localStorage.setItem('JWT_TOKEN',this.Response.message);
        // this.storage.set(STORAGE_KEY,this.Response.message);
        localStorage.setItem('mm', JSON.stringify(this.Response.message));
        this.router.navigate(['/']);
          }
      });
  }


  OnLogin(userName: string, password: any) {
      debugger;
      this.LoginObj.userName = userName;
      this.LoginObj.password = password;
      this.meterService.Login(this.LoginObj)

      .subscribe((
        res:any)=>{
         if(res.result){
          localStorage.setItem('UserId',res.userId);
          localStorage.setItem('isSucceed',res.isSucceed);
          this.Response = res.data;
          localStorage.setItem('myData',res.message);
          
          this.router.navigateByUrl('/dashboard');
         }
         else{
          alert(res.message);
         }
        })



    }

}


