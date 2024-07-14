import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';

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
  countries: any[] | undefined;
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
      icon: 'bx bx-cog',
      title: 'إدارة المستخدمين',
      link: '/usersSettings',
      active: false,
    },
    {
      icon: 'bx bxs-user-account',
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
      icon: 'bx bxs-report',
      title: 'تقرير اجمالي أعطال العدادات',
      link: '/totalOffMeterReport',
      active: false,
    },
  ];
  selectedCountry: string | undefined;
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
  constructor(private location: Location) {}

  ngOnInit() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
    this.currentPath = this.location.path();
    for (let i = 0; i < this.sideMenuContent.length; i++) {
      if (this.sideMenuContent[i].link == this.currentPath) {
        this.pageTitle = this.sideMenuContent[i].title;
        this.sideMenuContent[i].active = true;
      }
    }
  }
}
