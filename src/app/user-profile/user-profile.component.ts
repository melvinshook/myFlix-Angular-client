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
      if (Array.isArray(result)) {
        this.movies = result;
      }
      return result;
    });
  }

  deleteUser(userName: string): void {
    this.fetchApiData.deleteUser(userName).subscribe(() => {
      this.snackBar.open('Account has been successfully deleted');
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
  }
}