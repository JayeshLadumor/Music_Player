import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerform: FormGroup;
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
                this.registerform = new FormGroup({
              'name': new FormControl(null, Validators.required),
              'username': new FormControl(null, Validators.compose([Validators.required, this.nospaceValidator])),
              'email': new FormControl(null, [Validators.required, Validators.email]),
              'password': new FormControl(null, Validators.required),
              'mobile': new FormControl(null,Validators.required)
              });


  }
  nospaceValidator(control: AbstractControl): { [s: string]: boolean } {
    let re = this.registerform.get('username').value;
    if (control.value && control.value.match(re)) {
      return { nospace: true };
    }
  }

  onRegisterSubmit() {
    console.log('Form Has Submitted');

    const user = {
      name: this.registerform.get('name').value,
      username: this.registerform.get('username').value,
      password: this.registerform.get('password').value,
      email: this.registerform.get('email').value,
      mobile:this.registerform.get('mobile').value,
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
