import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularServiceService } from '../services/angular-service.service';
import { Observable, tap } from 'rxjs'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId: string = ''; 
  password: string = ''; 
  errorMessage$: Observable<string>; 
  isLoggedIn: boolean = false; 
  @Output() loggedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private angularService: AngularServiceService, private router: Router) { 
    this.errorMessage$ = this.angularService.errorMessage$; 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  login(): void {
    this.angularService.login(this.userId, this.password)
      .pipe(
        tap(response => { 
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isLoggedIn = true;
         
         this.loggedInEvent.emit(true);

        })
      )
      .subscribe({
        next: () => {
          // Navigate to dashboard upon successful login 
          
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials');
          // Handle login error
        }
      });
  }

  logout(): void {
    // Clear authentication flag upon logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    // Optionally navigate to login page
    this.router.navigate(['/login']);
  }
}

