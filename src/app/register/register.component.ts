import { Component } from '@angular/core';
import {GB} from "../global";
import { AppService } from "../app.service";

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
      const data: string = '[{"price_target":"'+this.targetPrice+'","url":"'+this.url+'"}]';
      this.appService.register(data).subscribe(
        data => {
          console.log("data:", data);
          this.logTrace = JSON.stringify(data);
        }
      );
    } else {
      console.log("invalid url");
    }
  }

  public validateUrl():boolean {
    const regExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    if (regExp.test(this.url)) {
      return true;
    } else {
      return false;
    }
  }
  public validateTargetPrice():boolean {
    if (!isNaN(this.targetPrice) && this.targetPrice > 0) {
      return true;
    } else {
      return false;
    }
  }

}
