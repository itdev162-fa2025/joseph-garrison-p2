import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  name: string;
  hexCode: string;
}

@Component({
  selector: 'app-add-color-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './add-color-dialog.component.html',
  styleUrl: './add-color-dialog.component.css'
})
export class AddColorDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddColorDialogComponent>);

  color: DialogData = {
    name: '',
    hexCode: '',
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
