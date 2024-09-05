import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

import { AuthService } from '../../shared/service/auth.service';
import { MeterService } from '../../services/meter.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, CardModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent{
  authService = inject(AuthService);
  user?: any;

  logged: boolean = true;
  users:any[]=[];
  userList: any = [];
  // constructor(private http:HttpClient,private meterService: MeterService){
  //   this.authService.getCurrentAuthUser().subscribe((r) => {
  //     console.log(r);
  //     this.user = r;
  //   });
  // }

    constructor(private http:HttpClient,private meterService: MeterService){
    this.authService.getCurrentAuthUser().subscribe((r) => {
      console.log(r);
      this.user = r;
    });
  }

  ngOnInit():void{
    this.getAllUsers();
  }


  getAllUsers() {
    this.meterService.getAllUsers().subscribe({
      next: (res) => {
        this.userList = res;
        console.log(this.userList);
      },
    });

  }


  logout() {
    this.authService.logout();
  }

  refreshToken() {
    this.authService.refreshToken()?.subscribe(() => {});
  }


}
