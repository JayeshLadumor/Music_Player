import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  loginForm: FormGroup;
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
                  if(this.authService.loggedIn())
                      {  this.router.navigate(['dashboard']);  }
                  else {
                        this.router.navigate(['login']);
                      }

                  this.loginForm = new FormGroup({
                                  'username': new FormControl(null, Validators.required),
                                  'password': new FormControl(null, Validators.required)
                                  });
              }


  onLoginSubmit()
  {

  const user = {
    username: this.loginForm.get('username').value,
    password: this.loginForm.get('password').value
  }

    console.log(user.username+" "+user.password);

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success)
      {
        this.authService.storeUserData(data.token,data.user,data.usertype);
        this.flashMessage.show("you are now Logged In ..",{cssClass:'successcustom',timeout:1000});
        if(this.authService.checkadmin())
        {
          this.router.navigate(['admindashboard']);
        }
        else
          this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show(data.msg,{cssClass:'failcustom',timeout:2000});
        this.router.navigate(['login']);
      }
    });
  }
}
