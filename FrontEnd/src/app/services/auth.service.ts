import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
declare const angular: any;
@Injectable()
export class AuthService {

  constructor(private http:Http)   { }

  authToken: any;
  user: any;

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers})
      .map(res => res.json());
  }

    sendemail(user) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/users/forget', user,{headers: headers})
        .map(res => res.json());
    }
  storeUserData(token, user,usertype) {
    window.sessionStorage.setItem('Role',usertype);
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    window.sessionStorage.setItem('EmailId',user.email);
    window.sessionStorage.setItem('Username',user.username);
    window.sessionStorage.setItem('name',user.name);
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    window.sessionStorage.clear();
  }

  getProfile() {
      const headers = new Headers();
      this.loadToken();
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type', 'application/json');
      return this.http.get('http://localhost:3000/users/profile', {headers: headers})
        .map(res => res.json());
  }


  checkadmin() {
        const usertype=window.sessionStorage.getItem('Role');
        console.log(usertype);
         if(usertype!='Admin')
            {
            return false;
            }
        return true;
  }


  ConvertDownloadSong() {
        console.log("In Authenticate Service");
    let headers = new Headers();
    headers.append('Content-Type','application/json');
  }

  AddImage(imageobj) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    console.log(imageobj);
    return this.http.post('http://localhost:3000/musics/uploadMusic',imageobj,{headers: headers})
      .map(res => res.json());
  }

  getImage()
  {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getupload', {headers: headers})
      .map(res => res.json());
  }
}


