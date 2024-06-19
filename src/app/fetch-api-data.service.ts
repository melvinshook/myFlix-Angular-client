import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of, tap, catchError, map } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/';
// const apiUrl = 'http://localhost:8080/';
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  private getToken(): any {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  private getUser(): any {
    return typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // making call to api for user login
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // making call to api to get all movies
  public getAllMovies(): Observable<any> {
    //const token = localStorage.getItem('token');
    const token = this.getToken();
    if (!token) return of([]);
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  // making call to api to get one movie by title
  public getMovieByTitle(title: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // making call to api to get director by name
  public getDirector(directorName: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // making call to api to get movies by genre
  public getMovieGenre(genreName: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'movies/genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // making call to api to get user by username
  getUserName(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    const url = apiUrl + 'users/' + user.userName;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(url, { headers }).pipe(
      tap((result: any) => {}),
      map(this.extractResponseData),
      catchError((error) => {
        console.error('API Error:', error);
        return this.handleError(error);
      })
    );
  }

  // making call to api to get favorite movies for a user
  public getFavorites(MovieID: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http
      .get(apiUrl + 'users/userName/movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // making call to api to update user info by username
  public editUser(userDetails: any): Observable<any> {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // const token = localStorage.getItem('token');
    const user = this.getUser();
    const token = this.getToken();
    return this.http
      .put(apiUrl + `users/${user.userName}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //making call to api to delete user by username
  /* public deleteUser(userDetails: any): Observable<any> {
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // const token = localStorage.getItem('token');
    const user = this.getUser();
    const token = this.getToken();
    return this.http
      .delete(apiUrl + `users/${user.userName}`+ userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  } */
  public deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const body = JSON.stringify({ userName: userName });
    return this.http
      .delete(apiUrl + `/users`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        body: body,
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //making call to api to add favorite movie to users list
  public addFavoriteMovie(MovieId: string): Observable<any> {
    console.log(MovieId);
    // const token = localStorage.getItem('token');
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = this.getToken();
    const user = this.getUser();

    return this.http
      .post(
        apiUrl + `users/${user.userName}/movies/${MovieId}`,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  //making call to api to delete movie from users list
  public deleteFavoriteMovie(MovieId: string): Observable<any> {
    // const token = localStorage.getItem('token');
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    const user = this.getUser();
    const token = this.getToken();

    return this.http
      .delete(apiUrl + `users/${user.userName}/movies/${MovieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    console.log(error);

    return throwError(
      () => new Error('Something went wrong, please try again later.')
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor() {}
}
