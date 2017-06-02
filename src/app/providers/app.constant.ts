import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Configuration {

  public url: string = "https://cornerstone.njs.jelastic.vps-host.net";
  public baseUrl: string = "https://cornerstone.njs.jelastic.vps-host.net/";
  public Server: string = "https://cornerstone.njs.jelastic.vps-host.net/";

  userId; 
  access_token: string;
  role: string;
  headers;
  options;
  

  constructor() {
  }

  // set access_token after user login
  setAccessToken() {    
    this.getRole();
  }

  getRole() {
    this.role = localStorage.getItem("role");
    this.getUserId();
  }

  getUserId() {
    this.userId = localStorage.getItem("id");
    this.Server = this.baseUrl + this.role + "/" + this.userId;
  }
}
