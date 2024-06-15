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
  constructor(
    public fetchApiData: UserRegistrationService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

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
  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorInfoComponent, {
      data: director,
      width: '600px',
    });
  }

  // opens movie details
  openDetailsDialog(description: string): void {
    this.dialog.open(MovieDetailsCardComponent, {
      data: description,
      width: '600px',
    });
  }

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
  /**
   * Toggles a movie in the user's favorite list.
   * @param movie - The movie to toggle.
   */
  /* toggleFav(movie: any): void {
    console.log('toggling favorite movie');
    const isFavorite = this.isFav(movie._id);
    console.log('isFavorite');
    isFavorite ? this.deleteFavMovies(movie._id) : this.addFavMovies(movie._id);
  } */

  /* * Adds a movie to the user's favorite list.
     * @param movie - The movie to add to favorites.
     addFavMovies(movie: any): void {
    let user = localStorage.getItem('user');
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log('user:', parsedUser);
      this.userData.UserId = parsedUser._id;
      console.log('userData:', this.userData);
    
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe((resp) => {
        console.log('server response:', resp);
        localStorage.setItem('user', JSON.stringify(resp));
        // Add the movie ID to the favoritemovie array
        this.favoriteMovies.push(movie._id);
        // Show a snack bar message
        this.snackBar.open(`${movie.title} has been added to your favorites`, 'OK', {
          duration: 3000,
        });
      });
    } 
  } */

  addFavMovies(MovieId: string): void {
    console.log(MovieId);

    this.fetchApiData.addFavoriteMovie(MovieId).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      console.log(resp);
    });
  }

  /**
   * Deletes a movie from the user's favorite list.
   * @param movie - The movie to remove from favorites.
   */
  /* deleteFavMovies(movie: any): void {
      let user = localStorage.getItem('user');
      if (user) {
        let parsedUser = JSON.parse(user);
        this.fetchApiData.deleteFavoriteMovie(movie._id).subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          // Remove the movie ID from the favoritemovie array
          this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movie._id);
          // Show a snack bar message
          this.snackBar.open(`${movie.title} has been removed from your favorites`, 'OK', {
            duration: 3000,
          });
        });
      }
    } */
}
