import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { BackgroundGridComponent } from './shared/ui/background-grid/background-grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, BackgroundGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'GameVault';
}
