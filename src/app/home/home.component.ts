import {Component, Input} from '@angular/core';
import {ProductModel} from "../product.model";
import {AppService} from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input()
  products: ProductModel[] = [];
  public logTrace = '';
  constructor( private appService: AppService ) { }
  public subscription(product:ProductModel):void {
    console.log("sub");
    console.log("products:", product);

    this.logTrace = '';

    const data = '{"action":"subscribe","topic":{"id":"'+product.id+'"}}';
    this.appService.subscription(data).subscribe(
      data => {
        console.log("data:", data);
        this.logTrace = JSON.stringify(data);
      }
    );
  }

  getImage(image_url: string) {
    return image_url ? image_url : 'https://via.placeholder.com/300x150';
  }
}
