import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private urlApi: string = "https://expre.up.railway.app/messages"

  constructor(
    private http: HttpClient) {}

  getMessages() {
    console.log(this.http.get<any[]>(this.urlApi));
    return this.http.get<any[]>(this.urlApi);
    
  }
  getNumMessage(num: number){
    return this.http.get<Message[]>(`${this.urlApi}/${num}`);
  }
}