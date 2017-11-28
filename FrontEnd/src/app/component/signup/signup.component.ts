import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {



  registerForm: FormGroup;
  name: String;
  username: String;
  email: String;
  password: String;
  mobile : number;
  usertype: String;
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      mobile: new FormControl(null,Validators.required)
    });
  }
 /* nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
    let re = this.registerform.get('username').value;
    if (control.value && control.value.match(re)) {
      return { nospace: true };
    }
  }*/
  regEx="/^[0-9]{10,10}$/";
  onRegisterSubmit() {
    console.log('Form Has Submitted');

    const user = {
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value,
      mobile:this.registerForm.get('mobile').value,
      usertype:"General"
    }

    console.log(user.name);

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are Now Registered and can log in',{cssClass: 'successcustom',timeout: 2000});
        this.router.navigate(['/login']);

      }
      else {
        this.flashMessage.show(data.message,{cssClass: 'failcustom',timeout: 2000});
        this.router.navigate(['/register']);
      }
    }) ;

  }
}
