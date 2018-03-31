import { Injectable } from '@angular/core';
import {AppConst} from '../constants/app.const';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';

@Injectable()
export class UserService {
  private serverPath: string = AppConst.serverPath;
  constructor(private http: HttpClient) { }

  newUser(username: string, email: string) {
  let url = this.serverPath+"/user/newUser";
  let userInfo = {
    "username" : username,
    "email" : email
  };

  let tokenHeader = new HttpHeaders({
    'Content-Type' : 'application/json',
    'x-auth-token' : localStorage.getItem('xAuthToken')
  });

  return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader});

  }

  getCurrentUser() {
    let url = this.serverPath+'/user/getCurrentUser';

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.get<User>(url, {headers : tokenHeader});
  }

  onUpdateUserInfo(user: User, newPassword: string, currentPassword: string) {
    let url = this.serverPath+"/user/updateUserInfo";
    let userInfo = {
      "id" : user.id,
      "username" : user.username,
      "email" : user.email,
      "firstName" : user.firstName,
      "lastName" : user.lastName,
      "currentPassword" : currentPassword,
      "newPassword" : newPassword
    };

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader});
  }

  retrievePassword(email: string) {
    let url = this.serverPath+"/forgetPassword";
    let userInfo = {
      "email" : email
    };

    let tokenHeader = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, JSON.stringify(userInfo), {headers: tokenHeader});

  }

}
