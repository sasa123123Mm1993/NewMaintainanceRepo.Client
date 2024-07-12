import { Component } from '@angular/core';

@Component({
  selector: 'app-users-settings',
  standalone: true,
  imports: [],
  templateUrl: './users-settings.component.html',
  styleUrl: './users-settings.component.scss'
})
export default class UsersSettingsComponent {
  logged: boolean = true;
}
