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
  @Input() userData = {
    userName: '',
    password: '',
    email: '',
    birthday: '',
    favoriteMovies: []
  };

  user: any= {};
  movies: any[] = [];
  favoriteMovies: any[] = [];


  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    this.fetchApiData.editUser(this.userName).subscribe(
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
  getFavMovies(movie: any): void {
    this.fetchApiData.getFavorites(movie.MovieId).subscribe((result: any) => {
     this.favoriteMovies = result.favoriteMovies;
    });
  }
  isFav(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

  
  // Delete user profile
  deleteUser(userName: string): void {
    this.fetchApiData.deleteUser(userName).subscribe(() => {
      this.snackBar.open('Account has been successfully deleted');
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
  }

  // Add movie to favorites 
  addFaveMovie(movie: any): void {
    this.fetchApiData.addFavoriteMovie(movie.MovieId).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies(movie);
      this.snackBar.open(`${movie.title} has been added to your favorites`, 'OK', {
        duration: 1000,
      });
    });
  }

  // Delte movie from favorites 
  deleteMovie(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(movie.MovieId).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movie.id);
      this.getFavMovies(movie);
      this.snackBar.open(`${movie.title} has been deleted from your favorites`, 'OK', {
        duration: 1000,
      });
    });
  }

  // Toggle user's favorite movies 
  toggleFavMovies(movie: any): void {
    const isFavorite = this.isFav(movie);
    isFavorite
    ? this.deleteMovie(movie)
    : this.addFaveMovie(movie);
  }
}