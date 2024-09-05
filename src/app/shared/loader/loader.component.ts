import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  showLoader: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loaderState.subscribe((state: boolean) => {
      this.showLoader = state;
    });
  }
}
