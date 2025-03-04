import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
navigateToLaptop() {
throw new Error('Method not implemented.');
}
  isSidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  
  goToDashboard(): void {
    this.router.navigate(['/main/dashboard']);
  }

 
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToAssets(): void {   
    this.router.navigate(['/main/assets']);
  }
}
