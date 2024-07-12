import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-data-transfer',
  standalone: true,
  imports: [CardModule,InputTextModule,FormsModule,ButtonModule],
  templateUrl: './data-transfer.component.html',
  styleUrl: './data-transfer.component.scss'
})
export default class DataTransferComponent {
  logged: boolean = true;
  data:string|undefined;
  COMPort:string|undefined;
}
