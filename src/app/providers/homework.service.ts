import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class HomeworkService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private con: Configuration) {
    this.getUrl();
  }

  getUrl() {
    this.serverUrl = this.con.Server;
  }

  public GetStandard() {
    return this.http.get(this.serverUrl + '/standard')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getSubjects(stan) {
    return this.http.get(this.serverUrl + "/standard/" + stan + "/subject")
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public PostHomework(body) {
    return this.http.post(this.serverUrl, body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getHomework(pageNo) {
    return this.http.get(this.serverUrl + '/homework/page/' + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public getOldHomework(pageNo) {
    return this.http.get(this.serverUrl + '/homework/old/page/' + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || ''}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
