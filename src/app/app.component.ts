import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voice';
  routes: Routes = [];

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Fetch the routes from the router
    this.routes = this.router.config;
    console.log(this.routes);
  }

}
