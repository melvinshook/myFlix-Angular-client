// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MatDialog } from '@angular/material/dialog';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MovieDetailsCardComponent } from '../movie-details-card/movie-details-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  /**
   * constructor
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }
  /**
   * load movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * open director details
   * @param director
   */
  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
      width: '600px',
    });
  }

  /**
   * open movie details
   * @param description
   */
  openDetailsDialog(description: string): void {
    this.dialog.open(MovieDetailsCardComponent, {
      data: description,
      width: '600px',
    });
  }
  /**
   * open genre details
   * @param genre
   */
  openGenreDialog(genre: object): void {
    this.dialog.open(GenreCardComponent, {
      data: genre,
      width: '600px',
    });
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      if (Array.isArray(resp)) {
        this.movies = resp;
        this.movies.forEach((movie: any) => {
          this.favoriteMovies.push(movie._id);
        });
      }
    });
  }
  /**
   * Checks if a movie is in the user's favorite list.
   * @param movie - The movie to check.
   * @returns True if the movie is in the favorite list, false otherwise.
   */
  isFav(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

  addFavMovies(MovieId: string): void {
    console.log(MovieId);

    this.fetchApiData.addFavoriteMovie(MovieId).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      console.log(resp);
    });
  }
}
