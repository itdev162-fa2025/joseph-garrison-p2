import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddColorDialogComponent } from '../add-color-dialog/add-color-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  colors: Array<any>;

  url = 'http://localhost:5013/color'

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get<Array<any>>(this.url).subscribe({
      next: (response) => this.colors = response,
      error: (e) => console.error(e),
      complete: () => console.log('completed')
    });
  }

  openAddColorDialog(): void {
    const dialogRef = this.dialog.open(AddColorDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(color => {
      if (color) {
        this.createNewColor(color)
      }
    })
  }

  createNewColor(color: any) {
    this.http.post(this.url, color).subscribe({
      next: (response) => this.colors.push(response),
      error: (e) => console.error(e),
      complete: () => console.log('completed')
    })
  }
}
