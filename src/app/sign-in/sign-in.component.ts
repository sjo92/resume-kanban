import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  Roles: any = ['Admin', 'Author', 'Reader'];
  type ='register'
  constructor(private authService: AuthService) { }

  registerForm = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),    
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
    role: new UntypedFormControl('')
  })

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  })

  ngOnInit(): void {

  }
  
  changeForm(type: any){
    this.type = type;
  }
  register() {
    const email_ = this.registerForm.get('email')!.value;
    const password_ = this.registerForm.get('password')!.value;
    this.authService.SignUp(email_, password_)
    console.log("sign up sccessful")
  }
  login() {
    const email_ = this.loginForm.get('email')!.value;
    const password_ = this.loginForm.get('password')!.value;
    this.authService.SignIn(email_, password_).then(
      ()=> {
        this.authService.loggedIn();
      } 
    )
    console.log("login sccessful")
  }
}
