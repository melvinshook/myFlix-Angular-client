import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { UserRegistrationService } from '../fetch-api-data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userName = '';
  @Input() userData: any = {};

  user: any= {};
  movies: any[] = [];
  favoriteMovies: any[] = [];


  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.userData);
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
    this.getFavMovies();
    console.log(this.user);
    console.log(this.favoriteMovies);
  }

  updateUser(): void {
    this.fetchApiData.editUser().subscribe(
      (resp: any) => {
        this.userData = resp;
        console.log(resp);
        this.snackBar.open('Update', 'Success', {
          duration: 2000,
        });
      },
      () => {
        this.snackBar.open('Please try again', 'No success', {
          duration: 2000,
        });
      }
    );
  }

  // Fetch users favortie movies 
  /* getFavMovies(MovieId: any): void {
    this.fetchApiData.getFavorites(MovieId).subscribe((result: any) => {
     this.favoriteMovies = result.favoriteMovies;
    });
  }
  isFav(MovieId: any): boolean {
    return this.favoriteMovies.includes(MovieId);
  } */

    getFavMovies(): void {
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.user.favoriteMovies.includes(movie._id)
        })
      }, (err: any) => {
        console.error(err);
      });
    }
    


 /**
     * Deletes the user's account.
     */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((resp: any) => {
      this.user = JSON.parse(localStorage.getItem('user') || "");
    })
  }

  // Delete movie from favorties
   deleteFavMovie(MovieId: string): void {
    console.log(MovieId);

    this.fetchApiData.deleteFavoriteMovie(MovieId).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Movie has been removed from favorites', 'OK', {
        duration: 3000,
      });
console.log(resp);
    })
   
}

  // Add movie to favorites 
  /* addFaveMovie(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie.MovieId).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies(movie);
      this.snackBar.open(`${movie.title} has been added to your favorites`, 'OK', {
        duration: 1000,
      });
    });
  } */

  // Delte movie from favorites 
  /* deleteMovie(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie.MovieId).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movie.id);
      this.getFavMovies();
      this.snackBar.open(`${movie.title} has been deleted from your favorites`, 'OK', {
        duration: 1000,
      });
    });
  } */

  // Toggle user's favorite movies 
  /* toggleFavMovies(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
    ? this.deleteMovie(movie)
    : this.addFaveMovie(movie);
  } */
}