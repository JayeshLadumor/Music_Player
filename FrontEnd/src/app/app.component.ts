import { Component,OnInit} from '@angular/core';

import { AuthService } from './services/auth.service';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
                  if(this.authService.loggedIn())
                  {
                    this.router.navigate(['dashboard']);
                  }
                  else
                  {
                    this.router.navigate(['login']);
                  }
            }
}
