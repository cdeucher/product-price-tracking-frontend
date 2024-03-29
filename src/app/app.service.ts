import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProductModel } from "./product.model";
import {GB} from "./global";
@Injectable()
export class AppService implements OnInit {
  private apiUrl = GB.BASE_API_URL
  private token = '';

  constructor(private http: HttpClient) {
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
  public subscription(topic: string) {
    const options: object = {
      headers: {
        'Authorization': this.getToken(),
        'Content-Type': 'application/json'
      }
    }
    return this.http.post(this.apiUrl+'/sub', topic, options);
  }
}
