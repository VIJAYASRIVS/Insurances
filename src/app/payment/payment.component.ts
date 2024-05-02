import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent { 
  
  userId: string = '';
  securityCode: number = 0;
  cardDetails: any[] = [];
  editCardForm: any = {};
  deleteCardForm: any = {};
  editFormVisible: boolean = false;
  deleteFormVisible: boolean = false;
  showAddCardForm: boolean = false;
  showDeleteForm: boolean = false; // Initialize to false to hide the form by default
  cardOwnerName: string = '';
  deleteSecurityCode: number = 0;
  newCard: any = {
    cardOwnerName: '',
    cardNumber: '',
    bankName: '',
    validity: '',
    securityCode: '',
    cardId:''
    
  };

  constructor(private paymentService: PaymentService) {}

  makePayment() {
    this.paymentService.makePayment(this.userId, this.securityCode).subscribe(
      (response) => {  
        console.log('it works'); 
        console.log('Card details:', response);  


       
        this.cardDetails = response; // Assign the response to the cardDetails object  
        console.log('Assigned card details:', this.cardDetails);
       
      },
      (error) => {
        console.error('Error:', error); 
        alert('Invalid credentials');
        // Handle error here
      }
    );
  } 
  toggleAddCardForm() {
    this.showAddCardForm = !this.showAddCardForm;
  }

  submitAddCardForm() {
    this.paymentService.addCard(this.newCard).subscribe(
      (response) => {  
        console.log('New card added:', response); 
        this.cardDetails.push(response); 
        // Optionally, you can reset the form fields here
        this.newCard = {
          cardOwnerName: '',
          cardNumber: '',
          bankName: '',
          validity: '',
          securityCode: '',
          cardId:''
          
          
        };
        // Optionally, you can hide the form here
        this.showAddCardForm = false;
      },
      (error) => {
        console.error('Error adding card:', error);
        // Handle error here
      }
    );
  } 
  toggleEditForm() {
    this.editFormVisible = !this.editFormVisible;
    // Reset editFormVisible to false if it's true when the user clicks the edit button again
    
  }
  
  openEditForm(card: any) {
    // Populate edit form fields with card details
    this.editCardForm = { ...card }; // Make a copy to avoid modifying the original card object
    this.editFormVisible = true; 
    alert('Edit form appears below');// Show the edit form
  }

  // Add editCard method to handle editing the card details
  editCard() {
    // Call service to edit card details
    this.paymentService.editCard(this.editCardForm).subscribe(
      (response) => {
        console.log('Card edited successfully:', response); 
        const index = this.cardDetails.findIndex(card => card.cardId === response.cardId);
      if (index !== -1) {
        // Update the card detail in the cardDetails array with the edited data
        this.cardDetails[index] = response;
      }
        
        // Optionally, close the edit form after successful editing
        this.editFormVisible = false;
      },
      (error) => {
        console.error('Error editing card:', error);
        // Handle error
      }
    );
  } 

  deleteCard(cardId: number) {
    this.paymentService.deleteCard(cardId).subscribe(
      () => {
        
        // Update the cardDetails array after deleting the card
        this.cardDetails = this.cardDetails.filter(card => card.cardId !== cardId);
       // alert('Card deleted successfully , please refresh and login again');
      },
      (error) => {
        alert('Card deleted successfully , please refresh and login again');
        //console.error('Error deleting card:', error);
        // Handle error
      }
    );
  }
  
  
  
}
  
  
  
  



