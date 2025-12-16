import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }
  log(msg: string){
    console.log(new Date() , ": " , msg);
  }
  warn(msg: string){
    console.warn(new Date() , ": " , msg);
  }
  error(msg: string){
    console.error(new Date() , ": " , msg);
  }
}
