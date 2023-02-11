import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from "./product.model";

@Injectable()
export class AppService implements OnInit {
  private apiUrl = 'https://api-dev.cabd.link/api';
  private token:string

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

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
    const options: object = {
      headers: {
        'Authorization': this.getToken(),
        'Content-Type': 'application/json'
      }
    }
    return this.http.post(this.apiUrl, product, options);
  }
}
