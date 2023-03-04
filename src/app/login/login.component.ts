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
    if( this.validateStoredToken() ){
      this.loggedIn = true;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.token = localStorage.getItem('token');
      this.appService.setToken(this.token);
    } else
    if ( this.validateUrlToken() ) {
      this.token = window.location.href.split('id_token=')[1].split('&')[0];
      this.setToken();
    } else {
      this.redirect(this.cognitoUrlFromUserPoolUI);
    }
  }
  private validateUrlToken():boolean {
    return (window.location.href.split('id_token=').length >= 2);
  }
  private validateStoredToken():boolean {
    return (this.isTokenSet() && this.isExpiresSet() && this.isTokenNotExpired());
  }
  private setToken():void {
    localStorage.setItem('token', this.token);
    localStorage.setItem('expires_at', (GB.TOKEN_EXPIRES + new Date().getTime()).toString());
    this.appService.setToken(this.token);
    this.redirect(this.domainToRedirect);
  }
  public redirect(url?:string):void {
    window.location.href = (url) ? url : this.domainToRedirect;
  }

  public getLoginStatus():boolean {
    return this.loggedIn;
  }

  public logout():void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.redirect();
  }

  private isTokenNotExpired() {
    return (Number(localStorage.getItem('expires_at')) > new Date().getTime());
  }
  private isTokenSet() {
    return (localStorage.getItem('token') != null);
  }
  private isExpiresSet() {
    return (localStorage.getItem('expires_at') != null);
  }
}
