import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private client_id: string = "3fhjs4it7br6bmn96rk98jrs4h";
  private cognito_domain: string = "login-ze0zatn0ipkhxh56";
  private region: string = "us-east-1";
  private domainToRedirect: string = "https://dash.cabd.link";
  private awsCognitoLoginDomain: string = "https://" + this.cognito_domain + ".auth." + this.region + ".amazoncognito.com";
  private cognitoUrlFromUserPoolUI: string = this.awsCognitoLoginDomain + "/login?client_id=" + this.client_id + "&response_type=token&scope=email+openid+phone&redirect_uri=" + this.domainToRedirect;

  ngOnInit(): void {
    this.checkLogin();
  }

  public checkLogin():void {
    if (this.validateUrlToken() === false && this.validateStoredToken() === false) {
      this.redirectLogin();
    } else {
      this.checkToken();
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
  public checkToken():void {
    console.log("split:", window.location.href.split('id_token='));
    let token:string = window.location.href.split('id_token=')[1].split('&')[0];
    console.log("access_token:", token);
    this.setToken(token);
  }
  private setToken(token:string):void {
    localStorage.setItem('token', token);
  }
  public redirectLogin():void {
    window.location.href = this.cognitoUrlFromUserPoolUI;
  }

}
