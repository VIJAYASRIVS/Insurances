import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularServiceService } from '../services/angular-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{  
  isLoggedIn: boolean = false;

  constructor(private angularService: AngularServiceService, private router: Router) { }

  ngOnInit(): void {
    
    this.isLoggedIn=true; 
    
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    // Clear authentication state upon logout
    this.angularService.logout();
    this.isLoggedIn = false; // Update isLoggedIn status
    // Navigate to login page
    this.router.navigate(['/login']);
  }
  }

  


