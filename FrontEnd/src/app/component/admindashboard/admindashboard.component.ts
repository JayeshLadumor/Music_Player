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

  userdetails: any;
  Add_Music:any;
  Delete_Music:any;
  Modify_Music:any;
  User_Details:any;
  ngOnInit() {
    this.userdetails = false;
    this.Add_Music=true;
    this.Delete_Music=false;
    this.Modify_Music=false;
    this.User_Details=false;

  }
    formData: FormData = new FormData();
    filepath:any;
  fileChange(event) {
    var files = event.target.files;
    console.log(files[0].name);
    console.log(files[0].size);
  }

  onSubmit()
  {
    console.log('On Submit');
    console.log(this.filepath);
  }


  //inject angular file upload directives and services.
  app = angular.module('myApp', ['ngFileUpload'])
    .controller('MyCtrl', ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {


      // For Add Music
      $scope.names = ["Movie","Album"];
      $scope.uploadPic = function(file) {

      file.upload = Upload.upload({
        url: 'http://localhost:3000/musics/uploadedmusic',
        data: {
              moviename: $scope.moviename,
              songname: $scope.songname,
              artistname: $scope.artistname,
              musicoralbum: $scope.musicoralbum,
              file: file
            }
       });

      file.upload.then(function (response) {
          if(response.data.success)
                {
               console.log("Success");
                }
          else {
               console.log("False");
               }
          });
        }

      $scope.Add_Music=true;
      $scope.Delete_Music=false;
      $scope.Modify_Music=false;
      $scope.User_Details=false;
      $scope.arrayofmoviename = ["Bahuballi 2","Fast and Furious 2","Half Girlfriend"];
      $scope.arrayofsongname = ["Jiyo re bahuballi..","Veeron Ke Veer Aa","Soja Zara"];
      $scope.Add_Music_To_Database = function () {
        $scope.Add_Music=true;
        $scope.Delete_Music=false;
        $scope.Modify_Music=false;
        $scope.User_Details=false;
        console.log('Add Music');
      }

      $scope.Delete_Music_To_Database = function () {
        $scope.Add_Music=false;
        $scope.Delete_Music=true;
        $scope.Modify_Music=false;
        $scope.User_Details=false;
        console.log('Delete Music');
        //$scope.arrayofsongname = [];
    /*    $http.get('http://localhost:3000/musics/getsongarray')
          .success(function (data) {
           $scope.arrayofsongname.push(data);
         }); */
      }

      $scope.Modify_Music_To_Database = function () {
        $scope.Add_Music=false;
        $scope.Delete_Music=false;
        $scope.Modify_Music=true;
        $scope.User_Details=false;
        console.log('Modify Music');
      }

      $scope.User_Detail_Show = function () {
        $scope.Add_Music=false;
        $scope.Delete_Music=false;
        $scope.Modify_Music=false;
        $scope.User_Details=true;
        console.log('User Details');
      }

      // Delete Music

      $scope.DeleteMusic = function () {
        console.log('Delete Music File Load');
      }
      /*$http.get('http://localhost:3000/musics/getsongarray').subscribe(function (data) {
        console.log(data);
      })*/

      /* $http({
          method:'GET',
          url:'http://localhost:3000/musics/getsongarray',
        }).success(function (result) {
          $scope.arrayofsongname=result;
        }) */



}]);



}


/* maincontroller = angular.module('myApp', [])
 .controller('maincontroller', function ($scope,$http) {

 $scope.Add_Music=true;
 $scope.Delete_Music=false;
 $scope.Modify_Music=false;
 $scope.User_Details=false;

 $scope.Add_Music_To_Database = function () {
 $scope.Add_Music=true;
 $scope.Delete_Music=false;
 $scope.Modify_Music=false;
 $scope.User_Details=false;
 console.log('Add Music');
 }

 $scope.Delete_Music_To_Database = function () {
 $scope.Add_Music=false;
 $scope.Delete_Music=true;
 $scope.Modify_Music=false;
 $scope.User_Details=false;
 console.log('Delete Music');
 }

 $scope.Modify_Music_To_Database = function () {
 $scope.Add_Music=false;
 $scope.Delete_Music=false;
 $scope.Modify_Music=true;
 $scope.User_Details=false;
 console.log('Modify Music');
 }

 $scope.User_Detail_Show = function () {
 $scope.Add_Music=false;
 $scope.Delete_Music=false;
 $scope.Modify_Music=false;
 $scope.User_Details=true;
 console.log('User Details');
 }

 $scope.upload=function() {
 const formData: any = new FormData();
 const files: Array<File> = $scope.filesToUpload;

 formData.append("file", files[0]['name']);
 console.log(formData);
 //  this.http.post('http://localhost:3001/upload', formData)
 //  .map(files => files.json())
 //.subscribe(files => console.log('files', files))
 }


 $scope.fileChangeEvent=function(fileInput: any) {
 console.log('File Change Event');
 this.filesToUpload = <Array<File>>fileInput.target.files;
 this.product.photo = fileInput.target.files[0]['name'];
 }


 $scope.uploadVideo = function () {
 var file=$scope.musicfile;
 var fd = new FormData();  //Create FormData object
 fd.append('file', 'Jayesh Ladumor');

 console.log(fd);
 $http({
 method:'POST',
 url:"http://localhost:3000/musics/uploadvideo",
 data:fd,
 withCredentials: true,
 headers: {'Content-Type': undefined },
 transformRequest: angular.identity
 });

 }
 }); */
