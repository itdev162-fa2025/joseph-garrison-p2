import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddColorDialogComponent } from '../add-color-dialog/add-color-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  private _snackBar = inject(MatSnackBar);

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

  createNewColor(color: any): void {
    this.http.post(this.url, color).subscribe({
      next: (response) => this.colors.push(response),
      error: (e) => console.error(e),
      complete: () => this.openSnackBar('Successfully added!')
    });
  }

  deleteColor(id: number): void {
    this.http.delete(`${this.url}/${id}`).subscribe({
      next: () => this.colors = this.colors.filter(color => color.id !== id),
      error: (e) => console.error(e),
      complete: () => this.openSnackBar('Successfully deleted!')
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }
}
