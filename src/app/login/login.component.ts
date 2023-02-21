import {Component} from '@angular/core';
import {GB} from "../global";
import { AppService } from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private client_id = GB.CLIENT_ID;
  private cognito_domain = GB.COGNITO_DOMAIN;
  private region = GB.REGION;
  private domainToRedirect = GB.REDIRECT_URL;
  private awsCognitoLoginDomain = "https://" + this.cognito_domain + ".auth." + this.region + ".amazoncognito.com";
  private cognitoUrlFromUserPoolUI = this.awsCognitoLoginDomain + "/login?client_id=" + this.client_id + "&response_type=token&scope=email+openid+phone&redirect_uri=" + this.domainToRedirect;
  private loggedIn = false;
  public token = '';

  constructor( private appService: AppService ) {

  }

  ngOnInit(): void {
    this.checkLogin();
  }

  public checkLogin():void {
    if (this.validateUrlToken() === false && this.validateStoredToken() === false) {
      this.redirectLogin();
    } else {
      this.loggedIn = true;
      this.validateToken();
    }
  }
  private validateUrlToken():boolean {
    if (window.location.href.split('id_token=').length <= 1) {
      return false;
    } else {
      return true;
    }
  }
  private validateStoredToken():boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }
  }
  public validateToken():void {
    try {
      console.log("split:", window.location.href.split('id_token='));
      this.token = window.location.href.split('id_token=')[1].split('&')[0];
      console.log("access_token:", this.token);
      this.setToken(this.token);
    } catch (e) {
      console.log("Error:", e);
    }
  }
  private setToken(token:string):void {
    localStorage.setItem('token', token);
    this.appService.setToken(token);
  }
  public redirectLogin():void {
    window.location.href = this.cognitoUrlFromUserPoolUI;
  }

  public getLoginStatus():boolean {
    return this.loggedIn;
  }

  public logout():void {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }

}
