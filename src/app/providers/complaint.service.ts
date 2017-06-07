import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';


@Injectable()
export class ComplaintService {
  private baseUrl: string = "";
  constructor(public con: Configuration,
    public http: CustomHttpService) {
    this.baseUrl = con.Server;
  }
  getComplaint(url, pageNo) {
    this.baseUrl = this.con.Server;
    return this.http.get(this.baseUrl + url + "/page/" + pageNo)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getComplaintById(url, id) {
    return this.http.get(this.baseUrl + "/" + url + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getComplaintCommentById(url, complaintId) {
    return this.http.get(this.baseUrl + url + "/" +complaintId + "/comment")
      .map(this.extractData)
      .catch(this.handleError);
  }

  postComplaintComment(complaintId, comment) {
    console.log("1", this.baseUrl);
    return this.http.post(this.baseUrl + "/complaint/" + complaintId + "/comment", comment)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateComplaint(complaintId, complaint) {
    return this.http.put(this.baseUrl + "/complaint/" + complaintId, complaint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  closeComplaint(complaintId, complaint) {
    return this.http.put(this.baseUrl + "/complaint/" + complaintId + "/close", complaint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  editInfo() {
    return this.http.get(this.baseUrl + "/complaint/edit-info")
      .map(this.extractData)
      .catch(this.handleError);
  }

  showToast(msg) {
    console.log(msg);
  }

  getUserId() {
    return this.con.getUserId();
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || 'Bad Request'}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}