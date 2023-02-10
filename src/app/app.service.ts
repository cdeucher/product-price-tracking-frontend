import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from "./product.model";

@Injectable()
export class AppService implements OnInit {
  private apiUrl: string = 'https://api-dev.cabd.link/api';
  private token:string = ''

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }

  public getProducts() {
    return this.http.get<ProductModel[]>(this.apiUrl);
  }
  public register(product: string) {
    let options: object = {
      headers: {
        'Authorization': this.getToken(),
        'Content-Type': 'application/json'
      }
    }
    return this.http.post(this.apiUrl, product, options);
  }
}
