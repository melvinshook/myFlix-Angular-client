import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserRegistrationService } from '../fetch-api-data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userName = '';
  @Input() userData: any = {};

  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.userData);
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getFavMovies();
    console.log(this.user);
    console.log(this.favoriteMovies);
  }
  /**
   * update user profile
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (resp: any) => {
        this.userData = {};
        localStorage.setItem('user', JSON.stringify(resp));
        console.log(resp);
        this.user = resp;
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

  /**
   * fetch users favorite movie
   */

  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe(
      (res: any) => {
        this.favoriteMovies = res.filter((movie: any) => {
          return this.user.favoriteMovies.includes(movie._id);
        });
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  /**
   * Deletes the user's account.
   */
  deleteUser(): void {
    this.userData = JSON.parse(localStorage.getItem('user') || '');
    this.router.navigate(['/welcome']); // Navigate to welcome page after account deletion
    this.snackBar.open('User was successfully deleted', 'OK', {
      duration: 3000, // Snackbar message durration
    });
  }

  /**
   * delete a user's favorite movies
   * @param MovieId
   */
  deleteFavMovie(MovieId: string): void {
    console.log(MovieId);

    this.fetchApiData.deleteFavoriteMovie(MovieId).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Movie has been removed from favorites', 'OK', {
        duration: 3000,
      });
      console.log(resp);
    });
  }
}
