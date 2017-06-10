import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from './common.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class AuthService {

  constructor(private http: CustomHttpService,
              public commonService: CommonService,
              private con: Configuration) {
    this.serverUrl = con.url;
  }

  serverUrl: string;
  public login: any = false;
  headers: any;
  id;
  access_token: string;

  // called after logout
  resetLoginStatus() {
    this.login = false;
  }

  isLoggedIn() {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {        
      return !this.login;
    } else {
      return this.login;
    }
  }

  verifyUser(data): Observable<any[]> {
    return this.http.post(this.serverUrl + "/oauth/token?grant_type=password&username="+data.username+"&password="+data.password, {})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getUserInfo(): Observable<any[]> {
    return this.http.get(this.serverUrl + "/management/info")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this.serverUrl + "/management/logout")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  forgotPassword(data) {
    return this.http.put(this.serverUrl + "/forgot-password", data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  resetPassword(data) {
    return this.http.put(this.serverUrl + "/management/" + this.con.userId + "/password", data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  storeData(data) {
    localStorage.setItem("id", data.id);
    localStorage.setItem("role", data.role);
    this.commonService.storeData("classTeacher", data.classTeacher);
    this.commonService.storeData("username", data.username);
    this.commonService.storeData("email", data.email);
    localStorage.setItem("name", data.name);
    this.commonService.storeData("nickName", data.nickName);
    localStorage.setItem("fileUrl", data.fileUrl);
    localStorage.setItem("picOriginalName", data.picOriginalName);
    localStorage.setItem("picTimestamp", data.picTimestamp);
    localStorage.setItem('picUrl', data.fileUrl+"/"+data.picTimestamp);
    this.con.setAccessToken();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.status);
  }

}
