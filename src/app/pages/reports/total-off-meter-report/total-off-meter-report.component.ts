import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeterService } from '../../../services/meter.service';
import { Table, TableModule } from 'primeng/table';
import { SharedModule } from '../../../shared/sharedModules';
import { LoaderService } from '../../../services/loader.service';
@Component({
  selector: 'app-total-off-meter-report',
  standalone: true,
  imports: [CommonModule, TableModule, SharedModule],
  templateUrl: './total-off-meter-report.component.html',
  styleUrl: './total-off-meter-report.component.scss',
})
export default class TotalOffMeterReportComponent {
  constructor(
    private meterService: MeterService,
    private loaderService: LoaderService
  ) {}
  totalsOffMeterList: any = [];
  reportFilterObj: any = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  getSearchResult() {
    const fromDate = this.formatDateToYYYYMMDD(
      this.reportFilterObj.fromDate
    ).toString();
    const toDate = this.formatDateToYYYYMMDD(
      this.reportFilterObj.toDate
    ).toString();
    const sentFilter = {
      fromDate,
      toDate,
    };
    console.log('sent obj', sentFilter);
    this.loaderService.showLoader();
    this.meterService.getTotalOffMetersReport(sentFilter).subscribe({
      next: (res) => {
        this.totalsOffMeterList = [res];
        console.log('totalRepoRes : ', this.totalsOffMeterList);
        this.loaderService.hideLoader();
      },
    });
  }
  ngOnInit(): void {
    // this.meterService.getAllMetersOffReasons().subscribe({
    //   next: (res) => {
    //     this.totalsOffMeterList = res;
    //   },
    // });
  }
}
