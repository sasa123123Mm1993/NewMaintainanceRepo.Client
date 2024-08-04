import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { MeterService } from '../../services/meter.service';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [
    SidemenuComponent,
    CommonModule,
    RouterOutlet,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.scss',
})
export class MainBodyComponent {
  currentUrl!: string;
  closedMenu: boolean = true;
  pageTitle!: string;
  //countries
  sections!: any[];
  //sideMenu list
  sideMenuContent = [
    {
      icon: 'bx bx-home',
      title: 'الرئيسية',
      link: '/dashboard',
      active: false,
    },
    {
      icon: 'bx bx-wrench',
      title: 'إضافة اعطال العدادات',
      link: '/fixMeters',
      active: false,
    },
    {
      icon: 'bx bx-spreadsheet',
      title: 'أسباب رفع العدادات',
      link: '/reasons',
      active: false,
    },
    {
      icon: 'bx bxs-user-account',
      title: 'إدارة المستخدمين',
      link: '/usersSettings',
      active: false,
    },
    {
      icon: 'bx bx-cog',
      title: 'صلاحيات المستخدمين',
      link: '/usersPermissions',
      active: false,
    },
    {
      icon: 'bx bx-transfer',
      title: 'نقل البيانات بوصلة ضوئية',
      link: '/dataTransfer',
      active: false,
    },
    {
      icon: 'bx bx-credit-card-front',
      title: 'إصدار كروت التحكم',
      link: '/cards',
      active: false,
    },
    {
      icon: 'bx bx-file',
      title: 'تقرير أعطال العدادات',
      link: '/offMeterReport',
      active: false,
    },
    {
      icon: 'bx bxs-report',
      title: 'تقرير اجمالي أعطال العدادات',
      link: '/totalOffMeterReport',
      active: false,
    },

  ];
  selectedSection: number | undefined;
  currentPath!: string;
  toggleFromMenu(value: any) {
    this.closedMenu = value;
  }
  getPageTitle(returnedPageName: any) {
    this.pageTitle = returnedPageName;
    for (let i = 0; i < this.sideMenuContent.length; i++) {
      if (this.sideMenuContent[i].title == returnedPageName) {
        this.sideMenuContent[i].active = true;
      } else {
        this.sideMenuContent[i].active = false;
      }
    }
  }
  getSelectedSection(){
    console.log('jjjjjjjjjjjjjjjj',this.selectedSection)
  }
  constructor(private location: Location, private meterService: MeterService) {}

  ngOnInit() {
    this.currentPath = this.location.path();
    for (let i = 0; i < this.sideMenuContent.length; i++) {
      if (this.sideMenuContent[i].link == this.currentPath) {
        this.pageTitle = this.sideMenuContent[i].title;
        this.sideMenuContent[i].active = true;
      }
    }
    this.meterService.getAllSections().subscribe({
      next: (res) => {
        this.sections = res;
      },
    });
  }
}
