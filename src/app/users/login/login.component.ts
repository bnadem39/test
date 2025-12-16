import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm!: FormGroup

 ngOnInit(): void {
  this.loginForm =new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })   
 }

 get password(){ return this.loginForm.get('password')}

 login(){
  console.log(this.loginForm.value);
 }
}
