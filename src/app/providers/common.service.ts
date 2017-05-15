import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// declare const SockJS;
// declare const Stomp;

@Injectable()
export class CommonService {

  public baseUrl: string;
  public surveyUrl: string;
  public pollUrl: string;
  public circularUrl: string;

  constructor(private http: CustomHttpService,
              private con: Configuration) {
    this.baseUrl = this.con.baseUrl;
    this.getSockJs();
  }

  getUrl() {
    this.con.getRole();
    this.con.getUserId();
    this.surveyUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/survey/save-info");
    this.pollUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/poll/save-info");
    this.circularUrl = this.baseUrl.concat(this.con.role + "/" + this.con.userId + "/circular/type");
  }

  getStandards() {
    this.getUrl();
    return this.http.get(this.surveyUrl + "/standard")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getSubjects(){
    this.getUrl();
    return this.http.get(this.surveyUrl + "/subjects")
            .map(this.extractData)
            .catch(this.handleError);
  }

  getSurveyInfo() {
    this.getUrl();
    return this.http.get(this.surveyUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getPollInfo() {
    this.getUrl();
    return this.http.get(this.pollUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getCircularInfo() {
    this.getUrl();
    return this.http.get(this.circularUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public storeData(field_name, data) {
    localStorage.setItem(field_name, JSON.stringify(data));
  }

  public getData(field_name) {
    let data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    }
  }

  public getTomorrow() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = ("0" + (currentDate.getDate() + 1)).slice(-2)
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2)
    var year = currentDate.getFullYear()
    let tomorrow = year + '-' + month + '-' + day;
    return tomorrow;
  }

  public getSockJs() {
    let access_token = localStorage.getItem('access_token');
    let url = this.baseUrl + 'management/nxtlife-websocket?access_token=' + access_token;
    // var socket = new SockJS(url);
    // return Stomp.over(socket);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Something is wrong.."`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}