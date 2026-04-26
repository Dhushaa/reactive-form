import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonItem, IonLabel,
  IonInput, IonButton, IonToast
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonContent, IonItem, IonLabel,
    IonInput, IonButton, IonToast
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  showToast = false;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.showToast = true;
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onReset() {
    this.userForm.reset();
  }
}