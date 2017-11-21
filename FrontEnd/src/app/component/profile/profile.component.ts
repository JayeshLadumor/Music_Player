import { Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {consoleTestResultHandler} from "tslint/lib/test";
declare const angular: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  user: object;
  usertype:String;
  email:String;
  username:String;
  username1:String;
  name:String;

  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.usertype=window.sessionStorage.getItem('Role');
    this.email=window.sessionStorage.getItem('EmailId');
    this.username=window.sessionStorage.getItem('Username');
    this.name=window.sessionStorage.getItem('name');
  }


  myApp1 = angular.module('myApp1', [])
    .controller('controller1',function ($scope) {
      $scope.ChangeProfilePicture = function () {
        console.log('Clicked');
      }

      $scope.clicked = function () {
        console.log('clicked');
      }
    });

  ChangeProfilePicture(){
    console.log('Change Pro Picture');
  }
  Add_Image_To_Database() {
    this.username1=window.sessionStorage.getItem('Username');
    const user={
      name:'xyz.png',
      path:'src/assets/xyz.png',
      type:'image/png'
    };

    this.authService.AddImage(user).subscribe(retdata=>{
      console.log(retdata.data);
      console.log(retdata);
    });
  }

  GetImage()
  {
      this.authService.getImage().subscribe(retdata=>{
      console.log(retdata);
    });
  }

}

