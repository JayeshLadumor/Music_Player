import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
          if(this.loggedIn())
              {  this.router.navigate(['dashboard']);  
              }
          else {  this.router.navigate(['login']);
              }
          }

loggedIn() {
  return tokenNotExpired('id_token');
}
}
