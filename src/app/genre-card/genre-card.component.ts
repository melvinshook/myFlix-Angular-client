import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-card',
  standalone: true,
  imports: [],
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent implements OnInit {
  genre: any;
  description: any;
  
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<GenreCardComponent>
  ) { }

  ngOnInit(): void {
    this.getGenre(this.genre.genreName);
  }

  getGenre(genreName: string): void {
    this.fetchApiData.getMovieGenre(genreName).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      return this.genre;
    })
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
