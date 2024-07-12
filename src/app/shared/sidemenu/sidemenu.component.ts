import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
})
export class SidemenuComponent {
  [x: string]: any;
  constructor(private router: Router) {}
  @Output() sendToggleValue = new EventEmitter<boolean>();
  @Output() sendSelectedPageName = new EventEmitter<string>();
  @Input() MenuList = [
    {
      icon: '',
      title: '',
      link: '',
      active: false,
    },
  ];
  close = true;
  closeMenu(value: any) {
    this.close = !this.close;
    this.sendToggleValue.emit(this.close);
  }
  navigate(value: any) {
    this.sendSelectedPageName.emit(value);
  }
  logout() {
    this.router.navigateByUrl('/login');
  }

}
