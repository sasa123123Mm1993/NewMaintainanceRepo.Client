import { MeterService } from './../../../services/meter.service';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-data-transfer',
  standalone: true,
  imports: [CardModule, InputTextModule, FormsModule, ButtonModule],
  templateUrl: './data-transfer.component.html',
  styleUrl: './data-transfer.component.scss',
})
export default class DataTransferComponent {
  logged: boolean = true;
  data: string | undefined;
  COMPort: string | undefined;
  constructor(private meterService: MeterService) {}
  readCard() {
    this.meterService.readCard().subscribe({
      next: (res) => {
        console.log('after read card : ', res);
      },
    });
  }
  cardObj = {
    CardToken: '',
  };
  writeCard(data: any) {
    console.log('cardData', data);
    this.cardObj.CardToken = data;
    console.log("full obj",this.cardObj)
    this.meterService.writeCard(this.cardObj).subscribe({
      next: (res) => {
        console.log('after write card : ', res);
      },
    });
  }
}
