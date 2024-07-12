import { Component, EventEmitter, Output } from '@angular/core';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidemenuComponent, CommonModule, CardModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export default class DashboardComponent {
  logged: boolean = true;
}
