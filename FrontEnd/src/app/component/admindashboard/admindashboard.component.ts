import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

///import {FileDropDirective} from 'angular2-file-drop';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor(private authService:AuthService) { }

  userdetails:any;
  ngOnInit() {
  this.userdetails=false;
  }


  Add_User_Details() {
    this.userdetails=true;
  }

  Add_Image_To_Database() {

    const user={

      path:'src/assets/xyz.jpg',
      type:'image/jpg'
    };

    this.authService.AddImage(user).subscribe(data=>{

    });
  }

}
