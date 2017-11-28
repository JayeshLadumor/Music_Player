import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
declare const angular: any;
import ngMaterial from 'angular-material';

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


myApp = angular.module('myApp', ['mediaPlayer','ngMaterial'])
    .controller('mycontroller', function ($scope,$http) {

      $scope.init = function () {
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
      }



      $scope.found = true;

      $scope.names = ["320kbps", "192kbps", "128kbps"];

      $scope.searchtypes = ['ALBUM', 'SONGS', 'Movie','Artist'];

      $scope.mySpecialPlayButton = function () {
        $scope.customText = 'I started angular-media-player with a custom defined action!';
        $scope.audio1.playPause();
        console.log($scope.audio1.network);
        console.log($scope.audio1.ended);
      };


      $scope.Download = function (value) {

        console.log($scope.playlist1[value].src);
          $scope.SongDetails = {
              name: $scope.playlist1[value].name,
              path: $scope.playlist1[value].src
            }

            if($scope.SongDetails.path.indexOf("Moviename")>-1)
            {
              $scope.type = "Moviename";
            }
            else if($scope.SongDetails.path.indexOf("Albumname")>-1)
            {
              $scope.type = "Albumname";
            }
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

                $http.get('http://localhost:3000/musics/DownloadMusic/'+$scope.SongDetails.name,{headers: headers})
                  .success(function (response) {
                    console.log(response);
                    console.log("Request Complete");
                  });

        };

      $scope.tempdatadoc=[];

      $scope.Search = function () {
          console.log('Seach');
           $scope.SearchDetails = {
             searchitem:$scope.selectsearchitem,
             searchtext:$scope.searchtext
           }
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
               $http.post('http://localhost:3000/musics/seachtext',$scope.SearchDetails,{headers: headers})
                 .success(function (response) {

                   console.log(response);

                   $scope.tempdatadoc=response["docs"];
                   console.log($scope.tempdatadoc);
                   if($scope.tempdatadoc.length!=0)
                   {
                     $scope.playlist1=[];

                     for($scope.i=0;$scope.i<$scope.tempdatadoc.length;$scope.i++)
                     {
                       for($scope.j=0;$scope.j<$scope.tempdatadoc[$scope.i].Data.length;$scope.j++)
                       {
                         console.log($scope.tempdatadoc[$scope.i].Data[$scope.j].Songname);
                         $scope.objectsong = {
                           src:$scope.tempdatadoc[$scope.i].Data[$scope.j].songpath,
                           type:$scope.tempdatadoc[$scope.i].Data[$scope.j].Type,
                           name:$scope.tempdatadoc[$scope.i].Data[$scope.j].Songname
                         }
                         $scope.playlist1.push($scope.objectsong);
                       }
                     }
                     $scope.notfound = false;
                   }
                   else {
                     $scope.notfound = true;
                   }
               });
      };
    });
    }
