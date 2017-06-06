import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class CircularService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
              private con: Configuration) {
    this.getUrl();
  }

  getUrl() {
    this.serverUrl = this.con.Server;
  }

  public GetCirculars(pageNo) {
    return this.http.get(this.serverUrl + '/circular/page/' + pageNo)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public GetparticularCircular(id) {
    return this.http.get(this.serverUrl + '/circular/' + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  public PostCircular(data) {
    return this.http.post(this.serverUrl + '/circular', data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
		if (res.status === 204) { return res; }
		let body = res.json();
		return body || { };
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