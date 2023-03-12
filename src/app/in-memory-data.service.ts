import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 12, name: 'Jake Hudson', game: 'Urban Reign' },
      { id: 13, name: 'Dwayne Davis', game: 'Urban Reign' },
      { id: 14, name: 'Napalm 99', game: 'Urban Reign' },
      { id: 15, name: 'Vera Ross', game: 'Urban Reign' },
      { id: 16, name: 'Nas-Tiii', game: 'Urban Reign' },
      { id: 17, name: 'Em Cee', game: 'Urban Reign' },
      { id: 18, name: 'Real Deal', game: 'Urban Reign' },
      { id: 19, name: "Grave Digga'", game: 'Urban Reign' },
      { id: 20, name: 'Pain Killah', game: 'Urban Reign' },
      { id: 21, name: 'GD 05', game: 'Urban Reign' },
      { id: 22, name: 'Taylor', game: 'Urban Reign' },
    ];
    return {characters};
  }

  // Overrides the genId method to ensure that a character always has an id.
  // If the characters array is empty,
  // the method below returns the initial number (11).
  // if the characters array is not empty, the method below returns the highest
  // character id + 1.
  genId(characters: Character[]): number {
    return characters.length > 0 ? Math.max(...characters.map(character => character.id)) + 1 : 11;
  }
}