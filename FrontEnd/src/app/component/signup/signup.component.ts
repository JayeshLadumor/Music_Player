import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  mobile : number;
  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log('Form Has Submitted');
    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      mobile:this.mobile
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are Now Registered and can log in',{cssClass: 'alert-success',timeout: 3000});
        this.router.navigate(['/login']);
		console.log("success");
      }
      else {
        this.flashMessage.show('Something Went Wrong',{cssClass: 'alert-danger',timeout: 3000});
        this.router.navigate(['/register']);
      }
    }) ;

  }


}
