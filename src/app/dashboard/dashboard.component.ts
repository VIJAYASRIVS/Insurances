import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements 
OnInit {
  
  user: any = {}; // Initialize user object

  constructor(private router:Router) { }

  ngOnInit(): void {
    // Retrieve user details from local storage
    const currentUserString = localStorage.getItem('currentUser');

    if (currentUserString) {
      this.user = JSON.parse(currentUserString);
      console.log('it shows details:');
    } else {
      // Handle case when user details are not found in local storage
      console.error('User details not found in local storage.');
    }

} 

paynow()
{
    this.router.navigate(['/payment']); 
}
}