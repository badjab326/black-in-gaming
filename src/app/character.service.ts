import { Injectable } from '@angular/core';
import { Character } from './character';
import { CHARACTERS } from './mock-characters';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private messageService: MessageService) { }

  getCharacters(): Observable<Character[]> {
    const characters = of(CHARACTERS);
    this.messageService.add('CharacterService: fetched characters');
    return characters;
  }
}
