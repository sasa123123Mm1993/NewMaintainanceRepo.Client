import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { MainBodyComponent } from './shared/main-body/main-body.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,SidemenuComponent,MainBodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practice';
  toggleToChild = false;
  closeMenu(val:any){
    this.toggleToChild = !this.toggleToChild;
  }
}
