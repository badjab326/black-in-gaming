import { Injectable } from '@angular/core';
import { Game } from './character';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a GameService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GameService: ${message}`);
  }

  private gamesUrl = 'http://localhost:3000/api/games';  // URL to web api

  // Handle Http operation that failed.
  // Let the app continue.
  // @param operation - name of the operation that failed
  // @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getGames(): Observable<Game[]> {
    return this.http.get<any>(this.gamesUrl)
    .pipe(
      tap(_ => this.log('fetched games')),
      map(response => response.docs),
      catchError(this.handleError<Game[]>('getGames', []))
    );
  }

  getGame(id: string): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
  );
  }

  updateGame(game: Game): Observable<any> {
    return this.http.put(this.gamesUrl, game, this.httpOptions).pipe(
      tap(_ => this.log(`updated game id=${game.id}`)),
      catchError(this.handleError<any>('updateGame'))
    );
  }

  // POST: add a new hero to the server
  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamesUrl, game, this.httpOptions).pipe(
      tap((newGame: Game) => this.log(`added game w/ id=${newGame.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  deleteGame(id: string): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.delete<Game>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted game id=${id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    );
  }

  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${this.gamesUrl}/?where[name][like]=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found games matching "${term}"`) :
         this.log(`no games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames', []))
    );
  }
}
