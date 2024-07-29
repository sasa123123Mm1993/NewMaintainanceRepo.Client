import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/sharedModules';
@Component({
  selector: 'app-total-off-meter-report',
  standalone: true,
  imports: [CommonModule, TableModule, SharedModule],
  templateUrl: './total-off-meter-report.component.html',
  styleUrl: './total-off-meter-report.component.scss',
})
export default class TotalOffMeterReportComponent {
  constructor(private meterService: MeterService) {}
  totalsOffMeterList: any = [];
  date: Date = new Date();
  ngOnInit(): void {
    this.meterService.getAllMetersOffReasons().subscribe({
      next: (res) => {
        this.totalsOffMeterList = res;
      },
    });
  }
}
