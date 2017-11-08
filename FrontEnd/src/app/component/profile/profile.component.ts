import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
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

  baseimg:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.usertype=window.sessionStorage.getItem('Role');
    this.email=window.sessionStorage.getItem('EmailId');
    this.username=window.sessionStorage.getItem('Username');
    this.name=window.sessionStorage.getItem('name');

    this.Add_Image_To_Database();
  }

  Add_Image_To_Database() {
    this.username1=window.sessionStorage.getItem('Username');
    const user={
      path:'src/assets/xyz.png',
      type:'image/png',
      username:this.username1
    };

    this.authService.AddImage(user).subscribe(retdata=>{
        this.baseimg='data:image/png;base64,'+retdata.data.data;
        console.log(retdata.data);
        console.log(retdata);
    });
  }

}
