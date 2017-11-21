import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
declare const angular: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quality:String;
  currenttrack:String;
  volumelevel:number;
  selectedQuality:String;
  extScope:any;

  static $inject =['AuthService'];

  constructor(private authService:AuthService,
              private router:Router,
              private flashMessage:FlashMessagesService) {
  }

  ngOnInit() {
                if(this.authService.loggedIn())
                      {
                            if(this.authService.checkadmin())
                                  this.router.navigate(['admindashboard']);
                            else
                                  this.router.navigate(['dashboard']);
                      }
                else  {
                              this.router.navigate(['login']);
                      }

                     // this.getarray();

             }

myApp = angular.module('myApp', ['mediaPlayer'])
    .controller('mycontroller', function ($scope,$http) {
     $scope.xyz = 'Jayesh';

      $scope.number = 2;
      $scope.playlist1 =[
        {src:'../assets/Song_Collection/02 Phir Bhi Tumko Chahunga (Arijit Singh) 190Kbps.mp3',type:'audio/mpeg',name:'02 Phir Bhi Tumko Chahunga (Arijit Singh) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/03 Thodi Der - Half Girlfriend (Farhan Saeed) 190Kbps.mp3',type:'audio/mpeg',name:'03 Thodi Der - Half Girlfriend (Farhan Saeed) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/04 Tu Hi Hai (Rahul Mishra) 190Kbps.mp3',type:'audio/mpeg',name:'04 Tu Hi Hai (Rahul Mishra) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/05 Pal Bhar (Chaahunga Reprise) Arijit 190Kbps.mp3',type:'audio/mpeg',name:'05 Pal Bhar (Chaahunga Reprise) Arijit 190Kbps.mp3'},
        {src:'../assets/Song_Collection/06 Lost Without You (Ami Mishra) 190Kbps.mp3',type:'audio/mpeg',name:'06 Lost Without You (Ami Mishra) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/07 Stay a Little Longer (Anushka Shahaney) 190Kbps.mp3',type:'audio/mpeg',name:'07 Stay a Little Longer (Anushka Shahaney) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/08 Mere Dil Mein (Yash Narvekar) 190Kbps.mp3',type:'audio/mpeg',name:'08 Mere Dil Mein (Yash Narvekar) 190Kbps.mp3'},
        {src:'../assets/Song_Collection/09 Half Girlfriend (Love Theme) Mithoon 190Kbps.mp3',type:'audio/mpeg',name:'09 Half Girlfriend (Love Theme) Mithoon 190Kbps.mp3'},
        {src:'../assets/Song_Collection/10 Mere Dil Mein (Dialogue Version) 190Kbps.mp3',type:'audio/mpeg',name:'10 Mere Dil Mein (Dialogue Version) 190Kbps.mp3'},
      ];


      $scope.names = ["320kbps", "192kbps", "128kbps"];

      $scope.searchtypes = ['ALBUM', 'SONGS', 'Movie'];

      $scope.mySpecialPlayButton = function () {
        $scope.customText = 'I started angular-media-player with a custom defined action!';
        $scope.audio1.playPause();
        console.log($scope.audio1.network);
        console.log($scope.audio1.ended);
      };

      $scope.myCallbackFunction = function (event: any) {
        console.log("Volume Level Changed");
        $scope.audio1.setVolume($scope.newvalue * 0.01);
      };

      $scope.ConvertDownload = function () {
        console.log("Convert Clicked");
        console.log($scope.currenttrack);

        const SongDetails = {
          quality: $scope.selectedQuality,
          Location: $scope.playlist1[$scope.audio1.currentTrack - 1].src
        }
        console.log(SongDetails);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        $http.post('http://localhost:3000/users/convert', SongDetails, {headers: headers})
          .then(function (response) {
            console.log(response);
            console.log("Request Complete");
          });

      };

    });




    }

