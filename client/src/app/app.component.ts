import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'COLOR HEX CODE BASE';
  colors: any;

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get('http://localhost:5013/color').subscribe({
      next: (response) => this.colors = response,
      error: (e) => console.error(e),
      complete: () => console.log('completed')      
    });
  }

  showHexCode(colorObj:any): void {
    alert(`Hexcode of ${colorObj.name}: ${colorObj.hexCode}`);
  }
}
