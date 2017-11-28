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

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  uploadPic(x)
  {
    console.log('clicked');
  }

  myApp = angular.module('myApp', ['ngFileUpload'])
    .controller('ProCtrl',['$scope','$http','Upload','$timeout',function ($scope,Upload,$http,$timeout) {

      $scope.uploadPic = function (file) {
        console.log('clicked');
        file.upload = Upload.upload({
          url: 'http://localhost:3000/users/uploadImage',
          data: {
            file: file,
            username:window.sessionStorage.getItem('Username')
          }
        });

        file.upload.then(function (response) {
          if (response.data.success) {
            $scope.success=response.data.success;
          }
          else {
            $scope.success1=response.data.success;
          }
        });
      }
    }]);

}

