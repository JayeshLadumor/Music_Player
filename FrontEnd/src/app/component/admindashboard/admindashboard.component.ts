import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService} from 'angular2-flash-messages';
declare var angular:any;
///import {FileDropDirective} from 'angular2-file-drop';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private authService: AuthService,
              private flashMessage:FlashMessagesService) {
  }
  ngOnInit() {

  }

  app = angular.module('myApp', ['ngFileUpload'])
      .controller('MyCtrl', ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {


        $scope.init = function () {
            $scope.success=false;
            $scope.success1=true;
            $scope.success2=false;

            $scope.arrayofmoviename = ['Select'];

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            $http.get('http://localhost:3000/musics/getmoviearray', {headers: headers})
                .success(function (data) {
                            $scope.movies = data["movies"];
                            console.log($scope.movies);

                         for ($scope.j = 0; $scope.j < $scope.movies.length; $scope.j++) {

                            $scope.res = ($scope.movies[$scope.j].Moviename != undefined) && ($scope.arrayofmoviename.includes($scope.movies[$scope.j].Moviename) == false);

                            if ($scope.res) {
                              $scope.arrayofmoviename.push($scope.movies[$scope.j].Moviename);
                            }

                            $scope.resa = ($scope.movies[$scope.j].Albumname != undefined) && ($scope.arrayofmoviename.includes($scope.movies[$scope.j].Albumname) == false);

                            if ($scope.resa) {
                              $scope.arrayofmoviename.push($scope.movies[$scope.j].Albumname);
                            }
              }
              console.log('Data Pushed to Movie Array!!');
            });


        }



        // For Add Music
          $scope.names = ["Movie", "Album"];

          $scope.uploadPic = function (file,file1) {

              $scope.success=false;
              $scope.success1=true;
              $scope.success2=true;


              file.upload = Upload.upload({
                url: 'http://localhost:3000/musics/uploadedmusic',
                data: {
                    moviename: $scope.moviename,
                    songname: $scope.songname,
                    artistname: $scope.artistname,
                    musicoralbum: $scope.musicoralbum,
                    file: file,
                    artists: $scope.artistname,
                    ImageFile:file1
                  }
                });

              file.upload.then(function (response) {
                $scope.success2=false;
                if (response.data.success) {
                  $scope.success=response.data.success;
                }
                else {
                  $scope.success1=response.data.success;
                }
              });
        }

        $scope.Add_Music = true;
        $scope.Delete_Music = false;
        $scope.Modify_Music = false;
        $scope.User_Details = false;

        $scope.Add_Music_To_Database = function () {
          $scope.Add_Music = true;
          $scope.Delete_Music = false;
          $scope.Modify_Music = false;
          $scope.User_Details = false;
          console.log('Add Music');
        }

        $scope.musics = [];
        $scope.movies = [];
        $scope.songs = [];

        $scope.Delete_Music_To_Database = function () {

              $scope.Add_Music = false;
              $scope.Delete_Music = true;
              $scope.Modify_Music = false;
              $scope.User_Details = false;
              console.log('Delete Music');
              $scope.arrayofsongname = [];
        }


        $scope.movieload = function () {

          $scope.arrayofsongname = [];

          if($scope.movieoralbumname=="Select")
          {
            alert('Please Select Movie name');
          }

          if($scope.movieoralbumname != "Select") {
            $scope.movieselectdata = {moviename: $scope.movieselect};

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            $http.post('http://localhost:3000/musics/getsongarray', $scope.movieselectdata, {headers: headers})
              .success(function (data) {
                $scope.songs = data["songs"];
                for ($scope.j = 0; $scope.j < $scope.songs[0].Data.length; $scope.j++) {
                  $scope.arrayofsongname.push($scope.songs[0].Data[$scope.j].Songname);
                }
              });
          }

          $scope.Delete_Song = function () {
            console.log('Delete');
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            $scope.deleteobj = {
              movieselect: $scope.movieselect,
              songselect: $scope.songselect
            }

            $http.post('http://localhost:3000/musics/deletesong', $scope.deleteobj, {headers: headers})
              .success(function (data) {
                if (data.result) {
                  console.log('Song Deleted Successfully..');
                  $scope.index1 = $scope.arrayofsongname.indexOf($scope.songselect);
                  $scope.arrayofsongname.splice($scope.index1, 1);
                }
                else {
                  console.log('Song Not Deleted');
                }
              });
          }


        }

        $scope.Modify_Music_To_Database = function () {
          $scope.Add_Music = false;
          $scope.Delete_Music = false;
          $scope.Modify_Music = true;
          $scope.User_Details = false;
          console.log('Modify Music');
        }

        $scope.User_Detail_Show = function () {
          $scope.Add_Music = false;
          $scope.Delete_Music = false;
          $scope.Modify_Music = false;
          $scope.User_Details = true;
          console.log('User Details');
        }
      }]);
}


