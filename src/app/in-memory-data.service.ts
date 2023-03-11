import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Character } from './character';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const characters = [
      { id: 12, name: 'Jake Hudson', gameOrigin: 'Urban Reign' },
      { id: 13, name: 'Dwayne Davis', gameOrigin: 'Urban Reign' },
      { id: 14, name: 'Napalm 99', gameOrigin: 'Urban Reign' },
      { id: 15, name: 'Vera Ross', gameOrigin: 'Urban Reign' },
      { id: 16, name: 'Nas-Tiii', gameOrigin: 'Urban Reign' },
      { id: 17, name: 'Em Cee', gameOrigin: 'Urban Reign' },
      { id: 18, name: 'Real Deal', gameOrigin: 'Urban Reign' },
      { id: 19, name: "Grave Digga'", gameOrigin: 'Urban Reign' },
      { id: 20, name: 'Pain Killah', gameOrigin: 'Urban Reign' },
      { id: 21, name: 'GD 05', gameOrigin: 'Urban Reign' },
      { id: 22, name: 'Taylor', gameOrigin: 'Urban Reign' },
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