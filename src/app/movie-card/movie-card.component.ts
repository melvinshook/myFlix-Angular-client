// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService,
    private dialog: MatDialog
  ) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  // opens director info box
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: { director},
      width: '600px'
    });
  }

  // opens movie details
  openDetailsDialog(movie: any): void {
    this.dialog.open(MovieCardComponent, {
      data: { movie },
      width: '600px',
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreCardComponent, {
      data: { genre },
      width: '600px',
    });
  }
}
