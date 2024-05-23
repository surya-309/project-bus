import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Practice';
  readonly APIUrl = "https://localhost:7248/api/Bus"
  constructor (private http:HttpClient){
    
    
  }
  data:any=null;
  arr : any= [];
  refreshBus(){
    this.http.get(this.APIUrl).subscribe(data=>{
      this.data = data;
      let c = data[1];
      console.log(data)
    })
  }
  ngOnInit(){
    this.refreshBus();
  }


 
}
