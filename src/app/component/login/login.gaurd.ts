import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Configuration } from '../../providers/app.constant';
@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router,
              private con: Configuration) {

  }

  canActivate() {
    if (localStorage.getItem('username')) {
            this.con.setAccessToken();            
            return true;
        } 
        this.router.navigate(['/login']);
        return false;
  }

}