import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from "./product.model";

@Injectable()
export class AppService implements OnInit {
  private apiUrl: string = 'https://api-dev.cabd.link/api';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public getProducts() {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }
}
