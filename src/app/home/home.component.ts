import {Component, Input} from '@angular/core';
import {ProductModel} from "../product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input()
  products: ProductModel[] = [];

}
