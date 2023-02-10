import {Component, Input} from '@angular/core';
import { AppService } from "./app.service";
import { ProductModel } from "./product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Product Tracker';
  public products: ProductModel[] = [];

  constructor( appService: AppService ) {
    appService.getProducts().subscribe(
      products => this.products = products
    )
  }
}
