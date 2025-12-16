import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hello 4INFINI1 !';
  tab = [1,2,3,4,"five"];
  x= 4;
  text: string = "";
  y: boolean = true;
  getNumbers(): number{
    return 10;
  }

  fillText(){
    this.text = "This is some filled text.";
  }
}
