import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-careerfoundry-b3e87d3aa42c.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private getToken(): any{
    return typeof window !=='undefined' ?
    localStorage.getItem('token'): null;
  }

  private getUser(): any{
    return typeof window !=='undefined' ?
    JSON.parse(localStorage.getItem('user') || '{}'): {};
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // making call to api for user login 
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // making call to api to get all movies 
   public getAllMovies(): Observable<any> {
    //const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  } 


  //Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }

  // making call to api to get one movie by title
  public getMovieByTitle(title: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // making call to api to get director by name 
  public getDirector(directorName: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // making call to api to get movies by genre 
  public getMovieGenre(genreName: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http.get(apiUrl + 'movies/genres/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // making call to api to get user by username 
  public getUserName(userName: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const user = this.getUser();
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/' + userName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // making call to api to get favorite movies for a user
  public getFavorites(MovieID: string): Observable<any> {
    // const token = localStorage.getItem('token');
    const token = this.getToken();
    return this.http.get(apiUrl + 'users/:userName/movies/' + MovieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
// making call to api to update user info by username
editUser(userName: string): Observable<any> {
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  // const token = localStorage.getItem('token');
  const user = this.getUser();
  const token = this.getToken();
  return this.http.put(apiUrl + 'users/' + userName, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//making call to api to delete user by username
deleteUser(userName: string): Observable<any> {
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  // const token = localStorage.getItem('token');
  const user = this.getUser();
  const token = this.getToken();
  return this.http.delete(apiUrl + 'users/' + userName, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

//making call to api to add favorite movie to users list 
addFavoriteMovie(MovieId: string): Observable<any> {
  // const token = localStorage.getItem('token');
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  const user = this.getUser();
  const token = this.getToken();

  user.FavoriteMovies.push(MovieId);
  localStorage.setItem('user', JSON.stringify(user));
  
  return this.http.put(apiUrl + 'users/:userName/movies/' + MovieId, {}, {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError),
  );
}

//making call to api to delete movie from users list 
deleteFavoriteMovie(MovieId: string): Observable<any> {
  // const token = localStorage.getItem('token');
  // const user = JSON.parse(localStorage.getItem('user') || '{}');
  const user = this.getUser();
  const token = this.getToken();

  const index = user.FavoriteMovies.indexOf(MovieId);
  if (index >= 0) {
    user.FavoriteMovies.splice(index, 1);
  }
  localStorage.setItem('user', JSON.stringify(user));

  return this.http.delete(apiUrl + 'users/:userName/movies/' + MovieId, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}




private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor() { }
}
