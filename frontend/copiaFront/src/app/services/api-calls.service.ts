import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  constructor(private http:HttpClient) { }
  base_url : string = environment.base_url;

  post(url: string, data: any) { 
    const endpoint = this.base_url + url;
    return this.http.post(endpoint, data)
  }

  get(url: string){
    const endpoint = this.base_url + url;
    return this.http.get(endpoint);
  }

  delete(url: string){
    const endpoint = this.base_url + url;    
    return this.http.delete(endpoint);
  }

  put(url: string, data: any){
    const endpoint = this.base_url + url;
    return this.http.put(endpoint, data)
  }
}
