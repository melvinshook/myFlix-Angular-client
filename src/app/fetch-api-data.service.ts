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
  /**
   * get user's token
   * @returns - users token
   */
  private getToken(): any {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }
  /**
   * get user
   * @returns - registered user
   */
  private getUser(): any {
    return typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || '{}')
      : {};
  }
  /**
   * user registration
   * @param userDetails - needs username, password, email and birthday
   * @returns
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * user login
   * @param userDetails - needs username and password to login
   * @returns
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * gets all movies
   * @returns - list of movies
   */
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

  /**
   * Extracts response data from HTTP response.
   * @param res - The HTTP response.
   * @returns Extracted response data.
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * get movie by title
   * @param title - title of a movie
   * @returns - Movie based off searched title
   */
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

  /**
   * get director by name
   * @param directorName - director's name
   * @returns - Director(s) based on searched name
   */
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

  /**
   * get movie by genre
   * @param genreName - genre name
   * @returns - Movies that match based on searched genre
   */
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

  /**
   * getting a user by a username
   * @returns - users based on username searched for
   */
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

  /**
   * getting a user's favorite movies
   * @param MovieID - favorited movie IDs
   * @returns - Favorited movie IDs
   */
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
  /**
   * editing a user profile
   * @param userDetails - updating certain user details
   * @returns - users updated profile information
   */
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

  /**
   * delete a user
   * @param userName - username
   * @returns - deletes a users profile if successful
   */
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

  /**
   * add movie to favorites
   * @param MovieId
   * @returns - favorited movie IDs
   */
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

  /**
   * delete favorite movie
   * @param MovieId
   * @returns - deletes favorite movie from a user's favorite list
   */
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
  /**
   * error response
   * @param error - http error response
   * @returns - error message
   */
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
