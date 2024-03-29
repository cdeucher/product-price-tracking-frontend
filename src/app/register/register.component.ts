import { Component } from '@angular/core';
import {GB} from "../global";
import { AppService } from "../app.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public url = '';
  public targetPrice = 0;
  public apiUrl = GB.BASE_API_URL;

  public logTrace = '';

  constructor( private appService: AppService ) { }

  public register():void {
    console.log("register");
    console.log("url:", this.url);
    console.log("targetPrice:", this.targetPrice);
    console.log("apiUrl:", this.apiUrl);

    this.logTrace = '';

    if( this.validateUrl() && this.validateTargetPrice() ) {
      const data: string = '{"action":"new","product":{"price_target":"'+this.targetPrice+'","url":"'+this.url+'"}}';
      const request = this.appService.register(data);
      request.subscribe(
        data => {
          console.log("data:", data);
          this.logTrace = JSON.stringify(data);
        }
      );
      request.pipe(
        catchError(err => {
          console.log("err:", err);
          this.logTrace = JSON.stringify(err);
          return throwError(err);
        })
      );
    } else {
      console.log("invalid url");
    }
  }

  public validateUrl():boolean {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const regExp = new RegExp("^https?://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$");
    return (regExp.test(this.url));
  }
  public validateTargetPrice():boolean {
    return (!isNaN(this.targetPrice) && this.targetPrice > 0);
  }
}
