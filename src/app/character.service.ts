import { Injectable } from '@angular/core';
import { Character } from './character';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** Log a CharacterService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }

  private charactersUrl = 'http://localhost:3000/api/characters'; // URL to web api

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
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getCharacters(): Observable<Character[]> {
    return this.http.get<any>(this.charactersUrl).pipe(
      tap((_) => this.log('fetched characters')),
      map((response) => response.docs),
      catchError(this.handleError<Character[]>('getCharacters', []))
    );
  }

  getCharacter(id: string): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      tap((_) => this.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    );
  }

  updateCharacter(character: Character): Observable<any> {
    return this.http.put(this.charactersUrl, character, this.httpOptions).pipe(
      tap((_) => this.log(`updated character id=${character.id}`)),
      catchError(this.handleError<any>('updateCharacter'))
    );
  }

  // POST: add a new hero to the server
  addCharacter(character: Character): Observable<Character> {
    return this.http
      .post<Character>(this.charactersUrl, character, this.httpOptions)
      .pipe(
        tap((newCharacter: Character) =>
          this.log(`added character w/ id=${newCharacter.id}`)
        ),
        catchError(this.handleError<Character>('addCharacter'))
      );
  }

  deleteCharacter(id: string): Observable<Character> {
    const url = `${this.charactersUrl}/${id}`;
    return this.http.delete<Character>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted character id=${id}`)),
      catchError(this.handleError<Character>('deleteCharacter'))
    );
  }

  searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<any>(`${this.charactersUrl}/?where[name][like]=${term}`)
      .pipe(
        map((c) => c.docs),
        tap((x) =>
          x.length
            ? this.log(`found characters matching "${term}"`)
            : this.log(`no characters matching "${term}"`)
        ),
        catchError(this.handleError<Character[]>('searchCharacters', []))
      );
  }

  loadCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<any>(`${this.charactersUrl}/?where[game.title][like]=${term}`)
      .pipe(
        map((c) => c.docs),
        tap((x) =>
          x.length
            ? this.log(`found characters matching "${term}"`)
            : this.log(`no characters matching "${term}"`)
        ),
        catchError(this.handleError<Character[]>('searchCharacters', []))
      );
  }
}
