import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
          if(this.loggedIn())
              {
                this.router.navigate(['dashboard']);
              }
          else {
                this.router.navigate(['login']);
              }
        }
loggedIn() {
        return tokenNotExpired('id_token');
    }
  onLoginSubmit()
  {
    const user = {
      username : this.username,
      password : this.password
    }

    console.log(user.username+" "+user.password);

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success)
      {
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show("you are now Logged In",{cssClass:'alert-success',timeout:1000});
        this.router.navigate(['dashboard']);
      }
      else {
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:5000});
        this.router.navigate(['login']);
      }
    });
  }
}
